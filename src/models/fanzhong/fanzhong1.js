#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong1
 * @description 1 番 (fan) scoring rules.
 * @property {function} fz69YibanGao 69. Pure double shunzi (Yiban gao, 一般高).
 * @property {function} fz70XiXiangfeng 70. Mixed double shunzi (Xi xiangfeng, 喜相逢).
 * @property {function} fz71LianLiu 71. Short straight (Lian liu, 连六).
 * @property {function} fz72LaoshaoFu 72. Two terminal shunzi (Laoshao fu, 老少副).
 * @property {function} fz73YaoJiuKe 73. Terminal kezi (Yao jiu ke, 幺九刻).
 * @property {function} fz74Minggang 74. Melded gang (Minggang, 明杠).
 * @property {function} fz75QueYiMen 75. One voided suit (Que yi men, 缺一门).
 * @property {function} fz76WuZi 76. No honors (Wu zi, 无字).
 * @property {function} fz77Bianzhang 77. Edge wait (Bianzhang, 边张).
 * @property {function} fz78Kanzhang 78. Closed wait (Kanzhang, 坎张).
 * @property {function} fz79DandiaoJiang 79. Single wait (Dandiao jiang, 单调将).
 * @property {function} fz80Zimo 80. Self-drawn (Zimo, 自摸).
 * @property {function} fz81Huapai 81. Flower tiles (Huapai, 花牌).
 */

import { checkPattern, tingpai } from '../../components/hu/check-type.js'
import { KEZI } from '../../components/hu/patterns.js'
import { lianliuLookup } from '../../components/lookup/lianliu.js'
import { qinglongLookup } from '../../components/lookup/qinglong.js'
import { ZI } from '../tiles.js'

const FZ1 = 1

/**
 * ✅ 69. Pure double shunzi (Yiban gao, 一般高).
 * Containing two identical shunzi.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0, 1 or 2. Can occur twice in a hand.
 */
export async function fz69YibanGao(struct) {
	if (struct.nonchiMelds.length > 2) return 0

	const types = struct.shuTypes14.map(item => item[1]).filter(item => item)

	const shunzi = new RegExp([
		'1{2,}2{2,}3{2,}', '2{2,}3{2,}4{2,}', '3{2,}4{2,}5{2,}', '4{2,}5{2,}6{2,}',
		'5{2,}6{2,}7{2,}', '6{2,}7{2,}8{2,}', '7{2,}8{2,}9{2,}'
	].join('|'), 'g')

	let count = 0

	for (const type of types) {
		let pattern = type

		for (const set of pattern.match(shunzi) ?? []) {
			const original = pattern
			const chars = [...new Set(set.split(''))]

			for (const c of chars) { // Remove double shunzi
				pattern = pattern.replace(c, '').replace(c, '')
			}

			if (await checkPattern(pattern)) {
				count++
			} else {
				pattern = original
			}
		}
	}

	return count * FZ1
}

/**
 * ✅ 70. Mixed double shunzi (Xi xiangfeng, 喜相逢).
 * Containing two shunzi with same values but in different suits.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0, 1 or 2. Can occur twice in a hand.
 */
export async function fz70XiXiangfeng(struct) {
	const shuTypes = struct.shuTypes14.filter(item => item[1])
		.filter(item => item[1].length > 2).map(item => item[1]).flat()
	if (shuTypes.length < 2) return 0

	let patterns = []
	for (const d of [1, 2, 3, 4, 5, 6, 7]) {
		const pattern = new RegExp(`${d}+${d + 1}+${d + 2}+`)
		const match = shuTypes.filter(item => item.match(pattern))

		if (match.length >= 2) patterns.push([d, d + 1, d + 2])
	}

	if (!patterns.length) return 0

	let type
	let pass
	let count = 0
	for (const p of patterns) {
		pass = true
		for (const shuType of shuTypes) {
			type = shuType
			type = type.replace(p[0], '').replace(p[1], '').replace(p[2], '')

			if (!(type === '' || await checkPattern(type))) {
				pass = false
				continue
			}
		}

		if (pass) count++
	}

	return count * FZ1
}

/**
 * ✅ 71. Short straight (Lian liu, 连六).
 * Two shunzi in the same suit making six consecutive values.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0, 1 or 2. Can occur twice in a hand.
 */
export async function fz71LianLiu(struct) {
	const types = struct.allTypes14.map(item => item[1]).filter(item => item)

	let count = 0
	for (const type of types) {
		if ([6, 8, 9, 11, 12, 14].includes(type.length)) {
			if (type in lianliuLookup[`lianliu${type.length}`]) count++
		}
	}

	return count * FZ1
}

/**
 * ✅ 72. Two terminal shunzi (Laoshao fu, 老少副).
 * Two shunzi 1-2-3 and 7-8-9 in the same suit.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0, 1 or 2. Can occur twice in a hand.
 */
export async function fz72LaoshaoFu(struct) {
	const types = struct.allTypes14.map(item => item[1]).filter(item => item)

	let count = 0

	for (const type of types) {
		let laoshaofu = type

		while (laoshaofu.match(/1+2+3+7+8+9+/)) {
			for (const i of [1, 2, 3, 7, 8, 9]) { // Remove laoshaofu
				laoshaofu = laoshaofu.replace(`${i}`, '')
			}

			if (await checkPattern(laoshaofu)) count++
		}
	}

	return count * FZ1
}

/**
 * ✅ 73. Terminal kezi (Yao jiu ke, 幺九刻).
 * Single kezi (gangzi) of ones, nines, or winds.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0–4, one per terminal kezi.
 */
export async function fz73YaoJiuKe(struct) {
	let count = struct.allTypes14.filter(item => item[0] === 'f')
		.map(item => item[1].match(KEZI)).filter(item => item).flat().length

	const shu = struct.shuTypes14.map(item => item[1]).filter(item => item.length > 2)

	for (const shuType of shu) {
		let type = shuType

		// Qinglong special case
		if ([9, 11, 12, 14].includes(type.length)) {
			if (type in qinglongLookup[`qinglong${type.length}`]) {
				let temp = type
				for (let i = 1; i <= 9; i++) {
					temp = temp.replace(`${i}`, '')
				}

				if (await checkPattern(temp)) {
					const kezi = temp.match(/111|999/g) ?? []
					if (kezi.length === 0) return 0
				}
			}
		}

		const kezi = type.match(/111|999/g) ?? []

		for (const set of kezi) {
			let previousType = type
			type = type.replace(set, '')

			if (await checkPattern(type)) {
				count++
			} else {
				type = previousType
			}
		}
	}

	return count * FZ1
}

/**
 * ✅ 74. Melded gang (Minggang, 明杠).
 * Open gang.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 1.
 */
export async function fz74Minggang(struct) {
	const melds = struct.game.players[struct.key].melds
	const gang = melds.filter(item => item.type === 'gang').length

	return (gang === 1) ? FZ1 : 0
}

/**
 * ✅ 75. One voided suit (Que yi men, 缺一门).
 * Hand lacking one of the three suits.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 1.
 */
export async function fz75QueYiMen(struct) {
	const suits = struct.shuTypes14.filter(item => item[1])

	return (suits.length === 2) ? FZ1 : 0
}

/**
 * ✅ 76. No honors (Wu zi, 无字).
 * Hand with only suited tiles.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 1.
 */
export async function fz76WuZi(struct) {
	return struct.hasZi ? 0 : FZ1
}

/**
 * ✅ 77. Edge wait (Bianzhang, 边张).
 * Exclusively waiting for a 3 to form a shunzi 1-2-3, or for a 7 to form a shunzi 7-8-9.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 1.
 */
export async function fz77Bianzhang(struct) {
	// Winning tile, discarded or self-drawn.
	const hupai = struct.game.hupai
	if (![3, 7].includes(hupai[1])) return 0

	// Collect tiles at hand, minus zimo tile.
	let door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].zimo) door.pop()

	const inc = (hupai[1] === 3) ? -1 : 1

	// Find hupai ± 1, and remove it.
	let find = door.find(item => item[7] === hupai[7] && item[1] === hupai[1] + inc)
	if (!find) return 0
	let index = door.indexOf(find)
	door.splice(index, 1)

	// Find hupai ± 2, and remove it.
	find = door.find(item => item[7] === hupai[7] && item[1] === hupai[1] + 2 * inc)
	if (!find) return 0
	index = door.indexOf(find)
	door.splice(index, 1)

	// Probe remaining pattern, if ok hupai forms a shunzi.
	const pattern = door.filter(item => item[7] === hupai[7]).map(item => item[1]).join('')
	if (!await checkPattern(pattern)) return 0

	// Check if another tile could have made a winning hand.
	door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].zimo) door.pop()

	const seq = door.filter(item => item[7] === hupai[7]).map(item => item[1])
	if (![1, 2, 4, 5, 7, 8, 10, 11, 13].includes(seq.length)) return 0

	return (await tingpai(seq)) ? FZ1 : 0
}

/**
 * ✅ 78. Closed wait (Kanzhang, 坎张).
 * Exclusively waiting to form a shunzi from the middle value.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 1.
 */
export async function fz78Kanzhang(struct) {
	// Winning tile, discarded or self-drawn.
	const hupai = struct.game.hupai
	if ([1, 9].includes(hupai[1])) return 0

	// Collect tiles at hand, minus zimo tile.
	let door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].zimo) door.pop()

	// Find hupai + 1, and remove it.
	let find = door.find(item => item[7] === hupai[7] && item[1] === hupai[1] + 1)
	if (!find) return 0
	let index = door.indexOf(find)
	door.splice(index, 1)

	// Find hupai - 1, and remove it.
	find = door.find(item => item[7] === hupai[7] && item[1] === hupai[1] - 1)
	if (!find) return 0
	index = door.indexOf(find)
	door.splice(index, 1)

	// Probe remaining pattern, if ok hupai forms a shunzi.
	const pattern = door.filter(item => item[7] === hupai[7]).map(item => item[1]).join('')
	if (!await checkPattern(pattern)) return 0

	// Check if another tile could have made a winning hand.
	door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].zimo) door.pop()

	const seq = door.filter(item => item[7] === hupai[7]).map(item => item[1])
	if (![1, 2, 4, 5, 7, 8, 10, 11, 13].includes(seq.length)) return 0

	return (await tingpai(seq)) ? FZ1 : 0
}

/**
 * ✅ 79. Single wait (Dandiao jiang, 单调将).
 * Exclusively waiting for winning tile to form a pair.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 1.
 */
export async function fz79DandiaoJiang(struct) {
	// Winning tile, discarded or self-drawn.
	const hupai = struct.game.hupai

	// Collect tiles at hand, minus zimo tile.
	let door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].zimo) door.pop()

	// Find hupai equivalent, and remove it.
	const find = door.find(item => item[7] === hupai[7] && item[1] === hupai[1])
	if (!find) return 0

	const index = door.indexOf(find)
	door.splice(index, 1)

	// Probe remaining pattern, if ok hupai forms a pair.
	const pattern = door.filter(item => item[7] === hupai[7]).map(item => item[1]).join('')

	if (!await checkPattern(pattern)) return 0

	// If hupai is wind or honor, and it forms a pair, it can’t form anything else.
	if (ZI.includes(hupai[7])) return FZ1

	// Check if another tile could have made a winning hand.
	door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].zimo) door.pop()

	const seq = door.filter(item => item[7] === hupai[7]).map(item => item[1])
	if (![1, 2, 4, 5, 7, 8, 10, 11, 13].includes(seq.length)) return 0

	return (seq.length === 0 || await tingpai(seq)) ? FZ1 : 0
}

/**
 * ✅ 80. Self-drawn (Zimo, 自摸).
 * Winning by tile drawn from wall.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 1.
 */
export async function fz80Zimo(struct) {
	return (struct.game.players[struct.key].zimo) ? FZ1 : 0
}

/**
 * ✅ 81. Flower tiles (Huapai, 花牌).
 * Each bonus tile amounts to one fan when winning.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 1.
 */
export async function fz81Huapai(struct) {
	return struct.game.players[struct.key].flowers.length
}
