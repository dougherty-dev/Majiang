#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/hu
 */

import { DUIZI, KEZI, SHUNZI } from './patterns.js'
import { SHUNZIX2, SHIFTEDX2 } from './patterns.js'
import { SHUNZIX3, SHIFTEDAX3, SHIFTEDBX3 } from './patterns.js'
import { SHUNZIX4, SHIFTEDAX4, SHIFTEDBX4, SHIFTEDCX4 } from './patterns.js'
import { checkPair } from './pair.js'
import { checkMeld } from './meld.js'
import { checkDoubleMeld } from './double-meld.js'
import { checkTripleMeld } from './triple-meld.js'
import { checkQuadrupelMeld } from './quadruple-meld.js'
import Hu from '../../models/hu.js'

export async function checkHu(player, door) {
	player.hu = new Hu().hu
	player.hu.melds = player.melds.length

	const types = { b: '', t: '', w: '', f: '', j: ''}

	for (const tile of door) {
		types[tile[7]] += tile[1]
	}

	for (const type of Object.values(types)) {
		const pair = type.match(DUIZI) // 2

		const triple = type.match(KEZI) // 3
		const straight = type.match(SHUNZI)

		const straightx2 = type.match(SHUNZIX2) // 6
		const shiftedStraightx2 = type.match(SHIFTEDX2)

		const straightx3 = type.match(SHUNZIX3) // 9
		const shiftedStraightax3 = type.match(SHIFTEDAX3)
		const shiftedStraightbx3 = type.match(SHIFTEDBX3)

		const straightx4 = type.match(SHUNZIX4) // 12
		const shiftedStraightax4 = type.match(SHIFTEDAX4)
		const shiftedStraightbx4 = type.match(SHIFTEDBX4)
		const shiftedStraightcx4 = type.match(SHIFTEDCX4)

		if (pair) {
			if (pair.length === 7) return true // qi duizi
		}

		let rest
		let found
		switch (true) {
		case type.length === 0:
			break
		case [1, 4, 7, 10, 13].includes(type.length):
			// check special hands first, though
			return
		case type.length === 2:
			if (!checkPair(pair, player.hu)) return false
			break
		case type.length === 3:
			if (!checkMeld(3, triple, straight, player.hu)) return false
			break
		case type.length === 5:
			if (!checkPair(pair, player.hu)) return false

			found = false
			for (const set of pair) {
				rest = type.replace(set, '')
				if (checkMeld(5, rest.match(KEZI), rest.match(SHUNZI), player.hu)) {
					found = true
					break
				}
			}

			if (!found) return false
			break
		case type.length === 6:
			if (!checkDoubleMeld(6, type, triple, straight, straightx2, shiftedStraightx2, player.hu)) return false
			break
		case type.length === 8:
			if (!pair) return false

			found = false
			for (const set of pair) {
				rest = type.replace(set, '')
				if (checkDoubleMeld(8, type, rest.match(KEZI), rest.match(SHUNZI), rest.match(SHUNZIX2), rest.match(SHIFTEDX2), player.hu)) {
					found = true
					player.hu.pairs++
					break
				}
			}

			if (!found) return false
			break
		case type.length === 9:
			if (!checkTripleMeld(9, type, triple, straight, straightx3, shiftedStraightax3, shiftedStraightbx3, player.hu)) return false
			break
		case type.length === 11:
			if (!pair) return false

			found = false
			for (const set of pair) {
				rest = type.replace(set, '')

				if (!checkTripleMeld(11, rest, rest.match(KEZI), rest.match(SHUNZI), rest.match(SHUNZIX3), rest.match(SHIFTEDAX3), rest.match(SHIFTEDBX3), player.hu)) {
					found = true
					player.hu.pairs++
					break
				}
			}

			if (!found) return false
			break
		case type.length === 12:
			if (!checkQuadrupelMeld(12, triple, straight, straightx4, shiftedStraightax4, shiftedStraightbx4, shiftedStraightcx4, player.hu)) return false
			break
		default:
			break
		}
	}

	if (player.hu.pairs === 1 && player.hu.melds === 4) {
		return true
	}

	return false
}
