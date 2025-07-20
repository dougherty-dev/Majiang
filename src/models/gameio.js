#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class Game
 */

import { VERSION } from '../config.js'

export default class GameIO {
	fetchGame() {
		let game = null
		const storedGame = localStorage.getItem('game')

		if (storedGame) {
			try {
				game = JSON.parse(storedGame)
				if (game.version != VERSION) {
					localStorage.removeItem('game')
					game = null
				}
			} catch (e) {
				console.log(e)
				game = null
			}
		}

		return game
	}

	saveGame(game) {
		localStorage.setItem('game', JSON.stringify(game))
	}
}
