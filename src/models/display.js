#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Display
 */

import { WINDS } from './tiles.js'
import { delay, hiliteHelper } from './helpers.js'

const playerArray = [1, 2, 3, 4]

export default class Display {
	displayPrevailingWind(prevailingWind) {
		for (const key of playerArray) {
			document.getElementById('prevailing' + key).classList.remove('prevailing')
			if (prevailingWind == key) {
				document.getElementById('prevailing' + key).classList.add('prevailing')
			}
		}
	}

	displaySeatWinds(players, prevailingWind) {
		for (const [key, player] of Object.entries(players)) {
			document.getElementById('seat' + key).innerHTML = ''

			const img = document.createElement('img')
			img.width = 17
			img.height = 20
			img.alt = WINDS[player.wind][1]
			img.classList.add('wind')
			img.src = 'img/' + WINDS[player.wind][0] + '.svg'

			document.getElementById('seat' + key).appendChild(img)
			document.getElementById('seat' + key).classList.remove('prevailing')
			if (prevailingWind == player.wind) {
				document.getElementById('seat' + key).classList.add('prevailing')
			}
		}
	}

	displayPoints(players) {
		for (const [key, player] of Object.entries(players)) {
			document.getElementById('points' + key).textContent = player.points
		}
	}

	displayTileCount(tileCount) {
		document.getElementById('tiles').textContent = tileCount
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

	hiliteTiles() {
		const table = document.getElementById('majiang-table')
		if (!table) { return }

		hiliteHelper(table, 'mouseover', 'add')
		hiliteHelper(table, 'mouseout', 'remove')
	}

	displayStacks(players) {
		for (const [key, player] of Object.entries(players)) {
			this.displayStack(key, player)
		}
	}

	displayStack(key, player) {
		this.removeItem('tiles', key)
		player.door.forEach(tile => {
			const img = this.createTile(tile[4], tile[5])
			document.getElementById('tiles' + key).appendChild(img)
		})
	}

	removeItem(item, key) {
		document.getElementById(item + key).innerHTML = ''
	}

	displayFlowers(players) {
		for (const [key, player] of Object.entries(players)) {
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
		for (const key of playerArray) {
			document.getElementById('tiles' + key).innerHTML = ''
			document.getElementById('flowers' + key).innerHTML = ''
			document.getElementById('melds' + key).innerHTML = ''
			document.getElementById('control-player' + key).innerHTML = ''
		}
	}
}
