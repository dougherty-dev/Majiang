#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/wind
 */

import { getRandomInt, rot4 } from './helpers.js'

function findEast(players, round) {
	return (() => {
		switch (round) {
		case 1:
			return getRandomInt(1, 4)
		default:
			return Object.entries(players).findIndex(obj => { return obj.wind === 1 })
		}
	})()
}

export async function determineSeatWinds(players, round) {
	const east = findEast(players, round)

	let south, west, north

	switch (round) {
	case 1:
		for (let [key, player] of Object.entries(players)) {
			key = parseInt(key)
			player.wind = rot4(east, key)
			player.turn = east === key
		}
		break
	case 2:
		;[south, west, north] = [rot4(east, 1), rot4(east, 2), rot4(east, 3)]
		;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
			[players[south].wind, players[east].wind, players[north].wind, players[west].wind]
		break
	case 3:
		;[north, west, south] = [rot4(east, 1), rot4(east, 2), rot4(east, 3)]
		;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
			[players[west].wind, players[north].wind, players[south].wind, players[east].wind]
		break
	case 4:
		;[west, north, south] = [rot4(east, 1), rot4(east, 2), rot4(east, 3)]
		;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
			[players[south].wind, players[east].wind, players[north].wind, players[west].wind]
		break
	}
}
