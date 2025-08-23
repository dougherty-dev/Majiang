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

	const tile = await checkJiagang(game)
	if (tile) {
		/**
		 * Check for qianggang.
		 */
		if (await checkDianhu(game, tile, key)) return true

		await newTile(game)
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
	// console.log('-----')
	// console.log('1. dropTileChecks: await checkDianhu')
	if (await checkDianhu(game, tile, key)) return true

	// melds
	// console.log('2. dropTileChecks: await checkPeng')
	switch (await checkPeng(game, tile)) {
	case 'gang':
		game.gangshangKaihua = true
		await newTile(game)
		game.gangshangKaihua = false
		return true
	case 'peng':
		return true
	}

	// console.log('3. dropTileChecks: await checkChi')
	if (await checkChi(game, tile)) return true

	// console.log('4. dropTileChecks: tiles.length === 0?')
	if (game.tiles.length === 0) {
		// console.log('dropTileChecks: await draw')
		await draw(game)
		return true
	}

	return false
}
