#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/check-type
 * @description Match hand combinations against lookup tables.
 * @property {Function} checkType Find winning set of melds.
 * @property {Function} tingpai Determine if waiting for a single possible tile.
 * @property {Function} checkPattern Match set against lookup pattern.
 */

import { KEZI, SHUNZI } from './patterns.js'
import { ZI } from '../../models/tiles.js'
import { lookup2 } from '../lookup/lookup2.js'
import { lookup3 } from '../lookup/lookup3.js'
import { lookup5 } from '../lookup/lookup5.js'
import { lookup6 } from '../lookup/lookup6.js'
import { lookup8 } from '../lookup/lookup8.js'
import { lookup9 } from '../lookup/lookup9.js'
import { lookup11 } from '../lookup/lookup11.js'
import { lookup12 } from '../lookup/lookup12.js'
import { lookup14 } from '../lookup/lookup14.js'

const lookup = {
	lookup2: lookup2,
	lookup3: lookup3,
	lookup5: lookup5,
	lookup6: lookup6,
	lookup8: lookup8,
	lookup9: lookup9,
	lookup11: lookup11,
	lookup12: lookup12,
	lookup14: lookup14
}

/**
 * Find winning set of melds.
 * @param {number} key Player index.
 * @param {string} type Principal numerical representation of a tile type.
 * @param {string} lookupKey Lookup table name.
 * @param {Object} player The player object.
 * @returns {Promise<boolean>}
 */
export async function checkType(key, type, lookupKey, player) {
	if (!(type in lookup[lookupKey])) return false

	const meldsets = lookup[lookupKey][type]

	// Traverse all possible duplicates, find max number of melds.
	let maxHuMelds = -1
	let maxMelds = meldsets[0]

	// DRY
	if (meldsets.length > 1) {
		for (const melds of meldsets) {
			let huPairs = player.hu.pairs
			let huMelds = player.hu.melds

			for (const meld of melds) {
				switch (meld.length) {
				case 2:
					huPairs++
					break
				case 3:
					if (
						(!ZI.includes(key) && meld.match(SHUNZI)) ||
						meld.match(KEZI)
					) huMelds++
					break
				}
			}

			if (huPairs <= 1 && huMelds > maxHuMelds) {
				maxHuMelds = huMelds
				maxMelds = melds
			}
		}
	}

	// Accept solution.
	for (const meld of maxMelds) {
		switch (meld.length) {
		case 2:
			player.hu.duizi.push([key, meld])
			player.hu.pairs++
			break
		case 3:
			if (!ZI.includes(key) && meld.match(SHUNZI)) {
				player.hu.shunzi.push([key, meld])
				player.hu.melds++
			} else if (meld.match(KEZI)) {
				player.hu.kezi.push([key, meld])
				player.hu.melds++
			}

			break
		}
	}

	return true
}

/**
 * Determine if waiting for a single possible tile.
 * @param {number} seq Type sequence.
 * @returns {Promise<boolean>}
 */
export async function tingpai(seq) {
	const index = `lookup${seq.length + 1}`
	let count = 0
	let type
	let str

	for (const val of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
		type = Object.assign([], seq)
		type.push(val)
		str = type.sort().join('')

		if (lookup[index] && lookup[index][str]) count++
	}

	return (count === 1)
}

/**
 * Match set against lookup pattern.
 * @param {Object} type 
 * @returns {Promise<boolean>}
 */
export async function checkPattern(type) {
	if ([2, 3, 5, 6, 8, 9, 11, 12, 14].includes(type.length)) {
		if (!(type in lookup[`lookup${type.length}`])) {
			return false
		}
	} else if (type.length) {
		return false // Irregular length.
	}

	return true
}
