#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/double-meld
 */

import { SHUNZI } from './patterns.js'

export function checkDoubleMeld(
	type,
	triple,
	straight,
	straightx2,
	shiftedStraightx2,
	struct
) {
	let rest

	// two kezi
	if (triple && triple.length === 2) {
		struct.melds += 2
		return true
	}

	// shifted straight or two straights
	if (
		(straightx2 || shiftedStraightx2) ||
		(straight && straight.length === 2)
	) {
		struct.melds += 2
		return true
	}

	// just one triple
	if (triple) {
		// consider the case 144456 => (444, 456), false
		rest = type.replace(triple[0], '')
		// break out kezi, then check remainder for shunzi
		if (rest.match(SHUNZI)) {
			struct.melds += 2
			return true
		}
	}

	return false
}
