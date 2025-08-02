#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/zimo
 */

import { sortTiles } from '../helpers.js'
import { checkHu } from './hu.js'

export async function checkZimo(game) {
	let player = game.players[game.currentPlayer]

	const door = Object.assign([], player.door)
	sortTiles(door)

	if (await checkHu(player, door)) {
		player.hu.zimo = true
		return true
	}

	return false
}
