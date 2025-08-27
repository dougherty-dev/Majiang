#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/zimo
 */

import { sortTiles } from '../helpers.js'
import { checkHu } from './hu.js'

export async function checkZimo(game) {
	const player = game.players[game.currentPlayer]

	const door = Object.assign([], player.door)
	const tile = door.at(-1)
	sortTiles(door)

	if (await checkHu(player, door)) {
		player.zimo = true
		game.hupai = tile
		game.winner = game.currentPlayer
		return true
	}

	return false
}
