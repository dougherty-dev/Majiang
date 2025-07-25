#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Display
 */

import { ALLPLAYERS, WINDS } from './tiles.js'
import { delay, hiliteToggle, sound } from './helpers.js'

export default class Display {
	displayPrevailingWind(prevailingWind) {
		for (const key of ALLPLAYERS) {
			const prevailing = document.getElementById('prevailing' + key)
			if (!prevailing) { return }

			prevailing.classList.remove('prevailing')
			if (prevailingWind == key) {
				prevailing.classList.add('prevailing')
			}
		}
	}

	displaySeatWinds(players, prevailingWind) {
		for (const [key, player] of Object.entries(players)) {
			const seat = document.getElementById('seat' + key)
			if (!seat) { return }

			seat.innerHTML = ''

			const img = document.createElement('img')
			img.width = 17
			img.height = 20
			img.alt = WINDS[player.wind][1]
			img.classList.add('wind')
			img.src = 'img/' + WINDS[player.wind][0] + '.svg'

			seat.appendChild(img)
			seat.classList.remove('prevailing')
			if (prevailingWind == player.wind) {
				seat.classList.add('prevailing')
			}
		}
	}

	displayPoints(players) {
		for (const [key, player] of Object.entries(players)) {
			const points = document.getElementById('points' + key)
			if (!points) { return }

			points.textContent = player.points
		}
	}

	displayTileCount(tileCount) {
		const elem = document.getElementById('tiles')
		if (!elem) { return }

		elem.textContent = tileCount
	}

	createTile(tile) {
		const img = document.createElement('img')
		img.setAttribute('id', `t${tile[0]}`)
		img.width = 19
		img.height = 26
		img.alt = tile[5]
		img.classList.add('t')
		img.src = 'img/tiles/' + tile[6] + '.svg'
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
		const door = document.getElementById('door' + key)
		if (!door) { return }

		this.removeItem('door', key)
		for (const tile of player.door) {
			const img = this.createTile(tile)
			door.appendChild(img)
		}
	}

	addToDoor(key, tile) {
		const door = document.getElementById('door' + key)
		if (!door) { return }

		const img = this.createTile(tile)
		img.classList.add('new-tile')
		door.appendChild(img)
	}

	displayDiscarded(key, tile) {
		const control = document.getElementById('control-drop' + key)
		if (!control) { return }

		const img = this.createTile(tile)
		control.appendChild(img)
	}

	displayFloors(players) {
		for (const [key, player] of Object.entries(players)) {
			for (const [index, tile] of Object.entries(player.floor)) {
				this.displayFloor(key, tile, index)
			}
		}
	}

	async displayFloor(key, tile, index) {
		const control = document.getElementById('control-player' + key)
		if (!control) { return }

		let cut = (index == 0) ? false : (index % 6 == 0)
		if (cut) {
			const br = document.createElement('span')
			br.classList.add('break')
			control.appendChild(br)
		}

		const img = this.createTile(tile)
		control.appendChild(img)

	}

	displayFlowers(players) {
		for (const [key, player] of Object.entries(players)) {
			this.removeItem('flowers', key)
			for (const tile of player.flowers) {
				const flowers = document.getElementById('flowers' + key)
				if (!flowers) { return }

				const img = this.createTile(tile)
				flowers.appendChild(img)
			}
		}
	}

	async displayFlower(key, tile) {
		const flowers = document.getElementById('flowers' + key)
		if (!flowers) { return }

		const img = this.createTile(tile)
		flowers.appendChild(img)
		img.classList.add('flower')

		sound('snd/buhua.m4a')
		await delay(1500)
	}

	removeItem(item, key) {
		const elem = document.getElementById(item + key)
		if (!elem) { return }

		elem.innerHTML = ''
	}

	killNode(target, key) {
		const elem = document.getElementById(target + key)
		if (!elem) { return }

		elem.innerHTML = ''
		elem.replaceWith(elem.cloneNode(true))
	}

	async clearBoard() {
		for (const key of ALLPLAYERS) {
			this.killNode('door', key)
			this.killNode('control-drop', key)
			this.removeItem('flowers', key)
			this.removeItem('melds', key)
			this.removeItem('control-player', key)
			this.removeItem('control-drop', key)
		}
	}
}
