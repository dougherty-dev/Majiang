#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Majiang
 */

import { VERSION } from '../config.js'
import { HUAPAI, TILES } from './tiles.js'
import { shuffle } from './helpers.js'
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
		if (location.hash === '#table') {
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
		this.players.determineSeatWinds(this.game.round)
		this.display.displaySeatWinds(this.game.players, this.game.prevailingWind)

		for (const player of Object.values(this.game.players)) {
			for (let i = 1; i <= 13; i++) {
				let tile = this.game.tiles.shift()
				player.door.push(tile)
			}

			this.sortTiles(player.door)
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

			this.sortTiles(player.door)
			this.display.displayStack(key, player)
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

	sortTiles(tiles) {
		tiles.sort((a, b) => a[1].localeCompare(b[1]))
	}
}
