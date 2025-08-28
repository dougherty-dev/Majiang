#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/checks
 * @description Probe actions on new tile and discard tile.
 * @property {function} newTileChecks Checks on new tile.
 * @property {function} dropTileChecks Checks on discarded tile.
 */

import { newTile } from './tiles.js'
import { draw, hu } from './round/hu.js'
import { checkChi } from './melds/chi.js'
import { checkPeng } from './melds/peng.js'
import { checkJiagang } from './melds/jiagang.js'
import { checkAngang } from './melds/angang.js'
import { checkZimo } from './hu/zimo.js'
import { checkDianhu } from './hu/dianhu.js'

/**
 * Checks on new tile.
 * @param {object} game The game parameters.
 * @param {number} key Player number.
 * @returns {promise<boolean>}
 */
export async function newTileChecks(game, key) {
	if (await checkZimo(game)) {
		return await hu(game, key)
	}

	const tile = await checkJiagang(game)
	if (tile) {
		// Check for qianggang.
		if (await checkDianhu(game, tile, key)) return true

		return await newTile(game)
	}

	if (await checkAngang(game)) {
		game.players[game.currentPlayer].gangshangKaihua = 1
		return await newTile(game)
	}

	return false
}

/**
 * Checks on discarded tile.
 * @param {object} game The game parameters.
 * @param {object} tile The discarded tile.
 * @param {number} key Player number.
 * @returns {promise<boolean>}
 */
export async function dropTileChecks(game, tile, key) {
	if (await checkDianhu(game, tile, key)) return true

	switch (await checkPeng(game, tile)) {
	case 'gang':
		game.players[game.currentPlayer].gangshangKaihua = 1
		return await newTile(game)
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
