#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module flowers
 */

import { createTile } from '../tiles.js'
import { delay, sound } from '../helpers.js'
import { displayRemoveItem } from './display.js'

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
