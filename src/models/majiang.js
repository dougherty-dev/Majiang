#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Majiang
 */

import { VERSION } from '../config.js'
import { HUAPAI, TILES } from './tiles.js'
import { shuffle, sortTiles, zoomToggle, modIncrease, getRandomInt, rot4, sound } from './helpers.js'
import Players from './players.js'
import Display from './display.js'
import GameIO from './gameio.js'

export default class Majiang {
	constructor() {
		this.players = new Players()
		this.display = new Display()
		this.gameio = new GameIO()

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
				this.game = this.gameio.fetchGame()
				this.layoutGame()
			} else {
				this.newGame = false
			}
		}
	}

	newGameListen() {
		const button = document.getElementById('new-game')
		if (!button) { return }

		button.onclick = async() => {
			this.game = null
			this.newGame = true
			location.hash = 'table'
			window.addEventListener('hashchange', async() => {
				await this.display.clearBoard()
				await this.initGame()
				await this.layoutGame()
			}, { once: true})
		}
	}

	async layoutGame() {
		if (!this.game) { return }
		this.display.clearBoard()
		this.display.displayPrevailingWind(this.game.prevailingWind)
		this.display.displaySeatWinds(this.game.players, this.game.prevailingWind)
		this.display.displayDoors(this.game.players)
		this.display.displayFlowers(this.game.players)
		this.display.displayFloors(this.game.players)
		this.display.displayPoints(this.game.players)
		this.display.displayTileCount(this.game.tileCount)
		this.display.hiliteTiles()
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
			players: new Players().players,
		}

		this.display.displayPrevailingWind(this.game.prevailingWind)
		this.determineSeatWinds(this.game.round)
		this.display.displaySeatWinds(this.game.players, this.game.prevailingWind)
		this.game.currentPlayer = this.currentPlayer()

		for (const player of Object.values(this.game.players)) {
			for (let i = 1; i <= 13; i++) {
				const tile = this.game.tiles.shift()
				player.door.push(tile)
			}

			sortTiles(player.door)
		}

		this.game.tileCount = this.game.tiles.length
		this.display.displayDoors(this.game.players)

		await this.replaceFlowers()
		await this.gameio.saveGame(this.game)
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
						this.display.displayDoor(key, player)
						await this.display.displayFlower(key, tileCopy)
					}
				}
			}

			sortTiles(player.door)
			this.display.displayDoor(key, player)
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
			this.display.displayTileCount(this.game.tileCount)
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

	newTileold() {
		const currentPlayer = this.game.currentPlayer
		const player = this.game.players[currentPlayer]
		const tile = this.takeTile()

		player.door.push(tile)
		this.display.displayDoor(currentPlayer, player)

		const door = document.getElementById('door' + currentPlayer)
		door.lastChild.classList.add('new-tile')

		if (this.humanPlayer()) {
			zoomToggle(door)

			door.addEventListener('click', (e) => {
				const index = e.target.dataset.order
				const chosen = player.door[index]

				player.door.splice(index, 1)

				this.display.displayDiscarded(currentPlayer, chosen)
				this.game.players[this.game.currentPlayer].discarded = true

				door.innerHTML = ''
				door.replaceWith(door.cloneNode(true))

				this.display.displayDoor(currentPlayer, player)
				sound('snd/clack.m4a')

				player.turn = false
				this.game.currentPlayer = modIncrease(this.game.currentPlayer)
				this.game.players[this.game.currentPlayer].turn = true

				console.log(this.game, this.currentDiscarded(), this.currentPlayer())
			}, { once: true })
		} else {
			this.display.displayDiscarded(currentPlayer, tile)
			sound('snd/clack.m4a')
			this.game.players[this.game.currentPlayer].discarded = true
			player.floor.push(tile)
		}
	}

	observeNewTile() {
		const options = { childList: true }

		for (const key of [1, 2, 3, 4]) {
			let door = document.getElementById('door' + key)
			// eslint-disable-next-line no-unused-vars
			let callback = async(mutationList, observer) => {
				// player has a new tile?
				if (!door.lastChild || !door.lastChild.classList.contains('new-tile')) { return }

				setTimeout(async() => {
					const chosen = this.game.players[this.game.currentPlayer].door.at(-1)
					if (chosen !== undefined) {
						this.display.displayDiscarded(this.game.currentPlayer, chosen)
						this.game.players[this.game.currentPlayer].discarded = true
						sound('snd/clack.m4a')
					}
				}, 1000)
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

		for (const key of [1, 2, 3, 4]) {
			let drop = document.getElementById('control-drop' + key)

			// eslint-disable-next-line no-unused-vars
			let callback = async(mutationList, observer) => {
				if (!drop.firstChild) { return } // no tile

				// remove dropped tile from door
				let tile = this.game.players[key].door.splice(-1, 1)[0]
				if (tile === undefined) { return }

				// update door, change status to finally discarded
				this.display.displayDoor(this.game.currentPlayer, this.game.players[this.game.currentPlayer])
				this.game.players[this.game.currentPlayer].discarded = true

				setTimeout(async() => {
					// remove tile from drop zone
					this.display.removeItem('control-drop', this.game.currentPlayer)

					// put tile on floor
					this.game.players[this.game.currentPlayer].floor.push(tile)
					let index = this.game.players[this.game.currentPlayer].floor.length - 1
					this.display.displayFloor(this.game.currentPlayer, tile, index)

					// rotate player
					this.game.players[this.game.currentPlayer].turn = false
					this.game.currentPlayer = modIncrease(this.game.currentPlayer)
					this.game.players[this.game.currentPlayer].turn = true

					// save game state for resumption
					await this.gameio.saveGame(this.game)
					// take a new tile for next player, trigger observeNewTile
					this.newTile()
				}, 1000)
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

	async newTile() {
		let tile = this.takeTile()
		let tileCopy

		if (tile) {
			while (HUAPAI.some(obj => JSON.stringify(obj) === JSON.stringify(tile))) {
				tileCopy = tile
				this.game.players[this.game.currentPlayer].flowers.push(tile)

				tile = this.takeTile()
				if (tile) {
					await this.display.displayFlower(this.game.currentPlayer, tileCopy)
				}
			}
		}

		if (tile) {
			this.game.players[this.game.currentPlayer].door.push(tile)
			this.display.addToDoor(this.game.currentPlayer, tile)
		}
	}

	async checkActions() {
		console.log('checkActions')
		// this.game.active = false
	}

	findEast(round) {
		return (() => {
			switch (round) {
			case 1:
				return getRandomInt(1, 4)
			default:
				return Object.entries(this.game.players).findIndex(obj => { return obj.wind === 1 })
			}
		})()
	}

	async determineSeatWinds(round) {
		const players = this.game.players
		const east = this.findEast(round)

		let south, west, north

		switch (round) {
		case 1:
			for (let [key, player] of Object.entries(players)) {
				key = parseInt(key)
				player.wind = rot4(east, key)
				player.turn = east === key
			}
			break
		case 2:
			;[south, west, north] = [rot4(east, 1), rot4(east, 2), rot4(east, 3)]
			;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
				[players[south].wind, players[east].wind, players[north].wind, players[west].wind]
			break
		case 3:
			;[north, west, south] = [rot4(east, 1), rot4(east, 2), rot4(east, 3)]
			;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
				[players[west].wind, players[north].wind, players[south].wind, players[east].wind]
			break
		case 4:
			;[west, north, south] = [rot4(east, 1), rot4(east, 2), rot4(east, 3)]
			;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
				[players[south].wind, players[east].wind, players[north].wind, players[west].wind]
			break
		}
	}
}
