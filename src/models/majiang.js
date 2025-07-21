#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Majiang
 */

import { VERSION } from '../config.js'
import { HUAPAI, TILES } from './tiles.js'
import { delay, shuffle, sortTiles, zoomToggle, modIncrease, getRandomInt, rot4 } from './helpers.js'
import Players from './players.js'
import Display from './display.js'
import GameIO from './gameio.js'

export default class Majiang {
	constructor() {
		this.players = new Players()
		this.display = new Display()
		this.gameio = new GameIO()

		this.game = this.gameio.fetchGame()
		this.newGameListen()
		this.hashListen()
	}

	hashListen() {
		window.addEventListener('hashchange', () => {
			this.hashLocator()
		})

		this.hashLocator()
	}

	async hashLocator() {
		const cleanHash = location.hash.replace('#', '')
		if (cleanHash === 'table') {
			await this.layoutGame()
		}
	}

	newGameListen() {
		const button = document.getElementById('new-game')
		if (!button) { return }

		button.onclick = async() => {
			location.hash = 'table'
			window.addEventListener('hashchange', async() => {
				await this.display.clearBoard()
				await this.initGame()
				await this.layoutGame()
			}, { once: true })
		}
	}

	async layoutGame() {
		if (!this.game) {
			return
		}

		this.display.displayPrevailingWind(this.game.prevailingWind)
		this.display.displaySeatWinds(this.game.players, this.game.prevailingWind)
		this.display.displayStacks(this.game.players)
		this.display.displayFlowers(this.game.players)
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
			players: this.players.players,
		}

		this.display.displayPrevailingWind(this.game.prevailingWind)
		this.determineSeatWinds(this.game.round)
		this.display.displaySeatWinds(this.game.players, this.game.prevailingWind)
		this.game.currentPlayer = this.currentPlayer()

		for (const player of Object.values(this.game.players)) {
			for (let i = 1; i <= 13; i++) {
				let tile = this.game.tiles.shift()
				player.door.push(tile)
			}

			sortTiles(player.door)
		}

		this.game.tileCount = this.game.tiles.length
		this.display.displayStacks(this.game.players)

		await this.replaceFlowers()
		this.gameio.saveGame(this.game)
	}

	async replaceFlowers() {
		let tileCopy

		for (const [key, player] of Object.entries(this.game.players)) {
			for (let [index, tile] of Object.entries(player.door)) {
				while (HUAPAI.includes(tile)) {
					tileCopy = tile
					player.flowers.push(tile)

					tile = this.takeTile()
					if (tile) {
						player.door.splice(index, 1, tile)
						this.display.displayStack(key, player)
						await this.display.displayFlower(key, tileCopy)
					}
				}
			}

			sortTiles(player.door)
			this.display.displayStack(key, player)
		}
		this.display.hiliteTiles()
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
		if (this.currentDiscarded()) {
			await this.checkActions()
		} else {
			this.newTile()
		}
	}

	newTile() {
		const currentPlayer = this.game.currentPlayer
		const player = this.game.players[currentPlayer]
		const tile = this.takeTile()

		player.door.push(tile)
		this.display.displayStack(currentPlayer, player)
		new Audio('snd/clack.m4a').play()

		const door = document.getElementById('tiles' + currentPlayer)
		door.lastChild.classList.add('new-tile')
		delay(1000)

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

				this.display.displayStack(currentPlayer, player)
				new Audio('snd/clack.m4a').play()
				delay(1000)

				player.turn = false
				this.game.currentPlayer = modIncrease(this.game.currentPlayer)
				this.game.players[this.game.currentPlayer].turn = true

				console.log(this.game, this.currentDiscarded(), this.currentPlayer())
			}, { once: true })
		} else {
			this.display.displayDiscarded(currentPlayer, tile)

			new Audio('snd/clack.m4a').play()
			delay(1000)
			this.game.players[this.game.currentPlayer].discarded = true
			// player.door.splice(-1, 1)
			// this.display.displayStack(currentPlayer, player)
			player.floor.push(tile)
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
