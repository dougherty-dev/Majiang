#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/double-meld
 */

import { SHUNZI } from './patterns.js'

export function checkDoubleMeld(length, type, triple, straight, straightx2, shiftedStraightx2, struct) {
	let rest
	if (triple && triple.length === 2) {
		console.log(length + ': double triple', triple)
		struct.melds += 2
		return true
	}

	if ((straightx2 || shiftedStraightx2) || (straight && straight.length === 2)) {
		console.log(length + ': double straight', straight, straightx2, shiftedStraightx2)
		struct.melds += 2
		return true
	}

	if (triple) {
		// consider the case 144456 => (444, 456), false
		rest = type.replace(triple[0], '')
		// break out KEZI, then check remainder for SHUNZI
		if (rest.match(SHUNZI)) {
			console.log(length + ': triple & straight', triple, straight)
			struct.melds += 2
			return true
		}
	}

	console.log(length + ': no double triple', triple, straight, straightx2, shiftedStraightx2)
	return false
}
