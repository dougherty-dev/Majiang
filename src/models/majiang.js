#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Majiang
 */

import { VERSION } from '../config.js'
import { ALLPLAYERS, AIPLAYERS, HUAPAI, TILES } from './tiles.js'
import { humanTileHandling } from '../components/tiles.js'
import { delay, shuffle, sortTiles, modIncrease, sound } from '../components/helpers.js'
import { displayClearBoard, displayPoints, displayRemoveItem } from '../components/display/display.js'
import { displayAddToDoor, displayDoor, displayDoors } from '../components/display/door.js'
import { displayFloor, displayFloors } from '../components/display/floor.js'
import { displayFlower, displayFlowers } from '../components/display/flowers.js'
import { displayHiliteTiles, displayTileCount, displayDiscarded } from '../components/display/tiles.js'
import { displayPrevailingWind, displaySeatWinds } from '../components/display/winds.js'
import { displayMelds } from '../components/display/melds.js'
import { determineSeatWinds } from '../components/winds.js'
import { enableDrag } from '../components/drag.js'
import { checkPeng } from '../components/melds/peng.js'
import { checkChi } from '../components/melds/chi.js'
import { fetchGame, saveGame } from '../components/gameio.js'

import Players from './players.js'

export default class Majiang {
	constructor() {
		this.game = null

		this.playing = false
		this.newGame = false
		this.hashListen()
	}

	hashListen() {
		window.addEventListener('hashchange', () => {
			this.hashLocator()
		})

		this.hashLocator()
	}

	async hashLocator() {
		this.newGameListen()

		const cleanHash = location.hash.replace('#', '')
		if (cleanHash === 'table') {
			if (!this.newGame) {
				this.game = fetchGame()
				this.layoutGame()
			} else {
				this.newGame = false
			}
		}
	}

	newGameListen() {
		const button = document.getElementById('new-game')
		if (!button) return

		button.onclick = async() => {
			this.game = null
			await saveGame(this.game)

			this.newGame = true
			location.hash = 'table'

			window.addEventListener('hashchange', async() => {
				await displayClearBoard()
				await this.initGame()
				await this.layoutGame()
			}, { once: true})
		}
	}

	async layoutGame() {
		if (!this.game) return
		displayClearBoard()
		displayPrevailingWind(this.game.prevailingWind)
		displaySeatWinds(this.game.players, this.game.prevailingWind)
		displayDoors(this.game.players)
		enableDrag(this.game)
		displayMelds(this.game.players)
		displayFlowers(this.game.players)
		displayFloors(this.game.players)
		displayPoints(this.game.players)
		displayTileCount(this.game.tileCount)
		displayHiliteTiles()
		this.play()
	}

	async initGame() {
		let tiles = Object.assign([], TILES)

		this.game = {
			version: VERSION,
			active: true,
			round: 1,
			hand: 1,
			prevailingWind: 1,
			currentPlayer: null,
			tiles: shuffle(tiles),
			tileCount: tiles.length,
			sorted: false,
			players: new Players().players,
		}

		displayPrevailingWind(this.game.prevailingWind)
		determineSeatWinds(this.game.players, this.game.round)
		displaySeatWinds(this.game.players, this.game.prevailingWind)
		this.game.currentPlayer = this.currentPlayer()

		for (const player of Object.values(this.game.players)) {
			for (let i = 1; i <= 13; i++) {
				const tile = this.game.tiles.shift()
				player.door.push(tile)
			}

			sortTiles(player.door, this.game.sorted)
		}

		this.game.tileCount = this.game.tiles.length
		displayDoors(this.game.players)

		await this.replaceFlowers()
		await saveGame(this.game)
	}

	async replaceFlowers() {
		let tileCopy

		for await (const [key, player] of Object.entries(this.game.players)) {
			for (let [index, tile] of Object.entries(player.door)) {
				while (HUAPAI.includes(tile)) {
					tileCopy = tile
					player.flowers.push(tile)

					tile = this.takeTile()
					if (tile) {
						player.door.splice(index, 1, tile)
						displayDoor(key, player)
						await displayFlower(key, tileCopy)
					}
				}
			}

			sortTiles(player.door, this.game.sorted)
			displayDoor(key, player)
		}
	}

	currentPlayer() {
		for (const [key, player] of Object.entries(this.game.players)) {
			if (player.turn) { return parseInt(key) }
		}
	}

	currentDiscarded() {
		for (const [key, player] of Object.entries(this.game.players)) {
			if (player.discarded) { return parseInt(key) }
		}
	}

	takeTile() {
		if (this.game.tiles.length) {
			const tile = this.game.tiles.shift()
			this.game.tileCount = this.game.tiles.length
			displayTileCount(this.game.tileCount)
			return tile
		}

		return false
	}

	humanPlayer() {
		return this.game.currentPlayer === 4
	}

	async play() {
		this.observeDrop()
		this.observeNewTile()
		this.newTile()
	}

	observeNewTile() {
		const options = { childList: true }

		for (const key of AIPLAYERS) {
			let door = document.getElementById('door' + key)
			if (!door) return

			let callback = async(mutationList, observer) => { // eslint-disable-line
				// player has a new tile?
				if (!door.lastChild || !door.lastChild.classList.contains('new-tile')) return

				await delay(1000)

				const chosen = this.game.players[this.game.currentPlayer].door.at(-1)
				if (chosen !== undefined) {
					displayDiscarded(this.game.currentPlayer, chosen)
					this.game.players[this.game.currentPlayer].discarded = true
					this.game.players[this.game.currentPlayer].drop = chosen
					this.game.players[this.game.currentPlayer].door.splice(-1, 1)
					sound('snd/clack.m4a')
				}
			}

			const observer = new MutationObserver(callback)

			window.addEventListener('hashchange', async() => {
				const cleanHash = location.hash.replace('#', '')
				if (cleanHash !== 'table') {
					observer.disconnect()
				}
			})

			try {
				observer.observe(door, options)
			} catch (error) {
				console.log(error)
			}
		}
	}

	// act on tile being dropped into control center
	async observeDrop() {
		const options = { childList: true }

		for (const key of ALLPLAYERS) {
			let drop = document.getElementById('control-drop' + key)
			if (!drop) return

			let callback = async(mutationList, observer) => { // eslint-disable-line
				if (!drop.firstChild) return // no tile

				// remove dropped tile from door
				let tile = this.game.players[key].drop
				if (tile === undefined) return

				// update door, change status to finally discarded
				displayDoor(this.game.currentPlayer, this.game.players[this.game.currentPlayer])
				this.game.players[this.game.currentPlayer].discarded = true

				// melds
				switch (await checkPeng(this.game, tile)) {
				case 'gang':
					this.newTile()
					return
				case 'peng':
					return
				}

				if (await checkChi(this.game, tile)) return

				// no melds
				await delay(1000)

				// remove tile from drop zone
				displayRemoveItem('control-drop', this.game.currentPlayer)

				// put tile on floor
				this.game.players[this.game.currentPlayer].floor.push(tile)
				let index = this.game.players[this.game.currentPlayer].floor.length - 1
				displayFloor(this.game.currentPlayer, tile, index)

				// rotate player
				this.game.players[this.game.currentPlayer].turn = false
				this.game.currentPlayer = modIncrease(this.game.currentPlayer)
				this.game.players[this.game.currentPlayer].turn = true

				// save game state for resumption
				await saveGame(this.game)
				// take a new tile for next player, trigger observeNewTile
				this.newTile()
			}

			const observer = new MutationObserver(callback)

			window.addEventListener('hashchange', async() => {
				const cleanHash = location.hash.replace('#', '')
				if (cleanHash !== 'table') {
					observer.disconnect()
				}
			})

			try {
				observer.observe(drop, options)
			} catch (error) {
				console.log(error)
			}
		}
	}

	async newTile() {
		let tile = this.takeTile()
		let tileCopy

		if (tile) {
			while (HUAPAI.some(obj => JSON.stringify(obj) === JSON.stringify(tile))) {
				tileCopy = tile
				this.game.players[this.game.currentPlayer].flowers.push(tile)

				tile = this.takeTile()
				if (tile) {
					await displayFlower(this.game.currentPlayer, tileCopy)
				}
			}
		}

		if (tile) {
			this.game.players[this.game.currentPlayer].door.push(tile)
			const order = this.game.players[this.game.currentPlayer].door.length - 1
			displayAddToDoor(this.game.currentPlayer, tile, order)

			if (this.humanPlayer()) {
				const door = document.getElementById('door' + this.game.currentPlayer)
				if (!door) return

				door.lastChild.classList.add('new-tile')
				humanTileHandling(this.game, door)
			}
		}
	}
}
