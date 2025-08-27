#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Players
 */

import Hu from './hu.js'

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
			hu: new Hu().hu
		}
	}
}

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
