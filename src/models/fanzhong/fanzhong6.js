#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 */

import { JIAN } from '../tiles.js'

const FZ6 = 6

// 54. Two dragons kezi (Shuang jianke, 双箭刻)
export async function fz54ShuangJianke(struct) {
	if (struct.game.players[struct.key].hu.melds !== 5) return 0

	const kezi = struct.game.players[struct.key].hu.kezi

	let count = 0
	for (const type of kezi) {
		if (type[0] === JIAN) {
			count++
			if (count === 2) return FZ6
		}
	}

	return 0
}
