#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/door
 * @description Display functions pertaining to the players’ doors (hands).
 * @property {function} displayDoors Display all players’ doors.
 * @property {function} displayDoor Display an individual player’s door.
 * @property {function} displayAddToDoor Display a fresh tile taken from the wall.
 * @property {function} revealDoors Reveal all tiles at the end of a played hand.
 */

import { createTile } from '../tiles.js'
import { displayRemoveItem } from './display.js'

/**
 * Display all players’ doors.
 * @param {object} players The players structure.
 */
export function displayDoors(players) {
	for (const [key, player] of Object.entries(players)) {
		displayDoor(key, player)
	}
}

/**
 * Display an individual player’s door.
 * @param {number} key Player number.
 * @param {object} player The player structure.
 */
export async function displayDoor(key, player) {
	const door = document.getElementById('door' + key)
	if (!door) return

	displayRemoveItem('door', key)
	for (const tile of player.door) {
		const img = createTile(tile, '', key != 4)
		door.appendChild(img)
	}
}

/**
 * Display a fresh tile taken from the wall.
 * @param {number} key Player number.
 * @param {object} tile The tile.
 */
export function displayAddToDoor(key, tile) {
	const door = document.getElementById('door' + key)
	if (!door) return

	const img = createTile(tile, '', key != 4)
	img.classList.add('new-tile', 'tile-divider')
	door.appendChild(img)
}

/**
 * Reveal all tiles at the end of a played hand.
 * @param {object} players The players structure.
 */
export function revealDoors(players) {
	for (const [key, player] of Object.entries(players)) {
		const door = document.getElementById('door' + key)
		if (!door) return

		displayRemoveItem('door', key)
		for (const tile of player.door) {
			const img = createTile(tile, '')
			door.appendChild(img)
		}
	}
}
