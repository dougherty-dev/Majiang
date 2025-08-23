#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/floor
 */

import { createTile } from '../tiles.js'

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

export function displayRound(round, rotation, hand) {
	const span = document.getElementById('header-display')
	if (!span) return

	span.textContent = `R${round} | r${rotation} | H${hand}`
}
