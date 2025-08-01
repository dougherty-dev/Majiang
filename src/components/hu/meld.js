#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/meld
 */

export function checkMeld(length, triple, straight, struct) {
	if (!triple && !straight) {
		console.log(length + ': not triple, not straight', triple, straight)
		return false
	}

	if (triple) console.log(length + ': triple', triple[0])
	else if (straight) console.log(length + ': straight', straight[0])
	struct.melds++
	return true
}
