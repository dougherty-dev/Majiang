#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong24
 */

import { SHU } from '../tiles.js'
import { DUIZI } from '../../components/hu/patterns.js'

const FZ24 = 24

// 19. Seven pairs (Qi dui, 七对)
export async function fz19QiDui(struct) {
	let pairs = 0
	for (const type of Object.values(struct.types)) {
		const pair = type.match(DUIZI)
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
