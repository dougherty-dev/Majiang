#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/triple-meld
 */

import { KEZI, SHUNZI } from './patterns.js'
import { SHUNZIX2, SHIFTEDX2 } from './patterns.js'
import { checkDoubleMeld } from './double-meld.js'

export function checkTripleMeld(length, type, triple, straight, straightx3, shiftedStraightax3, shiftedStraightbx3, struct) {
	let rest
	if (triple && triple.length === 3) {
		console.log(length + ': triple triple', triple)
		struct.melds += 3
		return true
	}

	if ((straightx3 || shiftedStraightax3 || shiftedStraightbx3) || (straight && straight.length === 3)) {
		console.log(length + ': triple shifted straight', straight, straightx3, shiftedStraightax3, shiftedStraightbx3)
		struct.melds += 3
		return true
	}

	if (triple && triple.length === 2) {
		rest = type.replace(triple[0], '')
		rest = rest.replace(triple[1], '')
		if (rest.match(SHUNZI)) {
			console.log(length + ': 2 triples & 1 straight', triple, straight)
			struct.melds += 3
			return true
		}
	}

	if (triple && triple.length === 1) {
		rest = type.replace(triple[0], '')
		if (rest.match(SHUNZIX2) || rest.match(SHIFTEDX2)) {
			console.log(length + ': 1 triple & 2 straights', triple, straight)
			struct.melds += 3
			return true
		}
	}

	if (straight && straight.length === 1) {
		console.log('here', straight)
		for (const set of straight) {
			rest = type.replace(set, '')
			if (checkDoubleMeld(9, rest, rest.match(KEZI), rest.match(SHUNZI), rest.match(SHUNZIX2), rest.match(SHIFTEDX2), struct)) {
				struct.melds += 1
				return true
			}
		}
	}

	console.log(length + ': no triple meld', straight, straightx3, shiftedStraightax3, shiftedStraightbx3)
	return false
}
