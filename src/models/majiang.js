#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Majiang
 */

import { fetchGame, saveGame } from '../components/gameio.js'
import { initGame } from '../components/round/init-game.js'
import { play } from '../components/play.js'

export default class Majiang {
	constructor() {
		this.game = null
		this.newGame = false
		this.hashListen()
	}

	hashListen() {
		window.addEventListener('hashchange', () => {
			this.hashLocator()
		})

		this.hashLocator()
	}

	async hashLocator() {
		this.newGameListen()

		if (location.hash !== '#board') return

		switch (this.newGame) {
		case true:
			this.newGame = false
			break
		default:
			this.game = fetchGame()
			play(this.game)
		}
	}

	newGameListen() {
		const button = document.getElementById('new-game')
		if (!button) return

		button.onclick = async() => {
			this.newGame = true
			this.game = null
			await saveGame(this.game)

			window.addEventListener('hashchange', async() => {
				await initGame()
			}, { once: true })

			location.hash = 'board'
		}
	}
}
