#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong24
 */

import { SHU } from '../tiles.js'

const FZ24 = 24

// 22. Full flush (Qing yi se, 清一色):
export async function fz22QingYiSe(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds

	if (
		melds.length &&
		SHU.includes(melds[0][0]) &&
		melds.every((type) => type[0] === melds[0][0])
	) {
		return FZ24
	}

	return 0
}
