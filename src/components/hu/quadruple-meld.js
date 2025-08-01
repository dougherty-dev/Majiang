#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/quadruple-meld
 */

export function checkQuadrupelMeld(length, type, triple, straight, straightx4, shiftedStraightax4, shiftedStraightbx4, shiftedStraightcx4, struct) {
	if (triple && triple.length === 4) {
		console.log(length + ': quadrupel triple', triple)
		struct.melds += 4
		return true
	}

	if ((straightx4 || shiftedStraightax4 || shiftedStraightbx4 || shiftedStraightcx4) || (straight && straight.length === 4)) {
		console.log(length + ': quadruple straight', straight, straightx4, shiftedStraightax4, shiftedStraightbx4, shiftedStraightcx4)
		struct.melds += 4
		return true
	}

	console.log(length + ': no quadruple meld', straight, straightx4, shiftedStraightax4, shiftedStraightbx4, shiftedStraightcx4)
	return false
}
