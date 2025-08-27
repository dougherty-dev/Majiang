#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/door
 * @description Display functions pertaining to the players’ doors (hands).
 * @property {Function} displayDoors Display all players’ doors.
 * @property {Function} displayDoor Display an individual player’s door.
 * @property {Function} displayAddToDoor Display a fresh tile taken from the wall.
 * @property {Function} revealDoors Reveal all tiles at the end of a played hand.
 */

import { createTile } from '../tiles.js'
import { displayRemoveItem } from './display.js'

/**
 * Display all players’ doors.
 * @param {Object} players The players structure.
 */
export function displayDoors(players) {
	for (const [key, player] of Object.entries(players)) {
		displayDoor(key, player)
	}
}

/**
 * Display an individual player’s door.
 * @param {number} key Player number.
 * @param {Object} player The player structure.
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
 * @param {Object} tile The tile.
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
 * @param {Object} players The players structure.
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
