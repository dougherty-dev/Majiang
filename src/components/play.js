#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/play
 */

import { observeDrop } from './observers/observe-drop.js'
import { observeNewTile } from './observers/observe-new-tile.js'
import { newTile } from './tiles.js'

/**
 * 
 * @param {Object} game
 * @description The game engine.
 * 
 * Define two MutationObservers pingponging each other.
 * Draw a tile, and the game is on.
 */
export async function play(game) {
	observeDrop(game)
	observeNewTile(game)
	newTile(game)
}
