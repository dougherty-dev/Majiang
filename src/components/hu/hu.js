#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/hu
 */

import { TYPES } from './patterns.js'
import { checkType } from './check-type.js'
import { checkSpecial } from './specials.js'
import Hu from '../../models/hu.js'

/**
 * @description Check validity of _remaining_ tiles at hand for possible hu.
 * Melds are valid by default. Special hands do not have melds.
 * The exact nature of the hu will be decided later, for now just confirm a winning pattern.
 * @param {Object} player Potential winner.
 * @param {Object} door Remaining tiles at hand.
 * @returns Boolean
 */
export async function checkHu(player, door) {
	player.hu = new Hu().hu
	player.hu.melds = player.melds.length

	// Collect melds.
	for (const meld of player.melds) {
		const set = [meld.meld[0][7], meld.meld.map(item => item[1]).join('')]

		switch (meld.type) {
		case 'peng':
			player.hu.kezi.push(set)
			break
		case 'gang':
		case 'angang':
			player.hu.gangzi.push(set)
			break
		case 'chi':
			player.hu.shunzi.push(set)
			break
		}
	}

	player.hu.types = Object.assign({}, TYPES)

	for (const tile of door) {
		player.hu.types[tile[7]] += tile[1]
	}

	// Regular hands.
	const types = Object.entries(player.hu.types).filter(item => item[1] !== '')
	for await (const [key, type] of types) {
		if (
			[1, 4, 7, 10, 13].includes(type.length) ||
			!await checkType(key, type, 'lookup' + type.length, player)
		) break
	}

	if (player.hu.pairs === 1 && player.hu.melds === 4) return true

	// Special hands.
	if (await checkSpecial(player, door)) return true

	return false
}
