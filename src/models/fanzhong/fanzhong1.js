#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong1
 */

import { SHUNZIX2 } from '../../components/hu/patterns.js'

export async function fz80zimo(struct) {
	return (struct.key === struct.game.currentPlayer) ? 1 : 0
}

export async function fz81huapai(struct) {
	return struct.game.players[struct.key].flowers.length
}

export async function fz76wuzi(struct) {
	return struct.door.some(arr => ['f', 'j'].includes(arr[7])) ? 0 : 1
}

export async function fz69wuzi(struct) {
	for (const type of Object.values(struct.types)) {
		if (type.match(SHUNZIX2)) return 1
	}

	return 0
}
