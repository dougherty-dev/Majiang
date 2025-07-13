#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Majiang
 */

import { BEIMIAN, HUAPAI, ZIPAI, BINGZI, TIAOZI, WANZI, TILES } from './tiles.js'
import { delay, getRandomInt } from './helpers.js'

class Player {
	constructor() {
		this.player = {
			points: 0,
			wind: null,
			stack: [],
			melds: [],
			flowers: [],
			discarded: []
		}
	}
}

class Majiang {
	constructor() {
		this.game = null
	}

	createTile(alt, src) {
		const img = document.createElement('img')
		img.width = 19
		img.height = 26
		img.alt = alt
		img.src = 'img/tiles/' + src + '.svg'
		return img
	}

	newGame() {
		const button = document.getElementById('new-game')
		if (button) {
			button.onclick = async() => {
				location.hash = 'table'
				window.addEventListener('hashchange', async() => {
					await this.initGame()
					await this.clearBoard()
					await this.placeStacks()
					await this.placeFlowers()
				}, { once: true })
			}
		}
	}

	async placeStacks() {
		for (const [key, player] of Object.entries(this.game.players)) {
			this.placeStack(key, player)
		}
	}

	placeStack(key, player) {
		this.sortTiles(player.stack)
		document.getElementById('tiles' + key).innerHTML = ''
		player.stack.forEach(tile => {
			const img = this.createTile(tile[4], tile[5])
			document.getElementById('tiles' + key).appendChild(img)
		})
	}

	async placeFlowers() {
		for (const [key, player] of Object.entries(this.game.players)) {
			for (const tile of player.flowers) {
				const img = this.createTile(tile[4], tile[5])
				document.getElementById('flowers' + key).appendChild(img)
				// new Audio('snd/buhua.m4a').play()
				// await delay(2000)
			}
		}
	}

	async clearBoard() {
		document.getElementById('tiles').textContent = this.game.tileCount

		for (const [key, player] of Object.entries(this.game.players)) {
			document.getElementById('points' + key).textContent = player.points
			document.getElementById('tiles' + key).innerHTML = ''
			document.getElementById('flowers' + key).innerHTML = ''
			document.getElementById('melds' + key).innerHTML = ''
			document.getElementById('control-player' + key).innerHTML = ''
		}
	}

	async initGame() {
		let tiles = TILES
		tiles.sort(() => Math.random() - 0.5)

		let players = {
			1: new Player().player,
			2: new Player().player,
			3: new Player().player,
			4: new Player().player
		}

		this.game = {
			round: 1,
			hand: 1,
			prevailingWind: getRandomInt(1, 4),
			tiles: tiles,
			tileCount: tiles.length,
			players: players,
		}

		for (let i = 1; i <= 13; i++) {
			Object.values(this.game.players).forEach(player => {
				let tile = tiles.shift()
				while (HUAPAI.includes(tile)) {
					player.flowers.push(tile)
					tile = tiles.shift()
				}
				player.stack.push(tile)
			})
		}

		for (const [key, player] of Object.entries(this.game.players)) {
			this.sortTiles(player.stack)
			this.sortTiles(player.flowers)
			player.wind = ZIPAI[Math.abs(key - this.game.prevailingWind)]
			console.log(player)
		}

		this.game.tileCount = this.game.tiles.length
	}

	sortTiles(tiles) {
		tiles.sort((a, b) => a[1].localeCompare(b[1]))
	}
}

export default Majiang
