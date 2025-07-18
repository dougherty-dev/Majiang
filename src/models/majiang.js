#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Majiang
 */

import { HUAPAI, TILES } from './tiles.js'
import { shuffle, delay, hiliteHelper } from './helpers.js'

class Player {
	constructor() {
		this.player = {
			points: 0,
			wind: null,
			tingpai: false,
			stack: [],
			melds: [],
			flowers: [],
			discarded: []
		}
	}
}

class Majiang {
	constructor() {
		this.fetchGame()
		this.newGame()

		window.addEventListener('hashchange', () => {
			this.hashLocator()
		})

		this.hashLocator()
	}

	hashLocator() {
		if (location.hash === '#table') {
			this.layoutGame()
		}
	}

	async layoutGame() {
		if (!this.game) {
			return
		}

		this.displayStacks()
		this.displayFlowers()
		this.displayPoints()
		this.displayTileCount()
		this.prevailingWind()
		this.hiliteTiles()
	}

	prevailingWind() {
		for (const [key, player] of Object.entries(this.game.players)) {
			document.getElementById('prevailing' + key).classList.remove('prevailing')
			if (this.game.prevailingWind == player.wind) {
				document.getElementById('prevailing' + key).classList.add('prevailing')
			}
		}
	}

	displayPoints() {
		for (const [key, player] of Object.entries(this.game.players)) {
			document.getElementById('points' + key).textContent = player.points
		}
	}

	displayTileCount() {
		document.getElementById('tiles').textContent = this.game.tileCount
	}

	createTile(alt, src) {
		const img = document.createElement('img')
		img.width = 19
		img.height = 26
		img.alt = alt
		img.classList.add('t')
		img.src = 'img/tiles/' + src + '.svg'
		return img
	}

	newGame() {
		const button = document.getElementById('new-game')
		if (button) {
			button.onclick = async() => {
				location.hash = 'table'
				window.addEventListener('hashchange', async() => {
					await this.clearBoard()
					await this.initGame()
					await this.layoutGame()
				}, { once: true })
			}
		}
	}

	hiliteTiles() {
		const table = document.getElementById('majiang-table')

		hiliteHelper(table, 'mouseover', 'add')
		hiliteHelper(table, 'mouseout', 'remove')
	}

	async displayStacks() {
		for (const [key, player] of Object.entries(this.game.players)) {
			this.displayStack(key, player)
		}
	}

	displayStack(key, player) {
		this.removeItem('tiles', key)
		player.stack.forEach(tile => {
			const img = this.createTile(tile[4], tile[5])
			document.getElementById('tiles' + key).appendChild(img)
		})
	}

	removeItem(item, key) {
		document.getElementById(item + key).innerHTML = ''
	}

	async displayFlowers() {
		for (const [key, player] of Object.entries(this.game.players)) {
			this.removeItem('flowers', key)
			for (const tile of player.flowers) {
				const img = this.createTile(tile[4], tile[5])
				document.getElementById('flowers' + key).appendChild(img)
			}
		}
	}

	async displayFlower(key, tile) {
		const img = this.createTile(tile[4], tile[5])
		document.getElementById('flowers' + key).appendChild(img)

		new Audio('snd/buhua.m4a').play()
		await delay(1500)
	}

	async clearBoard() {
		for (const key of [1, 2, 3, 4]) {
			document.getElementById('tiles' + key).innerHTML = ''
			document.getElementById('flowers' + key).innerHTML = ''
			document.getElementById('melds' + key).innerHTML = ''
			document.getElementById('control-player' + key).innerHTML = ''
		}
	}

	async initGame() {
		let tiles = Object.assign([], TILES)

		let players = {
			1: new Player().player,
			2: new Player().player,
			3: new Player().player,
			4: new Player().player
		}

		this.game = {
			round: 1,
			hand: 1,
			prevailingWind: 1,
			tiles: shuffle(tiles),
			tileCount: tiles.length,
			players: players,
		}

		for (let i = 1; i <= 13; i++) {
			Object.values(this.game.players).forEach(player => {
				let tile = this.game.tiles.shift()
				player.stack.push(tile)
			})
		}

		for (const [key, player] of Object.entries(this.game.players)) {
			this.sortTiles(player.stack)
			player.wind = key
		}

		this.game.tileCount = this.game.tiles.length
		this.displayStacks()

		await this.replaceFlowers()

		this.saveGame()
	}

	async replaceFlowers() {
		let tileCopy

		for (const [key, player] of Object.entries(this.game.players)) {
			for (let [index, tile] of Object.entries(player.stack)) {
				while (HUAPAI.includes(tile)) {
					tileCopy = tile
					player.flowers.push(tile)

					tile = this.takeTile()
					if (tile) {
						player.stack.splice(index, 1, tile)
						this.displayStack(key, player)
						await this.displayFlower(key, tileCopy)
					}
				}
			}

			this.sortTiles(player.stack)
			this.displayStack(key, player)
		}
	}

	takeTile() {
		if (this.game.tiles.length) {
			const tile = this.game.tiles.shift()
			this.game.tileCount = this.game.tiles.length
			this.displayTileCount()
			return tile
		}

		return false
	}

	sortTiles(tiles) {
		tiles.sort((a, b) => a[1].localeCompare(b[1]))
	}

	fetchGame() {
		this.game = null
		const game = localStorage.getItem('game')
		if (game) {
			try {
				this.game = JSON.parse(game)
			} catch (e) {
				console.log(e)
				this.game = null
			}
		}
	}

	saveGame() {
		localStorage.setItem('game', JSON.stringify(this.game))
	}
}

export default Majiang
