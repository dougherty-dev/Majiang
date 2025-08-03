#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/meld
 */

import { SUITED } from './patterns.js'

export function checkMeld(type, triple, straight, struct) {
	if (triple || (straight && !SUITED.includes(type))) {
		struct.melds++
		return true
	}

	return false
}
