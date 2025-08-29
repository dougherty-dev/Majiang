#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong24
 * @description 24 番 (fan) scoring rules.
 * @property {function} fz19QiDui 19. Seven pairs (Qi dui, 七对).
 * @property {function} fz20QiXingBuKao 20. Greater honors and knitted tiles (Qi xing bu kao, 七星不靠).
 * @property {function} fz21QuanShuangKe 21. All even kezi (Quan shuang ke, 全双刻).
 * @property {function} fz22QingYiSe 22. Full flush (Qing yi se, 清一色).
 * @property {function} fz23YiSeSanTongshun 23. Pure triple shunzi (Yi se san tongshun, 一色三同顺).
 * @property {function} fz24YiSeSanJieGao 24. Pure shifted kezi (Yi se san jie gao, 一色三节高).
 * @property {function} fz25QuanDa 25. Upper tiles (Quan da, 全大).
 * @property {function} fz26QuanZhong 26. Middle tiles (Quan zhong, 全中).
 * @property {function} fz27QuanXiao 27. Lower tiles (Quan xiao, 全小).
 */

import { tripleShunziLookup } from '../../components/lookup/triple-shunzi.js'
import { tripleKeziLookup } from '../../components/lookup/triple-kezi.js'

const FZ24 = 24

/**
 * ✅ 19. Seven pairs (Qi dui, 七对).
 * Seven pairs of all types.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
export async function fz19QiDui(struct) {
	return (struct.game.players[struct.key].qidui) ? FZ24 : 0
}

/**
 * ✅ 20. Greater honors and knitted tiles (Qi xing bu kao, 七星不靠).
 * One each of winds and dragons, plus special full/partial suited shunzi 147, 258, and 369.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
export async function fz20QiXingBuKao(struct) {
	const player = struct.game.players[struct.key]

	return (player.knitted && player.greaterHonors) ? FZ24 : 0
}

/**
 * ✅ 21. All even kezi (Quan shuang ke, 全双刻).
 * Suited kezi (gangzi) and a pair with values 2, 4, 6, 8.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
export async function fz21QuanShuangKe(struct) {
	if (struct.hasZi) return 0

	const types = struct.shuTypes14.map(item => item[1]).join('')
	const even = types.match(/^[2468][^13579]+$/g)

	return (even && !struct.game.players[struct.key].qidui) ? FZ24 : 0
}

/**
 * ✅ 22. Full flush (Qing yi se, 清一色).
 * All tiles in the same suit.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
export async function fz22QingYiSe(struct) {
	return (struct.qingyise) ? FZ24: 0
}

/**
 * ✅ 23. Pure triple shunzi (Yi se san tongshun, 一色三同顺).
 * Three identical shunzi in the same suit.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
export async function fz23YiSeSanTongshun(struct) {
	const shuTypes = struct.shuTypes14.filter(item => item[1])

	const melds = struct.game.players[struct.key].melds
		.filter(item => item.type !== 'chi').map(item => item.meld)

	for (const shuType of shuTypes) {
		let type = Object.assign([], shuType)

		for (const meld of melds) {
			if (meld[0][7] === type[0]) { // remove kezi
				type[1] = type[1].replace(`${meld[0][1]}${meld[1][1]}${meld[2][1]}`, '')
			}
		}

		if ([9, 11, 12, 14].includes(type[1].length)) {
			if (type[1] in tripleShunziLookup[`tripleShunzi${type[1].length}`]) return FZ24
		}
	}

	return 0
}

/**
 * ✅ 24. Pure shifted kezi (Yi se san jie gao, 一色三节高).
 * Kezi in the same suit, shifted up one in value for each set.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
 
export async function fz24YiSeSanJieGao(struct) {
	if (struct.nonchiMelds.length > 1) return 0

	const shuTypes = struct.shuTypes14.filter(item => item[1])

	const melds = struct.game.players[struct.key].melds
		.filter(item => item.type === 'chi').map(item => item.meld)

	for (const shuType of shuTypes) {
		let type = Object.assign([], shuType)

		for (const meld of melds) {
			if (meld[0][7] === type[0]) { // remove shunzi
				type[1] = type[1].replace(`${meld[0][1]}${meld[1][1]}${meld[2][1]}`, '')
			}
		}

		if ([9, 11, 12, 14].includes(type[1].length)) {
			if (type[1] in tripleKeziLookup[`tripleKezi${type[1].length}`]) return FZ24
		}
	}

	return 0
}

/**
 * ✅ 25. Upper tiles (Quan da, 全大).
 * All tiles of values 7, 8, and 9.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
export async function fz25QuanDa(struct) {
	const upper = struct.shuTiles.filter(item => [7, 8, 9].includes(item[1]))

	return (upper.length === struct.tiles.length) ? FZ24 : 0
}

/**
 * ✅ 26. Middle tiles (Quan zhong, 全中).
 * All tiles of values 4, 5, and 6.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
export async function fz26QuanZhong(struct) {
	const middle = struct.shuTiles.filter(item => [4, 5, 6].includes(item[1]))

	return (middle.length === struct.tiles.length) ? FZ24 : 0
}

/**
 * ✅ 27. Lower tiles (Quan xiao, 全小).
 * All tiles of values 4, 5, and 6.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 24.
 */
export async function fz27QuanXiao(struct) {
	const lower = struct.shuTiles.filter(item => [1, 2, 3].includes(item[1]))

	return (lower.length === struct.tiles.length) ? FZ24 : 0
}
