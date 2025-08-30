#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong2
 * @description 2 番 (fan) scoring rules.
 * @property {function} fz59Jianke 59. Dragon kezi (Jianke, 箭刻).
 * @property {function} fz60Quanfengke 60. Prevalent wind (Quanfengke, 圈风刻).
 * @property {function} fz61Menfengke 61. Seat wind (Menfengke, 门风刻).
 * @property {function} fz62MenqianQing 62. Concealed hand (Menqian qing, 门前清).
 * @property {function} fz63Pinghu 63. All shunzi (Pinghu, 平和).
 * @property {function} fz64SiGuiYi 64. Tile hog (Si gui yi, 四归一).
 * @property {function} fz65ShuangTongke 65. Double kezi (Shuang tongke, 双同刻).
 * @property {function} fz66ShuangAnke 66. Two concealed kezi (Shuang anke, 双暗刻).
 * @property {function} fz67Angang 67. Concealed gang (Angang, 暗杠).
 * @property {function} fz68Duanyao 68. All simples (Duanyao, 断幺).
 */

import { GANGZI } from '../../components/hu/patterns.js'
import { shunziLookup } from '../../components/lookup/shunzi.js'

const FZ2 = 2

/**
 * ✅ 59. Dragon kezi (Jianke, 箭刻).
 * Single kezi (gangzi) of dragon tiles.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz59Jianke(struct) {
	return (struct.jianTypes.match(/1{3,4}|2{3,4}|3{3,4}/g)) ? FZ2 : 0
}

/**
 * ✅ 60. Prevalent wind (Quanfengke, 圈风刻).
 * Kezi (gangzi) of wind tile corresponding to the prevalent wind.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz60Quanfengke(struct) {
	const regex = new RegExp(`${struct.game.prevailingWind}{3,4}`, 'g')

	return regex.test(struct.fengTypes) ? FZ2 : 0
}

/**
 * ✅ 61. Seat wind (Menfengke, 门风刻).
 * Kezi (gangzi) of wind tile corresponding to the seat wind.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz61Menfengke(struct) {
	const regex = new RegExp(`${struct.game.players[struct.key].wind}{3,4}`, 'g')

	return regex.test(struct.fengTypes) ? FZ2 : 0
}

/**
 * ✅ 62. Concealed hand (Menqian qing, 门前清).
 * All tiles are concealed, on board or on hand, winning by a discarded tile.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz62MenqianQing(struct) {
	const dianhu = struct.game.players[struct.key].dianhu
	const melds = struct.game.players[struct.key].melds
	const allConcealed = melds.filter(item => item.type !== 'angang').length === 0

	return (allConcealed && dianhu) ? FZ2 : 0
}

/**
 * ✅ 63. All shunzi (Pinghu, 平和).
 * Four shunzi and a suited pair.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz63Pinghu(struct) {
	if (
		struct.nonchiMelds.length ||
		struct.hasZi ||
		struct.tiles.length !== 14
	) return 0

	const types = struct.shuTypes14.map(item => item[1]).filter(item => item)
	for (const type of types) {
		if ([3, 5, 6, 8, 9, 11, 12, 14].includes(type.length)) {
			if (!(type in shunziLookup[`shunzi${type.length}`])) return 0
		}
	}

	return FZ2
}

/**
 * ✅ 64. Tile hog (Si gui yi, 四归一).
 * Four shunzi and a suited pair.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz64SiGuiYi(struct) {
	const gangValues = struct.game.players[struct.key].melds
		.filter(item => ['gang', 'angang'].includes(item.type))
		.map(item => item.meld[0][1])

	const fourValues = struct.shuTypes14.map(item => item[1]
		.match(GANGZI)).filter(item => item).flat().map(item => parseInt(item[0]))

	for (const digit of fourValues) {
		if (!(digit in gangValues)) return FZ2
	}

	return 0
}

/**
 * ✅ 65. Double kezi (Shuang tongke, 双同刻).
 * Two kezi (gangzi) of the same value in different suits.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz65ShuangTongke(struct) {
	if (struct.tongke === 4) return 2 * FZ2
	if (struct.tongke === 2) return FZ2
}

/**
 * ✅ 66. Two concealed kezi (Shuang anke, 双暗刻).
 * Two concealed kezi (gangzi), on hand or melded (angang).
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz66ShuangAnke(struct) {
	return (struct.concealedKezi === 2) ? FZ2 : 0
}

/**
 * ✅ 67. Concealed gang (Angang, 暗杠).
 * Self-drawn gang concealed on board.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz67Angang(struct) {
	return (struct.angangMelds.length === 1) ? FZ2 : 0
}

/**
 * ✅ 68. All simples (Duanyao, 断幺).
 * Hand without terminals (1, 9, honors).
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 2.
 */
export async function fz68Duanyao(struct) {
	const shuTypes = struct.shuTypes.map(item => item[1]).join('')
	return (!struct.hasZi && /^[2345678][^19]+$/.test(shuTypes)) ? FZ2 : 0
}
