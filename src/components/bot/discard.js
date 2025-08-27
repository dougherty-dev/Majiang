#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/bot/discard
 * @description Algorithms for computer players.
 * @property {Function} botDiscard Simple and efficient keep and discard scheme for bots.
 */

import { displayDiscarded } from '../display/tiles.js'
import { sortTiles, sound } from '../helpers.js'
import { TYPES, DUIZI, KEZI, HALFSHUNZI } from '../hu/patterns.js'

/**
 * Simple and efficient keep and discard scheme for bots.
 * Bots will peng and chi everything, in order to win on melded hand (53 全求人), 6 fan.
 * Zimo yields an additional fan, and the actual patterns will usually add to the score.
 * Bots will keep pairs and triplets, and also almost completed straights (12, 45, etc.).
 * Bots will discard everything else, starting with honors.
 * @param {Object} game The game parameters.
 */
export async function botDiscard(game) {
	const types = Object.assign([], TYPES)
	const door = game.players[game.currentPlayer].door
	let men = Object.assign([], door)
	sortTiles(men)

	let discard = []
	let keep = []
	for (const tile of Object.values(men)) {
		types[tile[7]] += tile[1]
	}

	for (const [key, type] of Object.entries(types).reverse()) {
		const pair = type.match(DUIZI)

		const triple = type.match(KEZI)
		const halfstraight = type.match(HALFSHUNZI)

		switch (true) {
		case type.length === 0:
			break
		case type.length === 1:
			discard.push([key, type])
			break
		case type.length === 2:
			if (pair) {
				keep.push([key, pair[0]])
			}
			break
		case type.length > 2:
			if (triple) {
				for (const item of triple) {
					keep.push([key, item])
				}
			}

			if (pair) {
				for (const item of pair) {
					keep.push([key, item])
				}
			}

			if (halfstraight) {
				for (const item of halfstraight) {
					keep.push([key, item])
				}
			}
			break
		}
	}

	let tiles = []
	for (const value of Object.values(keep)) {
		for (const char of value[1].split('')) {
			tiles.push([value[0], char])
		}
	}

	for (const tile of Object.values(door)) {
		const ix = tiles.findIndex(elem => elem[0] == tile[7] && elem[1] == tile[1])
		if (ix === -1) {
			discard.push([tile[7], tile[1]])
		}
	}

	let index = -1
	if (discard.length) {
		index = door.findIndex(elem => elem[7] == discard[0][0] && elem[1] == discard[0][1])
	}

	displayDiscarded(game.currentPlayer, door.at(index))
	game.players[game.currentPlayer].discarded = true
	game.players[game.currentPlayer].drop = door.at(index)
	door.splice(index, 1)
	sound('snd/clack.m4a')
}
