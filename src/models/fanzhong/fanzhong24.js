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
import { DUIZI, KEZI, SHUNZI, TYPES } from '../../components/hu/patterns.js'
import { checkPattern } from '../../components/hu/check-type.js'

const FZ24 = 24

/**
 * ✅ 19. Seven pairs (Qi dui, 七对).
 * Seven pairs of all types.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz19QiDui(struct) {
	if (struct.tiles.length !== 14) return 0

	let pairs = []
	struct.qidui = false

	for (const type of struct.allTypes) {
		if (type[1] && !type[1].match(KEZI)) {
			const match = type[1].match(DUIZI)
			if (match) pairs = [...pairs, ...match]
		}
	}

	if (pairs && pairs.length === 7) {
		struct.qidui = true
		return FZ24
	}

	return 0
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
 * ✅ 21. All even kezi (Quan shuang ke, 全双刻).
 * Suited kezi (gangzi) and a pair with values 2, 4, 6, 8.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz21QuanShuangKe(struct) {
	if (struct.fengTypes.length || struct.jianTypes.length) return 0

	const types = struct.shuTypes14.map(item => item[1]).join('')
	const even = types.match(/^[2468][^13579]+$/g)

	if (!even) return 0
	const kezi = even.map(item => item.match(KEZI)).filter(item => item && item.length >= 3).flat()

	return (kezi.length === 4) ? FZ24 : 0
}

/**
 * ✅ 22. Full flush (Qing yi se, 清一色).
 * All tiles in the same suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz22QingYiSe(struct) {
	return (struct.qingyise) ? FZ24: 0
}

/**
 * ✅ 23. Pure triple shunzi (Yi se san tongshun, 一色三同顺).
 * Three identical shunzi in the same suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz23YiSeSanTongshun(struct) {
	// 123 123 123 => 111222333; note that 111222333444 is covered by 15 (48 fan)
	if (struct.nonchiMelds.length > 1) return 0

	let shuTypes = struct.shuTypes14.filter(item => item[1].length >= 9)
	if (!shuTypes.length) return 0
	shuTypes = shuTypes[0][1]

	const kezi = struct.shuTypes14.map(item => item[1].match(KEZI)).filter(item => item && item.length >= 3)
	if (!kezi.length) return 0

	const triple = kezi[0].map(item => item[0]).join('')
	if (!SHUNZI.test(triple)) return 0

	// Remove three shunzi, check remainder
	for (const digits of kezi[0]) {
		shuTypes = shuTypes.replace(digits, '')
	}

	if (shuTypes.length === 0) return FZ24

	return (await checkPattern(shuTypes)) ? FZ24 : 0
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
 * ✅ 25. Upper tiles (Quan da, 全大).
 * All tiles of values 7, 8, and 9.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz25QuanDa(struct) {
	const upper = struct.shuTiles.filter(item => [7, 8, 9].includes(item[1]))

	return (upper.length === struct.tiles.length) ? FZ24 : 0
}

/**
 * ✅ 26. Middle tiles (Quan zhong, 全中).
 * All tiles of values 4, 5, and 6.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz26QuanZhong(struct) {
	const middle = struct.shuTiles.filter(item => [4, 5, 6].includes(item[1]))

	return (middle.length === struct.tiles.length) ? FZ24 : 0
}

/**
 * ✅ 27. Lower tiles (Quan xiao, 全小).
 * All tiles of values 4, 5, and 6.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 24.
 */
export async function fz27QuanXiao(struct) {
	const lower = struct.shuTiles.filter(item => [1, 2, 3].includes(item[1]))

	return (lower.length === struct.tiles.length) ? FZ24 : 0
}
