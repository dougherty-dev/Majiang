#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/checks
 */

import { newTile } from './tiles.js'
import { draw, hu } from './round/hu.js'
import { checkChi } from './melds/chi.js'
import { checkPeng } from './melds/peng.js'
import { checkJiagang } from './melds/jiagang.js'
import { checkAngang } from './melds/angang.js'
import { checkZimo } from './hu/zimo.js'
import { checkDianhu } from './hu/dianhu.js'

export async function newTileChecks(game, key) {
	if (await checkZimo(game)) {
		return await hu(game, key)
	}

	if (await checkJiagang(game)) {
		// if (await checkQianggang(game)) {
		// 	await hu()
		// 	return
		// }
		game.gangshangKaihua = true
		await newTile(game)
		game.gangshangKaihua = false
		return true
	}

	if (await checkAngang(game)) {
		game.gangshangKaihua = true
		await newTile(game)
		game.gangshangKaihua = false
		return true
	}

	return false
}

export async function dropTileChecks(game, tile, key) {
	const res = await checkDianhu(game, tile, key)
	if (res && await hu(game, res)) return true

	// melds
	switch (await checkPeng(game, tile)) {
	case 'gang':
		// if (await checkQianggang(game)) {
		// 	await hu()
		// 	return
		// }
		game.gangshangKaihua = true
		await newTile(game)
		game.gangshangKaihua = false
		return true
	case 'peng':
		return true
	}

	if (await checkChi(game, tile)) return true

	if (game.tiles.length === 0) {
		await draw(game)
		return true
	}

	return false
}
