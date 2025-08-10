#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong2
 */

import { fz76WuZi } from './fanzhong1.js'

const FZ2 = 2

// 63. All shunzi (Pinghu, 平和)
export async function fz63Pinghu(struct) {
	if (struct.game.players[struct.key].hu.shunzi.length === 4) {
		return FZ2
	}

	return 0
}

// 68. All simples (Duanyao, 断幺)
export async function fz68Duanyao(struct) {
	if (!fz76WuZi(struct)) return 0

	const melds = Object.assign([], [
		...struct.game.players[struct.key].hu.duizi,
		...struct.game.players[struct.key].hu.shunzi,
		...struct.game.players[struct.key].hu.kezi,
		...struct.game.players[struct.key].hu.gangzi
	])

	const suit = melds.map(item => item[1]).join('')
	if (/^[2345678]+$/.test(suit)) return FZ2

	return 0
}
