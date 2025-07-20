#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Players
 */

import { getRandomInt, mod4 } from './helpers.js'

class Player {
	constructor() {
		this.player = {
			points: 0,
			wind: null,
			tingpai: false,
			discarded: false,
			door: [],
			melds: [],
			flowers: [],
			floor: []
		}
	}
}

export default class Players {
	constructor() {
		this.players = {
			1: new Player().player,
			2: new Player().player,
			3: new Player().player,
			4: new Player().player
		}
	}

	findEast(round) {
		return (() => {
			switch (round) {
			case 1:
				return getRandomInt(1, 4)
			default:
				return this.players.findIndex(obj => { return obj.wind === 1 })
			}
		})()
	}

	determineSeatWinds(round) {
		const players = this.players
		const east = this.findEast(round)

		let south, west, north

		switch (round) {
		case 1:
			for (const [key, player] of Object.entries(players)) {
				player.wind = mod4(east, parseInt(key))
			}
			break
		case 2:
			;[south, west, north] = [mod4(east, 1), mod4(east, 2), mod4(east, 3)]
			;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
				[players[south].wind, players[east].wind, players[north].wind, players[west].wind]
			break
		case 3:
			;[north, west, south] = [mod4(east, 1), mod4(east, 2), mod4(east, 3)]
			;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
				[players[west].wind, players[north].wind, players[south].wind, players[east].wind]
			break
		case 4:
			;[west, north, south] = [mod4(east, 1), mod4(east, 2), mod4(east, 3)]
			;[players[east].wind, players[south].wind, players[west].wind, players[north].wind] =
				[players[south].wind, players[east].wind, players[north].wind, players[west].wind]
			break
		}
	}
}
