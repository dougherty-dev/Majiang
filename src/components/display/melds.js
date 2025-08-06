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

export async function displayMeld(key, player, reveal = false) {
	const melds = document.getElementById('melds' + key)
	if (!melds) return

	displayRemoveItem('melds', key)
	for (const meld of player.melds) {
		const span = createElement('span', ['meld-divider'])
		const div = createElement('div', ['melds', 'tile'])

		let ext
		let hidden = false
		for (const [index, tile] of Object.entries(meld.meld)) {
			switch (meld.type) {
			case 'chi':
			case 'peng':
				ext = (index == meld.key) ? '-o' : ''
				break
			case 'gang':
				ext = (index == meld.key) ? '-d' : ''
				break
			case 'angang':
				ext = ''
				if (!reveal) {
					hidden = key != 4 || (key == 4 && (index == 1 || index == 2) )
				}
				break
			}

			const img = createTile(tile, ext, hidden)
			div.appendChild(img)
		}

		melds.prepend(div, span)
	}
}

export function revealMelds(players) {
	for (const [key, player] of Object.entries(players)) {
		displayMeld(key, player, true)
	}
}
