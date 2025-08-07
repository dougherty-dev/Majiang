#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/dianhu
 */

import { ALLPLAYERS } from '../../models/constants.js'
import { sortTiles } from '../helpers.js'
import { checkHu } from './hu.js'

export async function checkDianhu(game, tile, key) {
	const players = ALLPLAYERS.filter(item => item !== key)

	for (const index of players) {
		let player = game.players[index]

		const door = Object.assign([], player.door)
		door.push(tile)
		sortTiles(door)

		if (await checkHu(player, door)) {
			player.hu.dianhu = true
			return index
		}
	}

	return false
}
