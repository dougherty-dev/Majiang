#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/winds
 * @description Wind definitions.
 * @property {function} determineSeatWinds Determine seat winds for all players.
 */

import { modIncrease } from '../components/helpers.js'

const E = 1
const S = 2
const W = 3
const N = 4

const SEATWINDS = [
	[
		[E, S, W, N],
		[N, E, S, W],
		[W, N, E, S],
		[S, W, N, E]
	],
	[
		[S, E, N, W],
		[W, S, E, N],
		[N, W, S, E],
		[E, N, W, S]
	],
	[
		[N, W, E, S],
		[S, N, W, E],
		[E, S, N, W],
		[W, E, S, N]
	],
	[
		[W, N, S, E],
		[E, W, N, S],
		[S, E, W, N],
		[N, S, E, W]
	]
]

/**
 * Determine seat winds for all players, using lookup matrix.
 * @param {object} game The game parameters.
 */
export async function determineSeatWinds(game) {
	for (const [key, players] of Object.entries(game.players)) {
		const wind = SEATWINDS[game.round - 1][game.rotation - 1][key - 1]
		players.wind = modIncrease(wind + game.windShifter)
	}
}
