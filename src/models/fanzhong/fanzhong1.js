#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong1
 * @property {Function} fz69YibanGao 69. Pure double shunzi (Yiban gao, 一般高).
 * @property {Function} fz70XiXiangfeng 70. Mixed double shunzi (Xi xiangfeng, 喜相逢).
 * @property {Function} fz71LianLiu 71. Short straight (Lian liu, 连六).
 * @property {Function} fz72LaoshaoFu 72. Two terminal shunzi (Laoshao fu, 老少副).
 * @property {Function} fz73YaoJiuKe 73. Terminal kezi (Yao jiu ke, 幺九刻).
 * @property {Function} fz74Minggang 74. Melded gang (Minggang, 明杠).
 * @property {Function} fz75QueYiMen 75. One voided suit (Que yi men, 缺一门).
 * @property {Function} fz76WuZi 76. No honors (Wu zi, 无字).
 * @property {Function} fz77Bianzhang 77. Edge wait (Bianzhang, 边张).
 * @property {Function} fz78Kanzhang 78. Closed wait (Kanzhang, 坎张).
 * @property {Function} fz79DandiaoJiang 79. Single wait (Dandiao jiang, 单调将).
 * @property {Function} fz80Zimo 80. Self-drawn (Zimo, 自摸).
 * @property {Function} fz81Huapai 81. Flower tiles (Huapai, 花牌).
 */

import { tingpai } from '../../components/hu/check-type.js'
import { BING, SHU, TIAO, WAN, ZI } from '../tiles.js'

const FZ1 = 1

/**
 * 69. Pure double shunzi (Yiban gao, 一般高).
 * Containing two identical shunzi.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz69YibanGao(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	let hit = []
	for (const type of shunzi) {
		if (hit.includes(type)) return FZ1
		hit.push(type)
	}

	return 0
}

/**
 * 70. Mixed double shunzi (Xi xiangfeng, 喜相逢).
 * Containing two shunzi with same values but in different suits.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz70XiXiangfeng(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	let hit = []
	for (const type of shunzi) {
		if (hit.length && hit[0][1] === type[1] && hit[0][0] !== type[0]) return FZ1
		hit.push(type)
	}

	return 0
}

/**
 * 71. Short straight (Lian liu, 连六).
 * Two shunzi in the same suit making six consecutive values.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz71LianLiu(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi
	const pattern = /(123456|234567|345678|456789)/g

	const bingzi = shunzi.filter(item => item[0] === BING).map(item => item[1]).join('').split('').sort().join('')
	if (bingzi.match(pattern)) return FZ1

	const tiaozi = shunzi.filter(item => item[0] === TIAO).map(item => item[1]).join('').split('').sort().join('')
	if (tiaozi.match(pattern)) return FZ1

	const wanzi = shunzi.filter(item => item[0] === WAN).map(item => item[1]).join('').split('').sort().join('')
	if (wanzi.match(pattern)) return FZ1

	return 0
}

/**
 * 72. Two terminal shunzi (Laoshao fu, 老少副).
 * Two shunzi 1-2-3 and 6-7-8 in the same suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz72LaoshaoFu(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	const bingzi = shunzi.filter(item => item[0] === BING).map(item => item[1])
	if (bingzi.includes('123') && bingzi.includes('789')) return FZ1

	const tiaozi = shunzi.filter(item => item[0] === TIAO).map(item => item[1])
	if (tiaozi.includes('123') && tiaozi.includes('789')) return FZ1

	const wanzi = shunzi.filter(item => item[0] === WAN).map(item => item[1])
	if (wanzi.includes('123') && wanzi.includes('789')) return FZ1

	return 0
}

/**
 * 73. Terminal kezi (Yao jiu ke, 幺九刻).
 * Single kezi (gangzi) of ones, nines, or a wind.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz73YaoJiuKe(struct) {
	const types = struct.keziGangzi
		.map(item => [item[0], item[1][0]])
		.filter(item => item[0] !== 'j')
		.filter(item => item[0] === 'f' || item[1] === '1' || item[1] === '9')

	return types.length * FZ1
}

/**
 * 74. Melded gang (Minggang, 明杠).
 * Open gang.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz74Minggang(struct) {
	const melds = struct.game.players[struct.key].melds
	const gang = melds.filter(item => item.type === 'gang').length

	return (gang === 1) ? FZ1 : 0
}

/**
 * 75. One voided suit (Que yi men, 缺一门).
 * Hand lacking one of the three suits.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz75QueYiMen(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const suits = [... new Set(melds.filter(item => SHU.includes(item[0])).map(item => item[0]))]

	return (suits.length === 2) ? FZ1 : 0
}

/**
 * 76. No honors (Wu zi, 无字).
 * Hand with only suited tiles.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz76WuZi(struct) {
	return struct.tiles.some(arr => ZI.includes(arr[7])) ? 0 : FZ1
}

/**
 * 77. Edge wait (Bianzhang, 边张).
 * Exclusively waiting for a 3 to form a shunzi 1-2-3, or for a 7 to form a shunzi 7-8-9.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz77Bianzhang(struct) {
	const hupai = struct.game.hupai
	const shunzi = struct.game.players[struct.key].hu.shunzi
		.filter(item => item[0] === hupai[7])

	let triple = []
	switch (hupai[1]) {
	case 3:
		triple = shunzi.filter(item => item[1][2] === '3')
		break
	case 7:
		triple = shunzi.filter(item => item[1][0] === '7')
	}

	if (triple.length === 0) return 0

	const door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].hu.zimo) door.pop()
	if (door.length === 1) return 0

	const inc = door.map(item => item[1])

	switch (hupai[1]) {
	case 3:
		if (!inc.includes(1) || !inc.includes(2)) return 0
		break
	case 7:
		if (!inc.includes(8) || !inc.includes(9)) return 0
	}

	const seq = door.filter(item => item[7] === hupai[7]).map(item => item[1])
	if (![1, 2, 4, 5, 7, 8, 10, 11, 13].includes(seq.length)) return 0

	struct.game.tingpai = await tingpai(seq)

	return (struct.game.tingpai) ? FZ1 : 0
}

/**
 * 78. Closed wait (Kanzhang, 坎张).
 * Exclusively waiting to form a shunzi from the middle value.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz78Kanzhang(struct) {
	const hupai = struct.game.hupai
	const shunzi = struct.game.players[struct.key].hu.shunzi
		.filter(item => item[0] === hupai[7])

	const triple = shunzi.filter(item => item[1][1] == hupai[1])
	if (triple.length === 0) return 0

	const door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].hu.zimo) door.pop()
	if (door.length === 1) return 0

	const inc = door.map(item => item[1])
	if (!inc.includes(hupai[1] - 1) || !door.includes(hupai[1] + 1)) return 0

	const seq = door.filter(item => item[7] === hupai[7]).map(item => item[1])
	if (![1, 2, 4, 5, 7, 8, 10, 11, 13].includes(seq.length)) return 0

	struct.game.tingpai = await tingpai(seq)

	return (struct.game.tingpai) ? FZ1 : 0
}

/**
 * 79. Single wait (Dandiao jiang, 单调将).
 * Exclusively waiting for winning tile to form a pair.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz79DandiaoJiang(struct) {
	const hupai = struct.game.hupai
	const duizi = struct.game.players[struct.key].hu.duizi

	if (
		duizi.length === 0 ||
		duizi[0][0] !== hupai[7] ||
		!duizi[0][1].includes(hupai[1])
	) return 0

	const door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].hu.zimo) door.pop()

	const seq = door.filter(item => item[7] === hupai[7]).map(item => item[1])
	if (![1, 2, 4, 5, 7, 8, 10, 11, 13].includes(seq.length)) return 0

	if (!struct.game.tingpai) struct.game.tingpai = await tingpai(seq)

	return (struct.game.tingpai) ? FZ1 : 0
}

/**
 * ✅ 80. Self-drawn (Zimo, 自摸).
 * Winning by tile drawn from wall.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz80Zimo(struct) {
	return (struct.game.players[struct.key].hu.zimo) ? FZ1 : 0
}

/**
 * ✅ 81. Flower tiles (Huapai, 花牌).
 * Each bonus tile amounts to one fan when winning.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 1.
 */
export async function fz81Huapai(struct) {
	return struct.game.players[struct.key].flowers.length
}
