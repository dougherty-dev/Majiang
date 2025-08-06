#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Majiang
 */

import { fetchGame, saveGame } from '../components/gameio.js'
import { newGame } from '../components/round/new-game.js'
import { play } from '../components/play.js'

export default class Majiang {
	constructor() {
		this.game = null
		this.hashListen()
	}

	hashListen() {
		window.addEventListener('hashchange', () => {
			this.hashLocator()
		})

		this.hashLocator()
	}

	async hashLocator() {
		this.playListen()

		if (location.hash !== '#board') return

		this.game = fetchGame()
		if (this.game) {
			play(this.game)
		} else {
			this.game = null
			await saveGame(this.game)
			await newGame()
		}
	}

	playListen() {
		const button = document.getElementById('play')
		if (!button) return

		button.onclick = () => {
			location.hash = 'board'
		}
	}
}
