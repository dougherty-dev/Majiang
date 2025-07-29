#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/melds
 */

import { createElement } from '../elements.js'
import { createTile } from '../../components/tiles.js'
import { displayRemoveItem } from './display.js'

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
