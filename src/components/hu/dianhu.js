#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/dianhu
 */

import { ALLPLAYERS } from '../../models/constants.js'
import { sortTiles } from '../helpers.js'
import { hu } from '../round/hu.js'
import { checkHu } from './hu.js'

export async function checkDianhu(game, tile, key) {
	const players = ALLPLAYERS.filter(item => item !== key)

	const rotate = (arr, position) =>
		Array.from(arr, (_, index) => arr[(index + position) % arr.length])

	for (const index of rotate(players, key - 1)) {
		let player = game.players[index]

		const door = Object.assign([], player.door)
		door.push(tile)
		sortTiles(door)

		if (await checkHu(player, door)) {
			player.hu.dianhu = true
			game.hupai = tile
			game.winner = index
			if (await hu(game, index)) return true
		}
	}

	return false
}
