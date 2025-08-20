#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong12
 * @property {Function} fz34QuanBuKao 34. Lesser honors and knitted tiles (Quan bu kao, 全不靠).
 * @property {Function} fz35ZuheLong 35. Knitted straight (Zuhe long, 组合龙).
 * @property {Function} fz36DaYuWu 36. Upper four (Da yu wu, 大于五).
 * @property {Function} fz37XiaoYuWu 37. Lower four (Xiao yu wu, 小于五).
 * @property {Function} fz38SanFengKe 38. Big three winds (San feng ke, 三风刻).
 */

const FZ12 = 12

/**
 * 34. Lesser honors and knitted tiles (Quan bu kao, 全不靠).
 * Three full or partial shunzi 147, 258, 369 in different suits, plus at most one each of honors.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 12.
 */
export async function fz34QuanBuKao(struct) {
	const hu = struct.game.players[struct.key].hu

	return (hu.isKnitted && hu.isLesserHonors) ? FZ12 : 0
}

/**
 * 35. Knitted straight (Zuhe long, 组合龙).
 * Three full or partial shunzi 147, 258, 369 in different suits.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 12.
 */
export async function fz35ZuheLong(struct) {
	const hu = struct.game.players[struct.key].hu

	return (hu.isKnittedStraight) ? FZ12 : 0
}

/**
 * 36. Upper four (Da yu wu, 大于五).
 * All tiles valued 6–9.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 12.
 */
export async function fz36DaYuWu(struct) {
	const lower = struct.shuTiles.filter(item => item[1] > 5)

	return (lower.length === struct.tiles.length) ? FZ12 : 0
}

/**
 * 37. Lower four (Xiao yu wu, 小于五).
 * All tiles valued 1–4.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 12.
 */
export async function fz37XiaoYuWu(struct) {
	const lower = struct.shuTiles.filter(item => item[1] < 5)

	return (lower.length === struct.tiles.length) ? FZ12 : 0
}

/**
 * 38. Big three winds (San feng ke, 三风刻).
 * Kezi (gangzi) of three winds.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 12.
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
