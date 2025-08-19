#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong24
 * @property {Function} fz19QiDui 19. Seven pairs (Qi dui, 七对).
 * @property {Function} fz20QiXingBuKao 20. Greater honors and knitted tiles (Qi xing bu kao, 七星不靠).
 * @property {Function} fz21QuanShuangKe 21. All even kezi (Quan shuang ke, 全双刻).
 * @property {Function} fz22QingYiSe 22. Full flush (Qing yi se, 清一色).
 * @property {Function} fz23YiSeSanTongshun 23. Pure triple shunzi (Yi se san tongshun, 一色三同顺).
 * @property {Function} fz24YiSeSanJieGao 24. Pure shifted kezi (Yi se san jie gao, 一色三节高).
 * @property {Function} fz25QuanDa 25. Upper tiles (Quan da, 全大).
 * @property {Function} fz26QuanZhong 26. Middle tiles (Quan zhong, 全中).
 * @property {Function} fz27QuanXiao 27. Lower tiles (Quan xiao, 全小).
 */

import { SHU } from '../tiles.js'
import { TYPES } from '../../components/hu/patterns.js'

const FZ24 = 24

/**
 * 19. Seven pairs (Qi dui, 七对).
 * Seven pairs of all types.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz19QiDui(struct) {
	const allTypes = struct.allTypes.map(item => item[1]).join('')
	const pairs = allTypes.match(/11|22|33|44|55|66|77|88|99/g)

	return (pairs && pairs.length === 7) ? FZ24 : 0
}

/**
 * 20. Greater honors and knitted tiles (Qi xing bu kao, 七星不靠).
 * One each of winds and dragons, plus special full/partial suited shunzi 147, 258, and 369.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz20QiXingBuKao(struct) {
	const hu = struct.game.players[struct.key].hu

	return (hu.isKnitted && hu.isGreaterHonors) ? FZ24 : 0
}

/**
 * 21. All even kezi (Quan shuang ke, 全双刻).
 * Suited kezi (gangzi) and a pair with values 2, 4, 6, 8.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz21QuanShuangKe(struct) {
	const types = struct.shuTypes.map(item => item[1]).join('')
	const even = types.match(/2{2,4}|4{2,4}|6{2,4}|8{2,4}/g)

	return (even && even.length === 5) ? FZ24 : 0
}

/**
 * 22. Full flush (Qing yi se, 清一色).
 * All tiles in the same suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz22QingYiSe(struct) {
	return (struct.qingyise) ? FZ24: 0
}

/**
 * 23. Pure triple shunzi (Yi se san tongshun, 一色三同顺).
 * Three identical shunzi in the same suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 * PROBLEMATIC
 */
export async function fz23YiSeSanTongshun(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	const occurrences = Object.values(shunzi.reduce((acc, curr) => {
		acc[curr] = (acc[curr] || 0) + 1
		return acc
	}, {}))

	const count = occurrences.filter(item => item === 3)

	return (count.length) ? FZ24 : 0
}

/**
 * 24. Pure shifted kezi (Yi se san jie gao, 一色三节高).
 * Kezi in the same suit, shifted up one in value for each set.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 * Only with actual melds, otherwise 23 (same sorted pattern)
 * PROBLEMATIC
 */

export async function fz24YiSeSanJieGao(struct) {
	const pattern = /(111222333|222333444|333444555|444555666|555666777|666777888|777888999)/g
	const kezi = struct.game.players[struct.key].hu.kezi.filter(item => SHU.includes(item[0]))

	const types = Object.assign({}, TYPES)

	for (const tile of kezi) {
		types[tile[0]] += tile[1]
	}

	const reduced = Object.values(types).filter(item => item.length >= 9)

	if (reduced.length) {
		const sorted = reduced[0].split('').sort().join('')

		return (sorted.match(pattern)) ? FZ24 : 0
	}

	return 0
}

/**
 * 25. Upper tiles (Quan da, 全大).
 * All tiles of values 7, 8, and 9.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz25QuanDa(struct) {
	const upper = struct.shuTiles.filter(item => [7, 8, 9].includes(item[1]))

	return (upper.length >= 14) ? FZ24 : 0
}

/**
 * 26. Middle tiles (Quan zhong, 全中).
 * All tiles of values 4, 5, and 6.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz26QuanZhong(struct) {
	const middle = struct.shuTiles.filter(item => [4, 5, 6].includes(item[1]))

	return (middle.length >= 14) ? FZ24 : 0
}

/**
 * 27. Lower tiles (Quan xiao, 全小).
 * All tiles of values 4, 5, and 6.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz27QuanXiao(struct) {
	const lower = struct.shuTiles.filter(item => [1, 2, 3].includes(item[1]))

	return (lower.length >= 14) ? FZ24 : 0
}
