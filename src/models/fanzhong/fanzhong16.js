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
