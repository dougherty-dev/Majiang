#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong2
 */

import { BING, FENG, SHU, TIAO, WAN } from '../tiles.js'
import { fz76WuZi } from './fanzhong1.js'

const FZ2 = 2

// 59. Dragon kezi (Jianke, 箭刻)
export async function fz59Jianke(struct) {
	return (struct.jianTypes.match(/1{3,4}|2{3,4}|3{3,4}/g)) ? FZ2 : 0
}

// 60. Prevalent wind (Quanfengke, 圈风刻)
export async function fz60Quanfengke(struct) {
	const allMelds = struct.game.players[struct.key].hu.allMelds
	const quanfeng = allMelds.filter(
		item => item[0] === FENG &&
			item[1].length >= 3 &&
			item[1][0] == struct.game.prevailingWind
	).length

	return (quanfeng) ? FZ2 : 0
}

// 61. Seat wind (Menfengke, 门风刻)
export async function fz61Menfengke(struct) {
	const allMelds = struct.game.players[struct.key].hu.allMelds
	const menfeng = allMelds.filter(
		item => item[0] === FENG &&
			item[1].length >= 3 &&
			item[1][0] == struct.game.players[struct.key].wind
	).length

	return (menfeng) ? FZ2 : 0
}

// 62. Concealed hand (Menqian qing, 门前清)
export async function fz62MenqianQing(struct) {
	const melds = struct.game.players[struct.key].melds
	const allConcealed = melds.filter(item => item.type !== 'angang').length === 0

	return (allConcealed && struct.game.players[struct.key].hu.dianhu) ? FZ2 : 0
}

// 63. All shunzi (Pinghu, 平和)
export async function fz63Pinghu(struct) {
	if (struct.game.players[struct.key].hu.shunzi.length === 4) {
		return FZ2
	}

	return 0
}

// 64. Tile hog (Si gui yi, 四归一)
export async function fz64SiGuiYi(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const shunzi = struct.game.players[struct.key].hu.shunzi
	const duizi = struct.game.players[struct.key].hu.duizi

	const suited = [...kezi, ...shunzi, ...duizi].filter(item => SHU.includes(item[0]))
	const pattern = /(\d)\1{3}/

	const bingzi = suited.filter(item => item[0] === BING).map(item => item[1]).join('').split('').sort().join('')
	if (bingzi.match(pattern)) return FZ2

	const tiaozi = suited.filter(item => item[0] === TIAO).map(item => item[1]).join('').split('').sort().join('')
	if (tiaozi.match(pattern)) return FZ2

	const wanzi = suited.filter(item => item[0] === WAN).map(item => item[1]).join('').split('').sort().join('')
	if (wanzi.match(pattern)) return FZ2

	return 0
}

// 65. Double kezi (Shuang tongke, 双同刻)
export async function fz65ShuangTongke(struct) {
	const suited = struct.keziGangzi.filter(item => SHU.includes(item[0]))
	const reduced = suited.map(item => item[1][0])
	const set = [...new Set(reduced)]

	return (reduced.length === 2 && set.length === 1) ? FZ2 : 0
}

// 66. Two concealed kezi (Shuang anke, 双暗刻)
export async function fz66ShuangAnke(struct) {
	return (struct.concealedKezi === 2) ? FZ2 : 0
}

// 67. Concealed gang (Angang, 暗杠)
export async function fz67Angang(struct) {
	const melds = struct.game.players[struct.key].melds
	const angang = melds.filter(item => item.type === 'angang').length

	return (angang === 1) ? FZ2 : 0
}

// 68. All simples (Duanyao, 断幺)
export async function fz68Duanyao(struct) {
	const hasZi = struct.fengTypes.length || struct.jianTypes.length
	const shuTypes = struct.shuTypes.map(item => item[1]).join('')
	return (!hasZi && /^[2345678][^19]+$/.test(shuTypes)) ? FZ2 : 0

}
