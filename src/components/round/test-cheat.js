#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/test-cheat
 */

import { sortTiles } from '../helpers.js'

export async function cheat(game) {
	/**
	 * Cheat mode
	 */

	const tiles = [
		'bing2',
		'bing3',
		'bing4',
		'bing1',
		'bing1',
		'bing1',
		'bing5',
		'bing6',
		'bing7',
		'bing8',
		'bing9',
		'bing9',
		'bing9',
	]

	for (const tile of tiles) {
		game.players[4].door.push(game.tiles.splice(game.tiles.findIndex(item => item[2] === tile), 1)[0])
	}

	for (const [key, player] of Object.entries(game.players)) {
		if (key == 4) continue
		for (let i = 1; i <= 13; i++) {
			const tile = game.tiles.shift()
			player.door.push(tile)
		}

		sortTiles(player.door, game.sorted)
	}
}
