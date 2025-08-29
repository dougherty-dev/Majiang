#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/hu
 * @description Check validity of tiles at hand for possible hu.
 * @property {function} checkHu Check if any player forms a winning pattern.
 */

import { TYPES } from './patterns.js'
import { checkType } from './check-type.js'
import { checkSpecial } from './specials.js'

/**
 * Reset vars for player.
 * @param {object} player The player structure.
 */
export async function resetPlayerVars(player) {
	player.noMelds = player.melds.length
	player.noPairs = 0

	player.qidui = false
	player.shisanyao = false
	player.knitted = false
	player.lesserHonors = false
	player.greaterHonors = false
	player.knittedStraight = false
	player.dianhu = false
	player.zimo = false
	player.qianggang = false
}

/**
 * Check validity of _remaining_ tiles at hand for possible hu.
 * Melds are valid by default. Special hands do not have melds.
 * The exact nature of the hu will be decided later, for now just confirm a winning pattern.
 * @param {object} player Potential winner.
 * @param {object} door Remaining tiles at hand.
 * @returns {promise<boolean>}
 */
export async function checkHu(player, door) {
	await resetPlayerVars(player)

	player.types = Object.assign({}, TYPES)
	for (const tile of door) {
		player.types[tile[7]] += tile[1]
	}

	// Regular hands.
	const types = Object.entries(player.types).filter(item => item[1])
	for await (const [key, type] of types) {
		if (
			[1, 4, 7, 10, 13].includes(type.length) ||
			!await checkType(key, type, 'lookup' + type.length, player)
		) break
	}

	if (player.noPairs === 1 && player.noMelds === 4) return true

	// Special hands.
	return checkSpecial(player)
}
