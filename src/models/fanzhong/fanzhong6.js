#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 * @property {Function} fz49PengpengHu 49. All kezi (Pengpeng hu, 碰碰和).
 * @property {Function} fz50HunYiSe 50. Half flush (Hun yi se, 混一色).
 * @property {Function} fz51SanSeSanBuGao 51. Mixed shifted shunzi (San se san bu gao, 三色三步高).
 * @property {Function} fz52WuMenJi 52. All types (Wu men ji, 五门齐).
 * @property {Function} fz53QuanQiuRen 53. Melded hand (Quan qiu ren, 全求人).
 * @property {Function} fz54ShuangJianke 54. Two dragons kezi (Shuang jianke, 双箭刻).
 */

import { SHIFTEDAX3, SHUNZI } from '../../components/hu/patterns.js'
import { keziLookup } from '../../components/lookup/kezi.js'
import { SHU } from '../tiles.js'

const FZ6 = 6

/**
 * ✅ 49. All kezi (Pengpeng hu, 碰碰和).
 * Four kezi (gangzi) and a pair.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 6.
 */
export async function fz49PengpengHu(struct) {
	const types = struct.allTypes14.map(item => item[1]).filter(item => item)
	for (const type of types) {
		if ([3, 5, 6, 8, 9, 11, 12, 14].includes(type.length)) {
			if (!(type in keziLookup[`kezi${type.length}`])) return 0
		} else if (type.length) { // qi dui, length 2
			return 0
		}
	}

	return FZ6
}

/**
 * ✅ 50. Half flush (Hun yi se, 混一色).
 * All tiles in one single suit and honors.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 6.
 */
export async function fz50HunYiSe(struct) {
	const shuTypes = struct.shuTypes.filter(item => item[1])

	return (struct.hasZi && shuTypes.length === 1) ? FZ6 : 0
}

/**
 * 51. Mixed shifted shunzi (San se san bu gao, 三色三步高).
 * One shunzi in each suit, consecutively shifted up in value.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 6.
 * PROBLEMATIC
 */
export async function fz51SanSeSanBuGao(struct) {
	const allMelds = struct.game.players[struct.key].hu.allMelds

	// extract suited shunzi
	const melds = allMelds.filter(
		item => item[1].length === 3 &&
		SHU.includes(item[0]) &&
		item[1].match(SHUNZI)
	)

	// suited shunzi must be at least 3
	if (melds.length < 3) return 0

	// ensure all three types b, t, w are present
	const types = [...new Set(melds.map(item => item[0]))].sort().join('')
	if (types !== 'btw') return 0

	// sort melds by shunzi value
	melds.sort((a, b) => a[1].localeCompare(b[1]))

	// make pattern and sort
	let pattern = `${melds[0][1]}${melds[1][1]}${melds[2][1]}`
	pattern = [...pattern].sort().join('')

	// compare with predefined pattern for shifted shunzi
	if (pattern.match(SHIFTEDAX3)) return FZ6

	if (melds.length > 3) {
		pattern = `${melds[1][1]}${melds[2][1]}${melds[3][1]}`
		pattern = [...pattern].sort().join('')
		if (pattern.match(SHIFTEDAX3)) return FZ6
	}

	return 0
}

/**
 * ✅ 52. All types (Wu men ji, 五门齐).
 * Each of the five sets consisting of a different type.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 6.
 */
export async function fz52WuMenJi(struct) {
	const types = struct.allTypes.filter(item => item[1])

	return (types.length === 5) ? FZ6 : 0
}

/**
 * ✅ 53. Melded hand (Quan qiu ren, 全求人).
 * Every set, including the last pair, completed by melding from discarded tiles.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 6.
 */
export async function fz53QuanQiuRen(struct) {
	const dianhu = struct.game.players[struct.key].hu.dianhu
	const melds = struct.game.players[struct.key].melds.length

	return (melds === 4 && dianhu) ? FZ6 : 0
}

/**
 * ✅ 54. Two dragons kezi (Shuang jianke, 双箭刻).
 * Two kezi (gangzi) of dragon tiles.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 6.
 */
export async function fz54ShuangJianke(struct) {
	const pattern = /1{3,4}2{3,4}|1{3,4}3{3,4}|2{3,4}3{3,4}/g

	return (struct.jianTypes.match(pattern)) ? FZ6 : 0
}
