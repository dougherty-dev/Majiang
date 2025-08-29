#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Players
 * @description The Players class.
 */

/**
 * @class Player
 * @description Individual player object definition.
 * @typedef {object} player The player object.
 */
export class Player {
	constructor(points = 0, wind = null) {
		this.player = {
			points: points,
			wind: wind,
			door: [],
			melds: [],
			flowers: [],
			floor: [],
			drop: [],
			zimo: false,
			dianhu: false,
			noPairs: null,
			noMelds: null,
			types: {},
			shisanyao: false,
			qidui: false,
			knitted: false,
			lesserHonors: false,
			greaterHonors: false,
			knittedStraight: false,
			gangshangKaihua: 0,
			qianggang: false
		}
	}
}

/**
 * @class Players
 * @description Set of four players.
 * @typedef {object} players The players object.
 */
export class Players {
	constructor() {
		this.players = {
			'1': new Player().player,	// east
			'2': new Player().player,	// south
			'3': new Player().player,	// west
			'4': new Player().player	// north
		}
	}
}
