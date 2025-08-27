#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/floor
 * @description Display functions pertaining to the floor.
 * @property {Function} displayFloors Display tiles on floor for all players.
 * @property {Function} displayFloor Lay out a discarded tile for individual player.
 * @property {Function} displayRound Display information about round, rotation and hand.
 */

import { createTile } from '../tiles.js'

/**
 * Display tiles on floor for all players.
 * @param {Object} players The players structure.
 */
export function displayFloors(players) {
	for (const [key, player] of Object.entries(players)) {
		for (const [index, tile] of Object.entries(player.floor)) {
			displayFloor(key, tile, index)
		}
	}
}

/**
 * Lay out a discarded tile for individual player, with a break at every six tiles.
 * @param {number} key Player number.
 * @param {Object} tile The tile.
 * @param {number} index Order in the sequence of discarded tiles.
 * @returns 
 */
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

/**
 * Display information about round, rotation and hand in the header title.
 * @param {number} round The round (1–4).
 * @param {number} rotation The rotation (1–4).
 * @param {number} hand The hand (1–).
 */
export function displayRound(round, rotation, hand) {
	const span = document.getElementById('header-display')
	if (!span) return

	span.textContent = `R${round} | r${rotation} | H${hand}`
}
