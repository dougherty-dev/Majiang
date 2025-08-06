#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/door
 */

import { createTile } from '../../components/tiles.js'
import { displayRemoveItem } from './display.js'

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
		const img = createTile(tile, '', key != 4)
		door.appendChild(img)
	}
}

export function displayAddToDoor(key, tile) {
	const door = document.getElementById('door' + key)
	if (!door) return

	const img = createTile(tile, '', key != 4)
	img.classList.add('new-tile', 'tile-divider')
	door.appendChild(img)
}

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
