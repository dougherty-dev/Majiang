#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong1
 */

export async function fz80zimo(struct) {
	return (struct.key === struct.game.currentPlayer) ? 1 : 0
}

export async function fz81huapai(struct) {
	return struct.game.players[struct.key].flowers.length
}

export async function fz76wuzi(struct) {
	return struct.door.some(arr => ['f', 'j'].includes(arr[7])) ? 0 : 1
}
