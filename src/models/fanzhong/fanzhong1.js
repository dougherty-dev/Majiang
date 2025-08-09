#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong1
 */

import { ZI } from '../tiles.js'

const FZ1 = 1

// 69. Pure double shunzi (Yiban gao, 一般高)
export async function fz69YibanGao(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	let hit = []
	for (const type of shunzi) {
		if (hit.includes(type)) return FZ1
		hit.push(type)
	}

	return 0
}

// 70. Mixed double shunzi (Xi xiangfeng, 喜相逢)
export async function fz70XiXiangfeng(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	let hit = []
	for (const type of shunzi) {
		if (hit.length && hit[0][1] === type[1] && hit[0][0] !== type[0]) return FZ1
		hit.push(type)
	}

	return 0
}

// 74. Melded gang (Minggang, 明杠)
export async function fz74Minggang(struct) {
	for (const meld of struct.game.players[struct.key].melds) {
		if (meld.type == 'gang') return FZ1
	}

	return 0
}

// 76. No honors (Wu zi, 无字)
export async function fz76WuZi(struct) {
	return struct.door.some(arr => ZI.includes(arr[7])) ? 0 : FZ1
}

// 80. Self-drawn (Zimo, 自摸)
export async function fz80Zimo(struct) {
	return (struct.game.players[struct.key].hu.zimo) ? FZ1 : 0
}

// 81. Flower tiles (Huapai, 花牌)
export async function fz81Huapai(struct) {
	return struct.game.players[struct.key].flowers.length
}
