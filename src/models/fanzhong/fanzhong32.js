#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong32
 */

import { DUIZI } from '../../components/hu/patterns.js'

const FZ32 = 32

// 17. Three gangs (San gang, 三杠)
export async function fz17SanGang(struct) {
	return (struct.game.players[struct.key].hu.gangzi.length === 3) ? FZ32 : 0
}

// 19. Seven pairs (Qi dui, 七对)
export async function fz19QiDui(struct) {
	let pairs = 0
	for (const type of Object.values(struct.types)) {
		const pair = type.match(DUIZI)
		if (pair) pairs += pair.length
	}

	if (pairs === 7) {
		// reset and rearrange
		struct.game.players[struct.key].hu.allMelds = []
		struct.game.players[struct.key].hu.duizi = []
		struct.game.players[struct.key].hu.shunzi = []
		struct.game.players[struct.key].hu.kezi = []
		struct.game.players[struct.key].hu.gangzi = []

		for (const [index, tile] of Object.entries(struct.tiles)) {
			if (index % 2 !== 0) continue
			const set = [tile[7], `${tile[1]}${tile[1]}`]
			struct.game.players[struct.key].hu.duizi.push(set)
			struct.game.players[struct.key].hu.allMelds.push(set)
		}

		return FZ32
	}

	return 0
}
