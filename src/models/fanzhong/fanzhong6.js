#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 * @description 6 番 (fan) scoring rules.
 * @property {function} fz49PengpengHu 49. All kezi (Pengpeng hu, 碰碰和).
 * @property {function} fz50HunYiSe 50. Half flush (Hun yi se, 混一色).
 * @property {function} fz51SanSeSanBuGao 51. Mixed shifted shunzi (San se san bu gao, 三色三步高).
 * @property {function} fz52WuMenJi 52. All types (Wu men ji, 五门齐).
 * @property {function} fz53QuanQiuRen 53. Melded hand (Quan qiu ren, 全求人).
 * @property {function} fz54ShuangJianke 54. Two dragons kezi (Shuang jianke, 双箭刻).
 */

import { KEZI, SHUNZI } from '../../components/hu/patterns.js'
import { keziLookup } from '../../components/lookup/kezi.js'
import { lookup5, lookup6 } from '../../components/lookup/lookup.js'

const FZ6 = 6

/**
 * ✅ 49. All kezi (Pengpeng hu, 碰碰和).
 * Four kezi (gangzi) and a pair.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 6.
 */
export async function fz49PengpengHu(struct) {
	const types = struct.allTypes14.map(item => item[1]).filter(item => item.length > 2)
	const kezi = types.map(item => item.match(KEZI)).flat()

	if (kezi.length < 4) return 0 // Not sufficient, 11112223334444 => 11 123 123 234 444

	for (const type of types) {
		if ([3, 5, 6, 8, 9, 11, 12, 14].includes(type.length)) {
			if (!(type in keziLookup[`kezi${type.length}`])) return 0
		}
	}

	return FZ6
}

/**
 * ✅ 50. Half flush (Hun yi se, 混一色).
 * All tiles in one single suit and honors.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 6.
 */
export async function fz50HunYiSe(struct) {
	const shuTypes = struct.shuTypes.filter(item => item[1])

	return (struct.hasZi && shuTypes.length === 1) ? FZ6 : 0
}

/**
 * ✅ 51. Mixed shifted shunzi (San se san bu gao, 三色三步高).
 * One shunzi in each suit, consecutively shifted up in value.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 6.
 */
export async function fz51SanSeSanBuGao(struct) {
	const shuTypes = struct.shuTypes14.filter(item => item[1])
		.filter(item => item[1].length > 2).map(item => item[1]).flat()
		.sort((a, b) => a.length - b.length)

	// Three suited sets, lengths: 3, 3, 3 | 3, 3, 5 | 3, 3, 6 | 3, 5, 6 
	if (shuTypes.length < 3) return 0

	const groups = ['123234345', '234345456', '345456567', '456567678', '567678789']
	let shunzi = []
	let sets

	if (!shuTypes[0].match(SHUNZI)) return 0
	shunzi.push(shuTypes[0]) // First set given, length 3.

	switch (shuTypes[1].length) { // Second set 3 or 5.
	case 3:
		shunzi.push(shuTypes[1])
		break
	case 5:
		if (!lookup5[shuTypes[1]]) return 0
		sets = lookup5[shuTypes[1]].flat().filter(item => item.length === 3)
		if (!sets[0].match(SHUNZI)) return 0
		shunzi.push(sets[0])
	}

	switch (shuTypes[2].length) { // Third set 3 or 6.
	case 3:
		shunzi.push(shuTypes[2])
		break
	case 6:
		if (!lookup6[shuTypes[2]]) return 0
		sets = lookup6[shuTypes[2]].flat().map(item => item.match(SHUNZI))
			.flat().filter(item => item)
		if (!sets.length) return 0
		shunzi.push(sets)
		break
	default:
		return 0
	}

	for (const set of [shunzi[2]].flat()) { // Possibly two shunzi for last set.
		let sorted = Object.assign([], [shunzi[0], shunzi[1]])
		sorted.push(set)
		sorted.sort()
		if (groups.includes(sorted.join(''))) return FZ6
	}

	return 0
}

/**
 * ✅ 52. All types (Wu men ji, 五门齐).
 * Each of the five sets consisting of a different type.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 6.
 */
export async function fz52WuMenJi(struct) {
	const types = struct.allTypes.filter(item => item[1])

	return (types.length === 5) ? FZ6 : 0
}

/**
 * ✅ 53. Melded hand (Quan qiu ren, 全求人).
 * Every set, including the last pair, completed by melding from discarded tiles.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 6.
 */
export async function fz53QuanQiuRen(struct) {
	const dianhu = struct.game.players[struct.key].dianhu
	const melds = struct.game.players[struct.key].melds.length

	return (melds === 4 && dianhu) ? FZ6 : 0
}

/**
 * ✅ 54. Two dragons kezi (Shuang jianke, 双箭刻).
 * Two kezi (gangzi) of dragon tiles.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 6.
 */
export async function fz54ShuangJianke(struct) {
	const pattern = /1{3,4}2{3,4}|1{3,4}3{3,4}|2{3,4}3{3,4}/g

	return (struct.jianTypes.match(pattern)) ? FZ6 : 0
}
