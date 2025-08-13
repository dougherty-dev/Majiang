#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong32
 */

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
