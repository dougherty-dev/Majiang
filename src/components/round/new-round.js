#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/new-round
 */

import { TILES } from '../../models/tiles.js'
import { determineSeatWinds } from '../../models/winds.js'
import { shuffle, sortTiles, zhuangjiaBanker } from '../helpers.js'
import { saveGame } from '../gameio.js'
import { replaceFlowers } from '../tiles.js'
import { displayPrevailingWind, displaySeatWinds } from '../display/winds.js'
import { displayDoors } from '../display/door.js'
import { gameOver } from './game-over.js'

export async function newRound(game) {
	game.tiles = shuffle(Object.assign([], TILES))
	game.hand++

	if (game.winner && game.players[game.winner].wind !== 1) {
		game.rotation++
	}

	if (game.rotation > 4) {
		game.round++
		game.rotation = 1
		game.hand = 1
		game.prevailingWind++
	}

	if (game.round > 4) {
		await gameOver(game)
		return false
	}

	if (game.winner && game.players[game.winner].wind !== 1) {
		await determineSeatWinds(game)
	}

	displaySeatWinds(game.players, game.prevailingWind)
	displayPrevailingWind(game.prevailingWind)

	game.currentPlayer = zhuangjiaBanker(game.players)
	game.winner = null
	game.draw = null

	/**
	 * Cheat mode
	 */

	// const tiles = [
	// 	'zi5',
	// 	'zi5',
	// 	'zi5',
	// 	'zi5',
	// 	'wan2',
	// 	'wan2',
	// 	'wan2',
	// 	'tiao8',
	// 	'tiao8',
	// 	'tiao8',
	// 	'bing3',
	// 	'bing3',
	// 	'bing3',
	// ]

	// for (const tile of tiles) {
	// 	game.players[4].door.push(game.tiles.splice(game.tiles.findIndex(item => item[2] === tile), 1)[0])
	// }

	// for (const [key, player] of Object.entries(game.players)) {
	// 	if (key == 4) continue
	// 	for (let i = 1; i <= 13; i++) {
	// 		const tile = game.tiles.shift()
	// 		player.door.push(tile)
	// 	}

	// 	sortTiles(player.door, game.sorted)
	// }

	for (const player of Object.values(game.players)) {
		for (let i = 1; i <= 13; i++) {
			const tile = game.tiles.shift()
			player.door.push(tile)
		}

		sortTiles(player.door, game.sorted)
	}

	displayDoors(game.players)

	await replaceFlowers(game)
	await saveGame(game)

	return true
}
