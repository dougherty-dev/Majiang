#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong24
 */

import { SHU } from '../tiles.js'
import { DUIZI, KEZI, TYPES } from '../../components/hu/patterns.js'

const FZ24 = 24

// 19. Seven pairs (Qi dui, 七对)
export async function fz19QiDui(struct) {
	let pairs = 0
	for (const type of Object.values(struct.types)) {
		const pair = type.match(DUIZI) && !type.match(KEZI)
		if (pair) pairs += pair.length
	}

	if (pairs === 7) {
		// reset and rearrange
		struct.game.players[struct.key].hu.allMelds = []
		struct.game.players[struct.key].hu.duizi = []
		struct.game.players[struct.key].hu.shunzi = []
		struct.game.players[struct.key].hu.kezi = []
		struct.game.players[struct.key].hu.gangzi = []

		for (const [index, tile] of Object.entries(struct.tiles)) {
			if (index % 2 !== 0) continue
			const set = [tile[7], `${tile[1]}${tile[1]}`]
			struct.game.players[struct.key].hu.duizi.push(set)
			struct.game.players[struct.key].hu.allMelds.push(set)
		}

		return FZ24
	}

	return 0
}

// 20. Greater honors and knitted tiles (Qi xing bu kao, 七星不靠)
export async function fz20QiXingBuKao(struct) {
	const hu = struct.game.players[struct.key].hu

	return (hu.isKnitted && hu.isGreaterHonors) ? FZ24 : 0
}

// 21. All even kezi (Quan shuang ke, 全双刻)
export async function fz21QuanShuangKe(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const shu = melds.filter(item => SHU.includes(item[0]))
	const even = shu.filter(item => ['2', '4', '6', '8'].includes(item[1][0]))

	return (even.length === 5) ? FZ24 : 0
}

// 22. Full flush (Qing yi se, 清一色)
export async function fz22QingYiSe(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds

	if (
		melds.length &&
		SHU.includes(melds[0][0]) &&
		melds.every((type) => type[0] === melds[0][0])
	) {
		return FZ24
	}

	return 0
}

// 23. Pure triple shunzi (Yi se san tongshun, 一色三同顺)
export async function fz23YiSeSanTongshun(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	const occurrences = Object.values(shunzi.reduce((acc, curr) => {
		acc[curr] = (acc[curr] || 0) + 1
		return acc
	}, {}))

	const count = occurrences.filter(item => item === 3)

	return (count.length) ? FZ24 : 0
}

// 24. Pure shifted kezi (Yi se san jie gao, 一色三节高)
// Only with actual melds, otherwise 23 (same sorted pattern)
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

// 25. Upper tiles (Quan da, 全大)
export async function fz25QuanDa(struct) {
	const upper = struct.tiles.filter(item => SHU.includes(item[7]) && [7, 8, 9].includes(item[1]))

	return (upper.length >= 14) ? FZ24 : 0
}

// 26. Middle tiles (Quan zhong, 全中)
export async function fz26QuanZhong(struct) {
	const middle = struct.tiles.filter(item => SHU.includes(item[7]) && [4, 5, 6].includes(item[1]))

	return (middle.length >= 14) ? FZ24 : 0
}

// 27. Lower tiles (Quan xiao, 全小)
export async function fz27QuanXiao(struct) {
	const lower = struct.tiles.filter(item => SHU.includes(item[7]) && [1, 2, 3].includes(item[1]))

	return (lower.length >= 14) ? FZ24 : 0
}
