#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module display
 */

import { createElement } from './elements.js'
import { ALLPLAYERS, WINDS } from '../models/tiles.js'
import { createTile } from '../components/tiles.js'
import { delay, sound } from './helpers.js'

function hiliteToggle(target) {
	toggle(target, 'mouseover')
	toggle(target, 'mouseout')
	toggle(target, 'click')

	function toggle(target, event) {
		target.addEventListener(event, hilite)

		async function hilite(e) {
			const target = e.target

			if (target.nodeName === 'IMG' && target.classList.contains('mt')) {
				const alt = target.getAttribute('alt')
				const images = document.querySelectorAll(`img[alt='${alt}']`)

				if (event === 'mouseover') {
					for (const image of images) {
						image.classList.add('hilite')
					}
					return
				}

				for (const image of images) {
					image.classList.remove('hilite')
				}
			}
		}
	}
}

export function displayZoomToggle(target) {
	toggle(target, 'mouseover')
	toggle(target, 'mouseout')

	function toggle(target, event) {
		target.addEventListener(event, zoom)

		async function zoom(e) {
			const target = e.target

			if (target.nodeName === 'IMG' && target.classList.contains('t')) {
				if (event === 'mouseover') {
					target.classList.add('pick')
					return
				}

				target.classList.remove('pick')
			}
		}
	}
}

export function displayPrevailingWind(prevailingWind) {
	for (const key of ALLPLAYERS) {
		const prevailing = document.getElementById('prevailing' + key)
		if (!prevailing) return

		prevailing.classList.remove('prevailing')
		if (prevailingWind == key) {
			prevailing.classList.add('prevailing')
		}
	}
}

export function displaySeatWinds(players, prevailingWind) {
	for (const [key, player] of Object.entries(players)) {
		const seat = document.getElementById('seat' + key)
		if (!seat) return

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

export function displayPoints(players) {
	for (const [key, player] of Object.entries(players)) {
		const points = document.getElementById('points' + key)
		if (!points) return

		points.textContent = player.points
	}
}

export function displayHiliteTiles() {
	const table = document.getElementById('majiang-table')
	if (!table) return

	hiliteToggle(table)
}

export function displayTileCount(tileCount) {
	const elem = document.getElementById('tiles')
	if (!elem) return

	elem.textContent = tileCount
}

export function displayDoors(players) {
	for (const [key, player] of Object.entries(players)) {
		displayDoor(key, player)
	}
}

export async function displayDoor(key, player) {
	const door = document.getElementById('door' + key)
	if (!door) return

	displayRemoveItem('door', key)
	for (const tile of player.door) {
		const img = createTile(tile)
		door.appendChild(img)
	}
}

export function displayMelds(players) {
	for (const [key, player] of Object.entries(players)) {
		displayMeld(key, player)
	}
}

export async function displayMeld(key, player) {
	const melds = document.getElementById('melds' + key)
	if (!melds) return

	displayRemoveItem('melds', key)
	for (const meld of player.melds) {
		const span = createElement('span', ['meld-divider'])
		const div = createElement('div', ['melds', 'tile'])

		let ext
		for (const [key, tile] of Object.entries(meld.meld)) {
			switch (meld.type) {
			case 'chi':
			case 'peng':
				ext = (key == meld.key) ? '-o' : ''
				break
			case 'gang':
				ext = (key == meld.key) ? '-d' : ''
				break
			}

			const img = createTile(tile, ext)
			div.appendChild(img)
		}

		melds.prepend(div, span)
	}
}

export function displayAddToDoor(key, tile) {
	const door = document.getElementById('door' + key)
	if (!door) return

	const img = createTile(tile)
	img.classList.add('new-tile')
	door.appendChild(img)
}

export function displayDiscarded(key, tile) {
	const control = document.getElementById('control-drop' + key)
	if (!control) return

	const img = createTile(tile)
	if (!img) return
	control.appendChild(img)
}

export function displayFloors(players) {
	for (const [key, player] of Object.entries(players)) {
		for (const [index, tile] of Object.entries(player.floor)) {
			displayFloor(key, tile, index)
		}
	}
}

export async function  displayFloor(key, tile, index) {
	const control = document.getElementById('control-player' + key)
	if (!control) return

	let cut = (index == 0) ? false : (index % 6 == 0)
	if (cut) {
		const br = document.createElement('span')
		br.classList.add('break')
		control.appendChild(br)
	}

	const img = createTile(tile)
	control.appendChild(img)

}

export function displayFlowers(players) {
	for (const [key, player] of Object.entries(players)) {
		displayRemoveItem('flowers', key)
		for (const tile of player.flowers) {
			const flowers = document.getElementById('flowers' + key)
			if (!flowers) return

			const img = createTile(tile)
			flowers.appendChild(img)
		}
	}
}

export async function  displayFlower(key, tile) {
	const flowers = document.getElementById('flowers' + key)
	if (!flowers) return

	const img = createTile(tile)
	flowers.appendChild(img)
	img.classList.add('flower')

	sound('snd/buhua.m4a')
	await delay(1500)
}

export function displayRemoveItem(item, key) {
	const elem = document.getElementById(item + key)
	if (!elem) return

	elem.innerHTML = ''
}

function killNode(target, key) {
	const elem = document.getElementById(target + key)
	if (!elem) return

	elem.innerHTML = ''
	elem.replaceWith(elem.cloneNode(true))
}

export async function  displayClearBoard() {
	for (const key of ALLPLAYERS) {
		killNode('door', key)
		killNode('control-drop', key)
		displayRemoveItem('flowers', key)
		displayRemoveItem('melds', key)
		displayRemoveItem('control-player', key)
		displayRemoveItem('control-drop', key)
	}
}
