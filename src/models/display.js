#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Display
 */

import { WINDS } from './tiles.js'
import { delay, hiliteToggle, sound } from './helpers.js'

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

	createTile(alt, src, index = false) {
		const img = document.createElement('img')
		img.width = 19
		img.height = 26
		img.alt = alt
		img.classList.add('t')
		img.src = 'img/tiles/' + src + '.svg'
		if (index) {
			img.dataset.order = index
		}
		return img
	}

	hiliteTiles() {
		const table = document.getElementById('majiang-table')
		if (!table) { return }

		hiliteToggle(table)
	}

	displayDoors(players) {
		for (const [key, player] of Object.entries(players)) {
			this.displayDoor(key, player)
		}
	}

	async displayDoor(key, player) {
		this.removeItem('door', key)
		for (const [index, tile] of Object.entries(player.door)) {
			const img = this.createTile(tile[4], tile[5], index)
			document.getElementById('door' + key).appendChild(img)
		}
	}

	addToDoor(key, tile) {
		const img = this.createTile(tile[4], tile[5], 100)
		img.classList.add('new-tile')
		document.getElementById('door' + key).appendChild(img)
	}

	displayDiscarded(key, tile) {
		const img = this.createTile(tile[4], tile[5])
		document.getElementById('control-drop' + key).appendChild(img)
	}

	async displayFloor(key, tile, cut = false) {
		const control = document.getElementById('control-player' + key)

		const img = this.createTile(tile[4], tile[5])
		control.appendChild(img)

		if (cut) {
			const br = document.createElement('span')
			br.classList.add('break')
			control.appendChild(br)
		}
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
		img.classList.add('flower')

		sound('snd/buhua.m4a')
		await delay(1500)
	}

	async clearBoard() {
		for (const key of playerArray) {
			document.getElementById('door' + key).innerHTML = ''
			document.getElementById('flowers' + key).innerHTML = ''
			document.getElementById('melds' + key).innerHTML = ''
			document.getElementById('control-player' + key).innerHTML = ''
			document.getElementById('control-drop' + key).innerHTML = ''
		}
	}
}
