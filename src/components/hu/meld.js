#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/meld
 */

export function checkMeld(triple, straight, struct) {
	if (!triple && !straight) {
		return false
	}

	struct.melds++
	return true
}
