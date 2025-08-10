#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/specials
 */

import { DUIZI } from './patterns.js'

// These hands have no melds
export async function checkSpecial(player, door) {
	// either seven pairs, or just one
	let pairs = 0
	for (const type of Object.values(player.hu.types)) {
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
	const values = Object.values(player.hu.types).filter(item => item !== '')
	if (
		values.length === 5 &&
		['19'].every(n => player.hu.types.b.includes(n)) &&
		['19'].every(n => player.hu.types.t.includes(n)) &&
		['19'].every(n => player.hu.types.w.includes(n)) &&
		['1234'].every(n => player.hu.types.f.includes(n)) &&
		['123'].every(n => player.hu.types.j.includes(n))
	) {
		player.hu.shisanyao = true
		return true
	}

	return false
}
