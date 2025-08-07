#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/triple-meld
 */

import { KEZI, SHUNZI } from './patterns.js'
import { SHUNZIX2, SHIFTEDX2 } from './patterns.js'
import { checkDoubleMeld } from './double-meld.js'

export function checkTripleMeld(key, type, triple, straight, straightx3,
	shiftedStraightax3, shiftedStraightbx3, struct) {
	let rest

	// three kezi
	if (triple && triple.length === 3) {
		if (
			triple[0].match(KEZI) &&
			triple[1].match(KEZI) &&
			triple[2].match(KEZI)
		) {
			struct.melds += 3

			struct.kezi.push([key, triple[0]])
			struct.kezi.push([key, triple[1]])
			struct.kezi.push([key, triple[2]])

			return true
		}
	}

	// three straights
	if (straight && straight.length === 3) {
		// consider the case 123458 => 123, 234 and 345, false
		if (
			straight[0].match(SHUNZI) &&
			straight[1].match(SHUNZI) &&
			straight[2].match(SHUNZI)
		) {
			struct.melds += 3

			struct.shunzi.push([key, straight[0]])
			struct.shunzi.push([key, straight[1]])
			struct.shunzi.push([key, straight[2]])

			return true
		}
	}

	// three shifted straight or three straights
	if (
		(straightx3 || shiftedStraightax3 || shiftedStraightbx3) ||
		(straight && straight.length === 3)
	) {
		struct.melds += 3
		return true
	}

	// two kezi, one shunzi
	if (triple && triple.length === 2) {
		rest = type.replace(triple[0], '')
		rest = rest.replace(triple[1], '')
		if (rest.match(SHUNZI)) {
			struct.melds += 3

			struct.kezi.push([key, triple[0]])
			struct.kezi.push([key, triple[1]])
			struct.shunzi.push([key, rest[0]])

			return true
		}
	}

	if (triple && triple.length === 1) {
		rest = type.replace(triple[0], '')
		// one kezi, two shifted straights
		if (rest.match(SHUNZIX2) || rest.match(SHIFTEDX2)) {
			struct.melds += 3
			return true
		}

		// one kezi, two shunzi
		if (straight && straight.length === 2) {
			struct.melds += 3
			return true
		}
	}

	// one shunzi, two shifted straights
	if (straight && straight.length === 1) {
		for (const set of straight) {
			rest = type.replace(set, '')
			if (checkDoubleMeld(key, rest, rest.match(KEZI), rest.match(SHUNZI),
				rest.match(SHUNZIX2), rest.match(SHIFTEDX2), struct)) {
				struct.melds += 1
				return true
			}
		}
	}

	return false
}
