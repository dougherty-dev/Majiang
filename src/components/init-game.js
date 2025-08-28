#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/new-game
 * @description Initialize and play game.
 * @property {function} initGame Setup game.
 */

import { VERSION } from '../config.js'
import { randInt } from './helpers.js'
import { determineSeatWinds } from '../models/winds.js'
import { newRound } from '../components/round/new-round.js'
import { play } from './play.js'
import Players from '../models/players.js'

/**
 * Setup game.
 * @param {object} game The game parameters.
 */
export async function initGame(game) {
	game = {
		version: VERSION,
		active: true,
		round: 1,
		rotation: 1,
		hand: 0,
		prevailingWind: 1,
		windShifter: randInt(1, 4),
		currentPlayer: null,
		tiles: [],
		openTiles: [],
		hupai: [],
		sorted: false,
		draw: false,
		winner: false,
		qianggang: false,
		drop: [null, null],
		players: new Players().players
	}

	await determineSeatWinds(game)
	await newRound(game)

	play(game)
}
