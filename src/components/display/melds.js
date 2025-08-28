#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/melds
 * @description Display functions pertaining to melded tiles.
 * @property {function} displayMelds Display all melds for all players.
 * @property {function} displayMeld Display melds (chi, peng, gang, angang) for player.
 * @property {function} revealMelds Reveal all melds at end of hand.
 */

import { createElement } from '../elements.js'
import { createTile } from '../tiles.js'
import { displayRemoveItem } from './display.js'
import { HUMANPLAYER } from '../../models/constants.js'

/**
 * Display all melds for all players.
 * @param {object} players The players structure.
 */
export function displayMelds(players) {
	for (const [key, player] of Object.entries(players)) {
		displayMeld(key, player)
	}
}

/**
 * Display melds (chi, peng, gang, angang) for player.
 * @param {number} key Player number.
 * @param {object} player The player structure.
 * @param {boolean} reveal Whether to reveal tiles.
 */
export async function displayMeld(key, player, reveal = false) {
	const melds = document.getElementById('melds' + key)
	if (!melds) return

	displayRemoveItem('melds', key)
	for (const meld of player.melds) {
		const span = createElement('span', ['meld-divider'])
		const div = createElement('div', ['melds', 'tile'])

		let ext
		let hidden = false
		let skip
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
				if (reveal) {
					hidden = (index == 1 || index == 2)
				} else {
					hidden = key != HUMANPLAYER || (key == HUMANPLAYER && (index == 1 || index == 2) )
				}
				break
			}

			// skip one inner tile
			skip = (meld.key == 2 && index == 1) || (meld.key != 2 && index == 2)
			if (!(meld.type === 'gang' && skip)) {
				const img = createTile(tile, ext, hidden)
				div.appendChild(img)
			}
		}

		melds.prepend(div, span)
	}
}

/**
 * Reveal all melds at end of hand.
 * @param {object} players The players structure.
 */
export function revealMelds(players) {
	for (const [key, player] of Object.entries(players)) {
		displayMeld(key, player, true)
	}
}
