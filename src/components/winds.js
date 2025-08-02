#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/wind
 */

import { modIncrease, rot4 } from './helpers.js'

export async function determineSeatWinds(players, round) {
	const east = Object.values(players).findIndex(obj => obj.wind === 1)

	let south, west, north

	switch (round) {
	case 1:
		for (const key of Object.keys(players)) {
			players[key].wind = modIncrease(players[key].wind + 2)
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
