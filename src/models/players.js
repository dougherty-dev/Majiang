#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Players
 */

class Player {
	constructor() {
		this.player = {
			points: 0,
			wind: null,
			tingpai: false,
			discarded: false,
			turn: false,
			door: [],
			melds: [],
			flowers: [],
			floor: [],
			drop: null
		}
	}
}

export default class Players {
	constructor() {
		this.players = {
			1: new Player().player,	// east
			2: new Player().player,	// south
			3: new Player().player,	// west
			4: new Player().player	// north
		}
	}
}
