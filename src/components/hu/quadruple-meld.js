#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/quadruple-meld
 */

import { KEZI, SHUNZI } from './patterns.js'
import { SHUNZIX2, SHIFTEDX2 } from './patterns.js'
import { SHUNZIX3, SHIFTEDAX3, SHIFTEDBX3 } from './patterns.js'
import { checkTripleMeld } from './triple-meld.js'

export function checkQuadrupelMeld(
	type,
	triple,
	straight,
	straightx4,
	shiftedStraightax4,
	shiftedStraightbx4,
	shiftedStraightcx4,
	struct
) {
	let rest

	// three kezi
	if (triple && triple.length === 4) {
		struct.melds += 4
		return true
	}

	// four shifted straight or four straights
	if (
		(straightx4 ||shiftedStraightax4 || shiftedStraightbx4 || shiftedStraightcx4) ||
		(straight && straight.length === 4)
	) {
		struct.melds += 4
		return true
	}

	// three kezi, one shunzi
	if (triple && triple.length === 3) {
		rest = type.replace(triple[0], '')
		rest = rest.replace(triple[1], '')
		rest = rest.replace(triple[2], '')
		if (rest.match(SHUNZI)) {
			struct.melds += 4
			return true
		}
	}

	if (triple && triple.length === 2) {
		rest = type.replace(triple[0], '')
		rest = rest.replace(triple[1], '')
		// two kezi, two shifted straights
		if (rest.match(SHUNZIX2) || rest.match(SHIFTEDX2)) {
			struct.melds += 4
			return true
		}

		// two kezi, two shunzi
		if (straight && straight.length === 2) {
			struct.melds += 4
			return true
		}
	}

	if (triple && triple.length === 1) {
		rest = type.replace(triple[0], '')
		// one kezi, three shifted straights
		if (rest.match(SHUNZIX3) || rest.match(SHIFTEDAX3) || rest.match(SHIFTEDBX3)) {
			struct.melds += 4
			return true
		}

		// one kezi, three shunzi
		if (straight && straight.length === 3) {
			struct.melds += 4
			return true
		}
	}

	// one shunzi, three shifted straights
	if (straight && straight.length === 1) {
		for (const set of straight) {
			rest = type.replace(set, '')
			if (checkTripleMeld(
				rest,
				rest.match(KEZI),
				rest.match(SHUNZI),
				rest.match(SHUNZIX3),
				rest.match(SHIFTEDAX3),
				rest.match(SHIFTEDBX3),
				struct)
			) {
				struct.melds += 1
				return true
			}
		}
	}

	return false
}
