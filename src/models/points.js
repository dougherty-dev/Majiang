#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/points
 */

const EXTRAPOINTS = 8

import { ALLPLAYERS } from './tiles.js'
import { fz76wuzi, fz80zimo, fz81huapai } from './fanzhong/fanzhong1.js'

export default class Points {
	constructor(game, key, door) {
		this.struct = {
			game: game,
			key: key,
			door: door
		}
		this.points = 0
		this.fanzhong = {
			76: ['无字', 'Wuzi', 'No honors', fz76wuzi, 0],
			80: ['自摸', 'Zimo', 'Self-drawn', fz80zimo, 0],
			81: ['花牌', 'Huapai', 'Flower tiles', fz81huapai, 0],
		}
	}

	sumPoints(game, key) {
		const players = ALLPLAYERS.filter(item => item !== key)

		if (this.struct.game.winner) {
			for (const index of players) {
				game.players[key].points += EXTRAPOINTS
				game.players[index].points -= EXTRAPOINTS
			}

			if (this.fanzhong[80][4] > 0) {
				for (const index of players) {
					game.players[key].points += this.points
					game.players[index].points -= this.points
				}
			} else {
				game.players[key].points += this.points
				game.players[game.currentPlayer].points -= this.points
			}
		}
	}

	async fanPoints() {
		for await (const key of Object.keys(this.fanzhong)) {
			this.fanzhong[key][4] = await this.fanzhong[key][3](this.struct)
			this.points += this.fanzhong[key][4]
		}
	}
}
