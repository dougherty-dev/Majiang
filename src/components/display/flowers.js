#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/flowers
 * @description Display functions pertaining to flower tiles.
 * @property {function} displayFlowers Display all flower tiles for each player.
 * @property {function} displayFlower Display a single added flower.
 */

import { createTile } from '../tiles.js'
import { delay, sound } from '../helpers.js'
import { displayRemoveItem } from './display.js'

/**
 * Display all flower tiles for each player at the beginning of the game.
 * @param {object} players The players structure.
 */
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

/**
 * Display a single added flower.
 * @param {number} key Player number.
 * @param {object} tile The tile.
 * @param {boolean} interactive Whether to animate (not in the initial setup)
 * @returns 
 */
export async function  displayFlower(key, tile, interactive = true) {
	const flowers = document.getElementById('flowers' + key)
	if (!flowers) return

	const img = createTile(tile)
	flowers.appendChild(img)
	img.classList.add('flower')

	if (interactive) {
		await delay(500)
		sound('snd/buhua.m4a')
		await delay(1000)
	}
}
