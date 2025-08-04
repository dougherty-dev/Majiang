#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/checks
 */

import { checkZimo } from './hu/zimo.js'
import { checkJiagang } from './melds/jiagang.js'
import { checkAngang } from './melds/angang.js'
import { newTile } from './tiles.js'
import { hu } from './round/hu.js'

export async function newTileChecks(game, key) {
	if (await checkZimo(game)) {
		await hu(game, key)
		return true
	}

	if (await checkJiagang(game)) {
		// if (await checkQianggang(game)) {
		// 	await hu()
		// 	return
		// }
		await newTile(game)
		return true
	}

	if (await checkAngang(game)) {
		await newTile(game)
		return true
	}

	return false
}
