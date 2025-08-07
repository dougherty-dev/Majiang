#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/meld
 */

export function checkMeld(key, triple, straight, struct) {
	if (!triple && !straight) {
		return false
	}

	struct.melds++

	if (triple) {
		struct.kezi.push([key, triple[0]])
	} else if (straight) {
		struct.shunzi.push([key, straight[0]])
	}

	return true
}
