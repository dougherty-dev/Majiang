#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong1
 */

export async function fz69YibanGao(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	let hit = []
	for (const type of shunzi) {
		if (hit.includes(type)) return 1
		hit.push(type)
	}

	return 0
}

export async function fz70XiXiangfeng(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	let hit = []
	for (const type of shunzi) {
		if (hit.includes(type[1])) return 1
		hit.push(type[1])
	}

	return 0
}

export async function fz80Zimo(struct) {
	return (struct.game.players[struct.key].hu.zimo) ? 1 : 0
}

export async function fz81Huapai(struct) {
	return struct.game.players[struct.key].flowers.length
}

export async function fz76WuZi(struct) {
	return struct.door.some(arr => ['f', 'j'].includes(arr[7])) ? 0 : 1
}
