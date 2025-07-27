#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Majiang
 */

import { VERSION } from '../config.js'
import { ALLPLAYERS, AIPLAYERS, HUAPAI, TILES, createTile } from './tiles.js'
import { delay, shuffle, sortTiles, modIncrease, sound } from '../components/helpers.js'
import { displayAddToDoor, displayClearBoard, displayDiscarded, displayDoor, displayDoors,
	displayFloor, displayFloors, displayFlower,displayFlowers, displayHiliteTiles, displayPoints,
	displayPrevailingWind, displayRemoveItem, displaySeatWinds, displayTileCount, displayZoomToggle } from '../components/display.js'
import { determineSeatWinds } from '../components/winds.js'
import { enableDrag } from '../components/drag.js'
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

			observer.observe(door, options)
		}
	}

	// act on tile being dropped into control center
	async observeDrop() {
		const options = { childList: true }

		for (const key of ALLPLAYERS) {
			let drop = document.getElementById('control-drop' + key)

			let callback = async(mutationList, observer) => { // eslint-disable-line
				if (!drop.firstChild) return // no tile

				// remove dropped tile from door
				let tile = this.game.players[key].drop
				if (tile === undefined) return

				// update door, change status to finally discarded
				displayDoor(this.game.currentPlayer, this.game.players[this.game.currentPlayer])
				this.game.players[this.game.currentPlayer].discarded = true

				// perform action on tile?
				// await this.checkChi(tile)
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

			observer.observe(drop, options)
		}
	}

	async checkChi(tile) {
		const nextPlayer = modIncrease(this.game.currentPlayer)

		let type = tile[3].split(' ')
		let value = tile[1]

		if (!['bingzi', 'tiaozi', 'wanzi'].includes(type[0])) {
			await delay(1000)
			return
		}

		let patterns = []
		switch (value) {
		case 1:
			patterns.push([2, 3])
			break
		case 2:
			patterns.push([1, 3], [3, 4])
			break
		case 8:
			patterns.push([6, 7], [7, 9])
			break
		case 9:
			patterns.push([7, 8])
			break
		default:
			patterns.push([value - 2, value - 1], [value - 1, value + 1], [value + 1, value + 2])
		}

		let door = []
		for (const paizi of this.game.players[nextPlayer].door) {
			if (paizi[3].startsWith(type[0])) {
				door.push(parseInt(paizi[3].split(' ')[1]))
			}
		}

		let set = [...new Set(door)].sort()

		let melds = []
		for (const pattern of patterns) {
			if (pattern.every(value => set.includes(value))) {
				melds.push(pattern)
			}
		}

		let meldTiles = []
		let chi
		let index
		let hand = Array.from(this.game.players[nextPlayer].door)
		for (let meld of melds) {
			chi = [tile]
			for (const paizi of meld) {
				index = hand.findIndex(elem => elem[1] === paizi && elem[3].startsWith(type[0]))
				chi.push(hand[index])
			}

			sortTiles(chi)
			meldTiles.push(chi)
		}
		console.log('meldTiles: ', meldTiles)

		if (nextPlayer === 4) {
			let img
			let span
			const div = document.createElement('div')
			div.classList.add('meld')
			for (const meldSet of meldTiles) {
				span = document.createElement('span')
				for (const paizi of meldSet) {
					img = createTile(paizi)
					span.appendChild(img)
				}
				div.appendChild(span)
			}
			document.body.appendChild(div)
		}


		await delay(1000)
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
				this.humanTile()
			}
		}
	}

	humanTile() {
		const door = document.getElementById('door' + this.game.currentPlayer)
		if (!door) return

		door.lastChild.classList.add('new-tile')

		displayZoomToggle(door)

		door.addEventListener('click', (e) => {
			const index = Array.from(door.children).findIndex(elem => elem.dataset.id === e.target.dataset.id)
			const chosen = this.game.players[this.game.currentPlayer].door[index]
			this.game.players[this.game.currentPlayer].drop = chosen
			this.game.players[this.game.currentPlayer].door.splice(index, 1)

			displayDiscarded(this.game.currentPlayer, chosen)
			this.game.players[this.game.currentPlayer].discarded = true
			sound('snd/clack.m4a')

			sortTiles(this.game.players[this.game.currentPlayer].door, this.game.sorted)
			displayDoor(this.game.currentPlayer, this.game.players[this.game.currentPlayer])

		}, { once: true })
	}
}
