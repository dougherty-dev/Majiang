#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/quadruple-meld
 */

export function checkQuadrupelMeld(triple, straight, straightx4, shiftedStraightax4, shiftedStraightbx4, shiftedStraightcx4, struct) {
	if (triple && triple.length === 4) {
		struct.melds += 4
		return true
	}

	if ((straightx4 || shiftedStraightax4 || shiftedStraightbx4 || shiftedStraightcx4) || (straight && straight.length === 4)) {
		struct.melds += 4
		return true
	}

	return false
}
