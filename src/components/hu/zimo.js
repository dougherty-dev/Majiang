#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/zimo
 * @description Decide whether player wins by taking tile from wall.
 * @property {function} checkZimo Check if current player wins by self-draw.
 */

import { sortTiles } from '../helpers.js'
import { checkHu, resetPlayerVars } from './hu.js'

/**
 * Check if current player wins by self-draw.
 * @param {object} game The game parameters.
 * @returns {promise<boolean>}
 */
export async function checkZimo(game) {
	const player = game.players[game.currentPlayer]
	player.zimo = false

	const door = Object.assign([], player.door)
	const tile = door.at(-1)
	sortTiles(door)

	if (await checkHu(player, door)) {
		if (player.gangshangKaihua === 1) { // Out with replacement tile.
			player.gangshangKaihua = 2 // Potential is realized.
		}
		player.zimo = true
		game.hupai = tile
		game.winner = game.currentPlayer
		return true
	}

	player.gangshangKaihua = 0 // Reset potential.
	await resetPlayerVars(player)

	return false
}
