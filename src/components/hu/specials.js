#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/specials
 */

import { DUIZI } from './patterns.js'

export async function checkSpecial(player, door, types) {
	// either seven pairs, or just one
	let pairs = 0
	for (const type of Object.values(types)) {
		const pair = type.match(DUIZI)
		if (pair) pairs += pair.length
	}

	if (pairs === 7) {
		player.hu.pairs = 7
		for (const tile of door) {
			player.hu.duizi.push(tile)
		}

		return true
	}

	// 13 orphans
	if (
		player.hu.values.length === 5 &&
		/^[19]+$/.test(types.b) &&
		/^[19]+$/.test(types.t) &&
		/^[19]+$/.test(types.w) &&
		/^[1234]+$/.test(types.f) &&
		/^[123]+$/.test(types.j)
	) {
		player.hu.shisanyao = true
		return true
	}

	return false
}
