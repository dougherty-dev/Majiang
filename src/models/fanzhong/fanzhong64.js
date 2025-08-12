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

// 12. Four concealed kezi (Si anke, 四暗刻)
export async function fz12SiAnke(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	const kegang = [...kezi, ...gangzi]

	const melds = struct.game.players[struct.key].melds
	const gang = melds.filter(item => item.type === 'gang')

	// Save result for:
	// 33. Three concealed kezi (San anke, 三暗刻)
	// 66. Two concealed kezi (Shuang anke, 双暗刻)
	struct.concealedKezi = kegang.length - gang.length

	return (struct.concealedKezi === 4) ? FZ64 : 0
}
