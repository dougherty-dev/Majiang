#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 */

import { JIAN } from '../tiles.js'

const FZ6 = 6

// 54. Two dragons kezi (Shuang jianke, 双箭刻)
export async function fz54ShuangJianke(struct) {
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

// 49. All kezi (Pengpeng hu, 碰碰和)
export async function fz49PengpengHu(struct) {
	const hu = struct.game.players[struct.key].hu
	if (hu.kezi.length + hu.gangzi.length === 4) return FZ6

	return 0
}
