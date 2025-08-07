#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/pair
 */

export function checkPair(key, pair, struct) {
	if (!pair) return false

	struct.pairs++
	struct.duizi.push([key, pair[0]])
	return true
}
