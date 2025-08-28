#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong12
 * @description 12 番 (fan) scoring rules.
 * @property {function} fz34QuanBuKao 34. Lesser honors and knitted tiles (Quan bu kao, 全不靠).
 * @property {function} fz35ZuheLong 35. Knitted straight (Zuhe long, 组合龙).
 * @property {function} fz36DaYuWu 36. Upper four (Da yu wu, 大于五).
 * @property {function} fz37XiaoYuWu 37. Lower four (Xiao yu wu, 小于五).
 * @property {function} fz38SanFengKe 38. Big three winds (San feng ke, 三风刻).
 */

const FZ12 = 12

/**
 * ✅ 34. Lesser honors and knitted tiles (Quan bu kao, 全不靠).
 * Three full or partial shunzi 147, 258, 369 in different suits, plus at most one each of honors.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 12.
 */
export async function fz34QuanBuKao(struct) {
	const player = struct.game.players[struct.key]

	return (player.knitted && player.lesserHonors) ? FZ12 : 0
}

/**
 * ✅ 35. Knitted straight (Zuhe long, 组合龙).
 * Three special shunzi 147, 258, 369 in different suits.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 12.
 */
export async function fz35ZuheLong(struct) {
	const player = struct.game.players[struct.key]

	return (player.knittedStraight) ? FZ12 : 0
}

/**
 * ✅ 36. Upper four (Da yu wu, 大于五).
 * All tiles valued 6–9.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 12.
 */
export async function fz36DaYuWu(struct) {
	const upper = struct.shuTiles.filter(item => item[1] > 5)

	return (upper.length === struct.tiles.length) ? FZ12 : 0
}

/**
 * ✅ 37. Lower four (Xiao yu wu, 小于五).
 * All tiles valued 1–4.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 12.
 */
export async function fz37XiaoYuWu(struct) {
	const lower = struct.shuTiles.filter(item => item[1] < 5)

	return (lower.length === struct.tiles.length) ? FZ12 : 0
}

/**
 * ✅ 38. Big three winds (San feng ke, 三风刻).
 * Kezi (gangzi) of three winds.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 12.
 */
export async function fz38SanFengKe(struct) {
	const pattern = new RegExp([
		'1{3,4}2{3,4}3{3,4}',
		'1{3,4}2{3,4}4{3,4}',
		'1{3,4}3{3,4}4{3,4}',
		'2{3,4}3{3,4}4{3,4}'
	].join('|'), 'g')

	return (struct.fengTypes.match(pattern)) ? FZ12 : 0
}
