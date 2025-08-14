#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 */

import { SHIFTEDAX3, SHIFTEDBX3, TYPES } from '../../components/hu/patterns.js'
import { BING, SHU, TIAO, WAN } from '../tiles.js'

const FZ16 = 16

// 28. Pure straight (Qing long, 清龙)
export async function fz28QingLong(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	for (const type of SHU) {
		const suit = shunzi.filter(item => item[0] === type).map(item => `${item[1]}`)

		if (
			suit.length >= 3 &&
			suit.includes('123') &&
			suit.includes('456') &&
			suit.includes('789')
		) return FZ16
	}

	return 0
}

// Not satisfactory, rewrite
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

// 32. Triple kezi (San tongke, 三同刻)
export async function fz32SanTongke(struct) {
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
