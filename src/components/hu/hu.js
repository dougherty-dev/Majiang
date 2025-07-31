#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/hu
 */

import { sortTiles } from '../helpers.js'

export async function checkZimo(game) {
	const door = Object.assign([], game.players[game.currentPlayer].door)
	sortTiles(door)

	const melds = []
	for (const meld of game.players[game.currentPlayer].melds) {
		melds.push(meld.type)
	}

	let values = []
	for (const tile of door) {
		values.push(tile[7] + tile[1])
	}

	// const map = values.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())

	return false
}
