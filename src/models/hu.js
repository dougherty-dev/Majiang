#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Hu
 * @description The Hu class.
 */

/**
 * @class Hu
 * @description Temporary object used when checking winning hand.
 * @typedef {object} hu The hu object.
 */
export default class Hu {
	constructor() {
		this.hu = {
			types: {},
			pairs: 0,
			melds: 0,
			duizi: [],
			shunzi: [],
			kezi: [],
			gangzi: [],
			values: [],
			allMelds: []
		}
	}
}
