#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong32
 */

import { TYPES } from '../../components/hu/patterns.js'

const FZ48 = 48

// 14. Quadruple shunzi (Yi se si tongshun, 一色四同顺)
export async function fz14YiSeSiTongshun(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	const occurrences = Object.values(shunzi.reduce((acc, curr) => {
		acc[curr] = (acc[curr] || 0) + 1
		return acc
	}, {}))

	const count = occurrences.filter(item => item === 4)

	return (count.length) ? FZ48 : 0
}

// 15. Four pure shifted kezi (Yi se si jie gao, 一色四节高)
export async function fz15YiSeSiJieGao(struct) {
	const pattern = /(111222333444|222333444555|333444555666|444555666777|555666777888|666777888999)/g
	const melds = struct.game.players[struct.key].hu.allMelds
	const triples = melds.filter(item => item[1].length > 2)

	const types = Object.assign({}, TYPES)

	for (const tile of triples) {
		types[tile[0]] += tile[1]
	}

	struct.meldTypes = types

	const reduced = Object.values(types).filter(item => item.length === 12)

	if (reduced.length) {
		const sorted = reduced[0].split('').sort().join('')
		return (sorted.match(pattern)) ? FZ48 : 0
	}

	return 0
}
