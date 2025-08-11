#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong2
 */

import { FENG, JIAN } from '../tiles.js'
import { fz76WuZi } from './fanzhong1.js'

const FZ2 = 2

// 59. Dragon kezi (Jianke, 箭刻)
export async function fz59Jianke(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi

	const types = [...kezi.map(item => item[0]), ...gangzi.map(item => item[0])]
	const count = types.filter(item => item === JIAN).length

	if (count === 1) return FZ2

	return 0
}

// 60. Prevalent wind (Quanfengke, 圈风刻)
export async function fz60Quanfengke(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const quanfeng = melds.filter(
		item => item[0] === FENG &&
		item[1].length >= 3 &&
		item[1][0] == struct.game.prevailingWind
	).length

	if (quanfeng) return FZ2

	return 0
}

// 61. Seat wind (Menfengke, 门风刻)
export async function fz61Menfengke(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const menfeng = melds.filter(
		item => item[0] === FENG &&
		item[1].length >= 3 &&
		item[1][0] == struct.game.players[struct.key].wind
	).length

	if (menfeng) return FZ2

	return 0
}

// 63. All shunzi (Pinghu, 平和)
export async function fz63Pinghu(struct) {
	if (struct.game.players[struct.key].hu.shunzi.length === 4) {
		return FZ2
	}

	return 0
}

// 68. All simples (Duanyao, 断幺)
export async function fz68Duanyao(struct) {
	if (!await fz76WuZi(struct)) return 0

	const melds = struct.game.players[struct.key].hu.allMelds

	const suit = melds.map(item => item[1]).join('')
	if (/^[2345678]+$/.test(suit)) return FZ2

	return 0
}
