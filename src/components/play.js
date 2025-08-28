#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/play
 * @description Play a hand.
 * @property {function} play The V7 game engine.
 */

import { observeDrop } from './observers/observe-drop.js'
import { observeNewTile } from './observers/observe-new-tile.js'
import { newTile } from './tiles.js'
import { layoutGame } from './display/display.js'

/**
 * The V7 game engine.
 * Define two MutationObservers pingponging each other (or 4 + 3 instances).
 * Draw a tile, and the game is on.
 * @param {object} game
 */
export async function play(game) {
	if (!game) return

	await layoutGame(game)
	observeDrop(game)
	observeNewTile(game)
	newTile(game)
}
