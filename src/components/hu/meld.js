#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/meld
 */

export function checkMeld(length, triple, straight, struct) {
	if (!triple && !straight) {
		return false
	}

	struct.melds++
	return true
}
