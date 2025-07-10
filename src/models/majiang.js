#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Majiang
 */

import { BEIMIAN, HUAPAI, ZIPAI, BINGZI, TIAOZI, WANZI, TILES } from './tiles.js'
import { getRandomInt } from './helpers.js'

class Majiang  {
	constructor() {
		this.game = null
	}

	createTile(alt, src) {
		const img = document.createElement('img')
		img.height = 1
		img.width = 1
		img.alt = alt
		img.src = 'img/tiles/' + src + '.svg'
		return img
	}

	newGame() {
		const button = document.getElementById('new-game')
		if (button) {
			button.onclick = async () => {
				location.hash = 'board'
				window.addEventListener('hashchange', async () => {
					await this.initGame()
					document.getElementById('tiles').textContent = this.game.tileCount
					console.log(this.game.players)
					for (const [key, player] of Object.entries(this.game.players)) {
						document.getElementById('points' + key).innerHTML = player.points
						document.getElementById('tiles' + key).innerHTML = ''
						player.stack.forEach(tile => {
							const img = this.createTile(tile[4], tile[5])
							document.getElementById('tiles' + key).appendChild(img)
						})

						document.getElementById('flowers' + key).innerHTML = ''
						document.getElementById('melds' + key).innerHTML = ''
					}
				})
			}
		}
	}

	async initGame() {
		let tiles = TILES
		tiles.sort(() => Math.random() - 0.5)

		const player = {
			points: 0,
			wind: null,
			stack: [],
			melds: [],
			flowers: [],
			discarded: []
		}

		let players = {
			1: JSON.parse(JSON.stringify(player)),
			2: JSON.parse(JSON.stringify(player)),
			3: JSON.parse(JSON.stringify(player)),
			4: JSON.parse(JSON.stringify(player))
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
			Object.values(players).forEach(player => {
				player.stack.push(tiles.shift())
			});
		}

		this.game.tileCount = tiles.length
	}
}

export default Majiang
