#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 */

import { SHIFTEDAX3, SHIFTEDBX3 } from '../../components/hu/patterns.js'
import { SHU } from '../tiles.js'

const FZ16 = 16

// 30. Pure shifted shunzi (Yi se san bu gao, 一色三步高)
export async function fz30YiSeSanBuGao(struct) {
	const hu = struct.game.players[struct.key].hu

	for (const type of Object.values(hu.types)) {
		if (type.match(SHIFTEDAX3) || type.match(SHIFTEDBX3)) {
			return FZ16
		}
	}

	return 0
}

// 31. All fives (Quan dai wu, 全带五)
export async function fz31QuanDaiWu(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const quandaiwu = melds.filter(item => item[1].includes('5'))

	return (quandaiwu.length === 5) ? FZ16 : 0
}

// 32. Triple kezi (San tong ke, 三同刻)
export async function fz32SanTongKe(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	const melds = [...kezi, ...gangzi]

	const suited = melds.filter(item => SHU.includes(item[0]))
	const reduced = suited.map(item => item[1][0])
	const set = [...new Set(reduced)]

	return (reduced.length === 3 && set.length === 1) ? FZ16 : 0
}

// 33. Three concealed kezi (San anke, 三暗刻)
export async function fz33SanAnke(struct) {
	return (struct.concealedKezi === 3) ? FZ16 : 0
}
