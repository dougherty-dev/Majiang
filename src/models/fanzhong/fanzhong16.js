#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 */

import { SHIFTEDAX3, SHIFTEDBX3 } from '../../components/hu/patterns.js'

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

// 32. Triple kezi (San tong ke, 三同刻)
export async function fz32SanTongKe(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	const melds = [...kezi, ...gangzi]

	const suited = melds.filter(item => SHU.includes(item[0]))
	const reduced = suited.map(item => item[1][0])
	const set = [...new Set(reduced)]

	return (set.length === 3 && set.length === reduced.length) ? 0 : FZ16
}
