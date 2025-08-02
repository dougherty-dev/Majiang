#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/pair
 */

export function checkPair(pair, struct) {
	if (!pair) return false

	struct.pairs++
	return true
}
