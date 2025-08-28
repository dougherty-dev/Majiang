#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Players
 * @description The Players class.
 */

import Hu from './hu.js'

/**
 * @class Player
 * @description Individual player object definition.
 * @typedef {object} player The player object.
 */
class Player {
	constructor() {
		this.player = {
			points: 0,
			wind: null,
			turn: false,
			tingpai: false,
			discarded: false,
			door: [],
			melds: [],
			flowers: [],
			floor: [],
			drop: [],
			sets: [],
			zimo: false,
			dianhu: false,
			shisanyao: false,
			qidui: false,
			knitted: false,
			lesserHonors: false,
			greaterHonors: false,
			knittedStraight: false,
			hu: new Hu().hu
		}
	}
}

/**
 * @class Players
 * @description Set of four players.
 * @typedef {object} players The players object.
 */
export default class Players {
	constructor() {
		this.players = {
			'1': new Player().player,	// east
			'2': new Player().player,	// south
			'3': new Player().player,	// west
			'4': new Player().player	// north
		}
	}
}
