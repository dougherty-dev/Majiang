#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/double-meld
 */

import { SHUNZI } from './patterns.js'

export function checkDoubleMeld(key, type, triple, straight,
	straightx2, shiftedStraightx2, struct) {
	let rest

	// two kezi
	if (triple && triple.length === 2) {
		// consider 111133 => 111 and 111, false
		if (triple[0] !== triple[1]) {
			struct.melds += 2

			struct.kezi.push([key, triple[0]])
			struct.kezi.push([key, triple[1]])

			return true
		}
	}

	// two straights
	if (straight && straight.length === 2) {
		// consider the case 123468 => 123 and 234, false
		rest = type.replace(straight[0], '')
		if (rest === straight[1]) {
			struct.melds += 2

			struct.shunzi.push([key, straight[0]])
			struct.shunzi.push([key, straight[1]])

			return true
		}
	}

	// two identical straights
	if (straightx2) {
		struct.melds += 2

		const set = straightx2[0]
		struct.shunzi.push([key, set[0] + set[2] + set[4]])
		struct.shunzi.push([key, set[0] + set[2] + set[4]])

		return true
	}

	// shifted straight
	if (shiftedStraightx2) {
		struct.melds += 2

		const set = straightx2[0]
		struct.shunzi.push([key, set[0] + set[2] + set[4]])
		struct.shunzi.push([key, set[1] + set[3] + set[5]])

		return true
	}

	// just one triple
	if (triple) {
		// consider the case 144456 => (444, 456), false
		rest = type.replace(triple[0], '')
		// break out kezi, then check remainder for shunzi
		if (rest.match(SHUNZI)) {
			struct.melds += 2

			struct.kezi.push([key, triple[0]])
			struct.shunzi.push([key, rest[0]])

			return true
		}
	}

	return false
}
