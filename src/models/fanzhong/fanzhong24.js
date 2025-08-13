#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong24
 */

import { SHU } from '../tiles.js'

const FZ24 = 24

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
