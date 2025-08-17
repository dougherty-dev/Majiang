#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/test-cheat
 */

import { sortTiles } from '../helpers.js'

/**
 * Test hands by assigning tiles to human player.
 * @param {Object} game The game parameters.
 */
export async function cheat(game) {
	// 88 fan
	// const tiles = ['zi1', 'zi1', 'zi1', 'zi3', 'zi3', 'zi3', 'zi2', 'zi2', 'zi4', 'zi2', 'zi4', 'zi4', 'bing8'] // 1
	// const tiles = ['zi5', 'zi5', 'zi5', 'zi6', 'zi6', 'zi6', 'tiao1', 'tiao2', 'tiao3', 'zi7', 'zi7', 'zi7', 'bing8'] // 2
	// const tiles = ['tiao8', 'tiao8', 'tiao8', 'tiao2', 'tiao3', 'tiao4', 'tiao2', 'tiao3', 'tiao4', 'zi6', 'zi6', 'tiao2', 'tiao3'] // 3
	// const tiles = ['tiao8', 'tiao8', 'tiao8', 'tiao2', 'tiao3', 'tiao4', 'tiao2', 'tiao3', 'tiao4', 'tiao6', 'tiao6', 'tiao2', 'tiao3'] // 3
	// const tiles = ['wan1', 'wan1', 'wan1', 'wan2', 'wan3', 'wan4', 'wan5', 'wan6', 'wan7', 'wan8', 'wan9', 'wan9', 'wan9'] // 4
	// const tiles = ['zi5', 'zi5', 'zi5', 'zi5', 'wan3', 'wan3', 'wan3', 'bing2', 'bing2', 'bing2', 'bing2', 'tiao1', 'tiao1'] // 5
	// const tiles = ['bing2', 'bing2', 'bing3', 'bing3', 'bing5', 'bing5', 'bing4', 'bing4', 'bing7', 'bing6', 'bing6', 'bing8', 'bing7'] // 6
	const tiles = ['bing1', 'bing9', 'tiao1', 'tiao9', 'wan9', 'wan1', 'zi1', 'zi2', 'zi3', 'zi4', 'zi5', 'zi6', 'zi7'] // 7

	// 64 fan

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

