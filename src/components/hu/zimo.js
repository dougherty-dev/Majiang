#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/zimo
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
import { sortTiles } from '../helpers.js'

export async function checkZimo(game) {
	// if (game.currentPlayer !== 4) return

	console.log('--------------- START -----------------')

	const door = Object.assign([], game.players[game.currentPlayer].door)
	sortTiles(door)

	let struct = {
		pairs: 0,
		melds: game.players[game.currentPlayer].melds.length
	}

	const types = { b: '', t: '', w: '', f: '', j: ''}

	for (const tile of door) {
		types[tile[7]] += tile[1]
	}


	console.log(types)
	for (const [key, type] of Object.entries(types)) {
		console.log('------- ', key, ': ------')
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

		if (type.length >= 2) {
			console.log('pair: ', pair, type)
		}

		if (type.length >= 3) {
			console.log('triple: ', triple, type)
			console.log('straight: ', straight, type)
		}

		if (type.length >= 6) {
			console.log('straightx2: ', straightx2, type)
			console.log('straightx3: ', straightx3, type)
			console.log('straightx4: ', straightx4, type)
			console.log('shiftedStraightx2: ', shiftedStraightx2, type)
		}

		if (type.length >= 9) {
			console.log('shiftedStraightax3: ', shiftedStraightax3, type)
			console.log('shiftedStraightbx3: ', shiftedStraightbx3, type)
		}

		if (type.length >= 12) {
			console.log('shiftedStraightax4: ', shiftedStraightax4, type)
			console.log('shiftedStraightbx4: ', shiftedStraightbx4, type)
			console.log('shiftedStraightcx4: ', shiftedStraightcx4, type)
		}

		let pairs = 0
		if (pair) {
			pairs = pair.length
			console.log('Pairs: ', pairs)
			if (pairs === 7) return true // qi DUIZI
		}

		let rest
		let found
		switch (true) {
		case type.length === 0:
			break
		case [1, 4, 7, 10, 13].includes(type.length):
			console.log('1, 4, 7, 10, 13: wrong length')
			// check special hands first, though
			return
		case type.length === 2:
			if (!checkPair(2, pair, struct)) return false
			break
		case type.length === 3:
			if (!checkMeld(3, triple, straight, struct)) return false
			break
		case type.length === 5:
			if (!checkPair(5, pair, struct)) return false

			rest = type.replace(pair[0], '')
			console.log('5: pair', pair[0], rest)

			if (!checkMeld(5, rest.match(KEZI), rest.match(SHUNZI), struct)) return false
			break
		case type.length === 6:
			if (!checkDoubleMeld(6, type, triple, straight, straightx2, shiftedStraightx2, struct)) return false
			break
		case type.length === 8:
			if (!pair) return false

			found = false
			for (const set of pair) {
				rest = type.replace(set, '')
				console.log('8: pair', set, rest)
				if (checkDoubleMeld(8, type, rest.match(KEZI), rest.match(SHUNZI), rest.match(SHUNZIX2), rest.match(SHIFTEDX2), struct)) {
					found = true
					struct.pairs++
					break
				}
			}

			if (!found) return false
			break
		case type.length === 9:
			if (!checkTripleMeld(9, type, triple, straight, straightx3, shiftedStraightax3, shiftedStraightbx3, struct)) return false
			break
		case type.length === 11:
			if (!pair) return false

			found = false
			for (const set of pair) {
				rest = type.replace(set, '')
				console.log('11: pair', set, rest)

				if (!checkTripleMeld(11, rest, rest.match(KEZI), rest.match(SHUNZI), rest.match(SHUNZIX3), rest.match(SHIFTEDAX3), rest.match(SHIFTEDBX3), struct)) {
					found = true
					struct.pairs++
					break
				}
			}

			if (!found) return false
			break
		case type.length === 12:
			if (!checkQuadrupelMeld(12, type, triple, straight, straightx4, shiftedStraightax4, shiftedStraightbx4, shiftedStraightcx4, struct)) return false
			break
		default:
			break
		}
	}

	console.log('struct: ', struct)
	if (struct.pairs === 1 && struct.melds === 4) {
		console.log('hule!', door)
		return true
	}

	return false
}
