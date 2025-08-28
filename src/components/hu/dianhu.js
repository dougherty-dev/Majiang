#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/dianhu
 * @description Decide whether player wins by taking discarded tile.
 * @property {function} checkDianhu Check if any player wins using a discarded tile.
 */

import { ALLPLAYERS } from '../../models/constants.js'
import { sortTiles } from '../helpers.js'
import { hu } from '../round/hu.js'
import { checkHu } from './hu.js'

/**
 * 
 * @param {object} game The game parameters.
 * @param {object} tile The discarded tile.
 * @param {number} key Discarding player number.
 * @returns {promise<boolean>}
 */
export async function checkDianhu(game, tile, key) {
	const players = ALLPLAYERS.filter(item => item !== key)

	const rotate = (arr, position) =>
		Array.from(arr, (_, index) => arr[(index + position) % arr.length])

	for (const index of rotate(players, key - 1)) {
		const player = game.players[index]
		player.dianhu = false

		const door = Object.assign([], player.door)
		door.push(tile)
		sortTiles(door)

		if (await checkHu(player, door)) {
			player.dianhu = true
			game.hupai = tile
			game.winner = index
			if (await hu(game, index)) return true
		}
	}

	return false
}
