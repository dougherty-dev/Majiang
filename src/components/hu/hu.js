#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/hu
 */

import { TYPES } from './patterns.js'
import { lookup2 } from './lookup2.js'
import { lookup3 } from './lookup3.js'
import { lookup5 } from './lookup5.js'
import { lookup6 } from './lookup6.js'
import { lookup8 } from './lookup8.js'
import { lookup9 } from './lookup9.js'
import { lookup11 } from './lookup11.js'
import { lookup12 } from './lookup12.js'
import { lookup14 } from './lookup14.js'
import { checkType } from './check-type.js'
import { checkSpecial } from './specials.js'

import Hu from '../../models/hu.js'

const lookup = {
	lookup2: lookup2,
	lookup3: lookup3,
	lookup5: lookup5,
	lookup6: lookup6,
	lookup8: lookup8,
	lookup9: lookup9,
	lookup11: lookup11,
	lookup12: lookup12,
	lookup14: lookup14,
}

/**
 * @description Check validity of _remaining_ tiles at hand for possible hu.
 * Also check special hands without melds (all tiles at hand).
 * Melds are implictly already approved.
 * Then build combined meld structure for score calculation.
 * 
 * @param {Object} player Potential winner.
 * @param {Object} door Remaining tiles at hand.
 * @returns Boolean
 */
export async function checkHu(player, door) {
	player.hu = new Hu().hu
	player.hu.melds = player.melds.length

	// Collect melds
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

	// regular hands
	const types = Object.entries(player.hu.types).filter(item => item[1] !== '')
	for (const [key, type] of types) {
		if (
			[1, 4, 7, 10, 13].includes(type.length) ||
			!checkType(key, type, lookup['lookup' + type.length], player)
		) break
	}

	if (player.hu.pairs === 1 && player.hu.melds === 4) return true

	// special hands
	if (await checkSpecial(player, door)) return true

	return false
}
