#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong88
 */

import { FENG, JIAN } from '../tiles.js'

const FZ88 = 88

// 1. Big four winds (Da si xi, 大四喜)
export async function fz1DaSiXi(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi

	if (
		kezi.length + gangzi.length === 4
		&& kezi.every((type) => type[0] === FENG)
		&& gangzi.every((type) => type[0] === FENG)
	) {
		return FZ88
	}

	return 0
}

// 2. Big three dragons (Da san yuan, 大三元)
export async function fz2DaSanYuan(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi

	const types = [...kezi.map(item => item[0]), ...gangzi.map(item => item[0])]
	const count = types.filter(item => item === JIAN).length

	if (count === 3) return FZ88

	return 0
}
