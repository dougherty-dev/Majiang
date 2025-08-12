#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong64
 */

import { ZI } from '../tiles.js'

const FZ64 = 64

// 11. All honors (Zi yi se, 字一色)
export async function fz11ZiYiSe(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const zi = melds.filter(item => ZI.includes(item[0]))

	return (zi.length === 5) ? FZ64 : 0
}
