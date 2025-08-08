#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 */

const FZ6 = 6

// 54. Two dragons kezi (Shuang jianke, 双箭刻)
export async function fz54ShuangJianke(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi

	let count = 0
	for (const type of kezi) {
		if (type[0] === 'j') {
			count++
			if (count === 2) return FZ6
		}
	}

	return 0
}
