#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong2
 * @property {Function} fz59Jianke 59. Dragon kezi (Jianke, 箭刻).
 * @property {Function} fz60Quanfengke 60. Prevalent wind (Quanfengke, 圈风刻).
 * @property {Function} fz61Menfengke 61. Seat wind (Menfengke, 门风刻).
 * @property {Function} fz62MenqianQing 62. Concealed hand (Menqian qing, 门前清).
 * @property {Function} fz63Pinghu 63. All shunzi (Pinghu, 平和).
 * @property {Function} fz64SiGuiYi 64. Tile hog (Si gui yi, 四归一).
 * @property {Function} fz65ShuangTongke 65. Double kezi (Shuang tongke, 双同刻).
 * @property {Function} fz66ShuangAnke 66. Two concealed kezi (Shuang anke, 双暗刻).
 * @property {Function} fz67Angang 67. Concealed gang (Angang, 暗杠).
 * @property {Function} fz68Duanyao 68. All simples (Duanyao, 断幺).
 */

import { BING, SHU, TIAO, WAN } from '../tiles.js'

const FZ2 = 2

/**
 * ✅ 59. Dragon kezi (Jianke, 箭刻).
 * Single kezi (gangzi) of dragon tiles.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz59Jianke(struct) {
	return (struct.jianTypes.match(/1{3,4}|2{3,4}|3{3,4}/g)) ? FZ2 : 0
}

/**
 * ✅ 60. Prevalent wind (Quanfengke, 圈风刻).
 * Kezi (gangzi) of wind tile corresponding to the prevalent wind.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz60Quanfengke(struct) {
	const regex = new RegExp(`${struct.game.prevailingWind}{3,4}`, 'g')

	return regex.test(struct.fengTypes) ? FZ2 : 0
}

/**
 * ✅ 61. Seat wind (Menfengke, 门风刻).
 * Kezi (gangzi) of wind tile corresponding to the seat wind.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz61Menfengke(struct) {
	const regex = new RegExp(`${struct.game.players[struct.key].wind}{3,4}`, 'g')

	return regex.test(struct.fengTypes) ? FZ2 : 0
}

/**
 * ✅ 62. Concealed hand (Menqian qing, 门前清).
 * All tiles are concealed, on board or on hand, winning by a discarded tile.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz62MenqianQing(struct) {
	const dianhu = struct.game.players[struct.key].hu.dianhu
	const melds = struct.game.players[struct.key].melds
	const allConcealed = melds.filter(item => item.type !== 'angang').length === 0

	return (allConcealed && dianhu) ? FZ2 : 0
}

/**
 * 63. All shunzi (Pinghu, 平和).
 * Four shunzi and a suited pair.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz63Pinghu(struct) {
	if (struct.game.players[struct.key].hu.shunzi.length === 4) {
		return FZ2
	}

	return 0
}

/**
 * 64. Tile hog (Si gui yi, 四归一).
 * Four shunzi and a suited pair.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
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

/**
 * 65. Double kezi (Shuang tongke, 双同刻).
 * Two kezi (gangzi) of the same value in different suits.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz65ShuangTongke(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	struct.keziGangzi = [...kezi, ...gangzi]

	const suited = struct.keziGangzi.filter(item => SHU.includes(item[0]))
	const reduced = suited.map(item => item[1][0])
	const set = [...new Set(reduced)]

	return (reduced.length === 2 && set.length === 1) ? FZ2 : 0
}

/**
 * ✅ 66. Two concealed kezi (Shuang anke, 双暗刻).
 * Two concealed kezi (gangzi), on hand or melded (angang).
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz66ShuangAnke(struct) {
	return (struct.concealedKezi === 2) ? FZ2 : 0
}

/**
 * ✅ 67. Concealed gang (Angang, 暗杠).
 * Self-drawn gang concealed on board.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz67Angang(struct) {
	return (struct.angangMelds.length === 1) ? FZ2 : 0
}

/**
 * ✅ 68. All simples (Duanyao, 断幺).
 * Hand without terminals (1, 9, honors).
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 2.
 */
export async function fz68Duanyao(struct) {
	const hasZi = struct.fengTypes.length || struct.jianTypes.length
	const shuTypes = struct.shuTypes.map(item => item[1]).join('')
	return (!hasZi && /^[2345678][^19]+$/.test(shuTypes)) ? FZ2 : 0
}
