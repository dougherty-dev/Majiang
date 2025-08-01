#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/pair
 */

export function checkPair(length, pair, struct) {
	console.log(length + ': ', pair , (pair))
	if (!pair) {
		console.log(length + ': not pair')
		return false
	}
	struct.pairs++
	return true
}
