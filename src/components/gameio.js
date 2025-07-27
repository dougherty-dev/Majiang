#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @description Game IO functions
 */

import { VERSION } from '../config.js'

export function fetchGame() {
	let game = null
	const storedGame = localStorage.getItem('game')

	if (storedGame) {
		try {
			game = JSON.parse(storedGame)
			if (game && game.version != VERSION) {
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

export async function saveGame(game) {
	localStorage.setItem('game', JSON.stringify(game))
}
