#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong4
 */

import { ZI } from '../tiles.js'

const FZ4 = 4
const FZ2 = 2

// 55. Outside hand (Quan dai yao, 全带幺)
export async function fz55QuanDaiYao(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds

	const yaojiuzi = melds.filter(item => ZI.includes(item[0]) || /[19]+/.test(item[1]))
	if (yaojiuzi.length === 5) return FZ4 

	return 0
}

// 56. Fully concealed hand (Bu qiu ren, 不求人)
export async function fz56BuQiuRen(struct) {
	if (
		struct.game.players[struct.key].melds.length === 0 &&
		struct.game.zimo
	) return FZ4

	return 0
}

// 57. Two melded gangs (Shuang minggang, 双明杠)
export async function fz57ShuangMinggang(struct) {
	const melds = struct.game.players[struct.key].melds

	const gang = melds.filter(item => item.type === 'gang').length
	const angang = melds.filter(item => item.type === 'angang')-length

	if (angang === 1 && gang === 1) return FZ4 + FZ2
	if (angang === 0 && gang === 2) return FZ4

	return 0
}

// 58. Last tile (Hu juezhang, 和绝张)
export async function fz58HuJuezhang(struct) {
	if (struct.game.tiles.length === 0) return FZ4

	return 0
}
