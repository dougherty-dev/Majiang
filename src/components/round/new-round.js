#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/new-round
 * @description Prepare new round.
 * @property {function} newRound Set winds, rotate players.
 */

import { TILES } from '../../models/tiles.js'
import { determineSeatWinds } from '../../models/winds.js'
import { shuffle, sortTiles, zhuangjiaBanker } from '../helpers.js'
import { saveGame } from '../gameio.js'
import { replaceFlowers } from '../tiles.js'
import { displayPrevailingWind, displaySeatWinds } from '../display/winds.js'
import { displayDoors } from '../display/door.js'
import { gameOver } from './game-over.js'
import { cheat } from './test-cheat.js'
import { ALLPLAYERS } from '../../models/constants.js'
import { Player } from '../../models/players.js'

/**
 * Prepare new round. Set winds, rotate players.
 * @param {object} game The game parameters.
 * @returns {promise<boolean>}
 */
export async function newRound(game) {
	// Recycle players, but keep points and winds.
	for (const index of ALLPLAYERS) {
		const p = game.players[index]
		game.players[index] = new Player(p.points, p.wind).player
	}

	game.tiles = shuffle(Object.assign([], TILES))
	game.openTiles = []
	game.hupai = null
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
	game.winner = false
	game.draw = false

	const cheatOn = false
	if (cheatOn) {
		cheat(game)
	} else {
		for (const player of Object.values(game.players)) {
			for (let i = 1; i <= 13; i++) {
				const tile = game.tiles.shift()
				player.door.push(tile)
			}

			sortTiles(player.door, game.sorted)
		}
	}

	displayDoors(game.players)

	await replaceFlowers(game)
	await saveGame(game)

	return true
}
