#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Majiang
 */

import { fetchGame, saveGame } from '../components/gameio.js'
import { newGame } from '../components/round/new-game.js'
import { play } from '../components/play.js'

/**
 * @class Majiang. The main class.
 * @property {Function} hashListen Listen for hash change.
 * @property {Function} hashLocator Resume or start a new game.
 * @property {Function} playListen Hash change on button click from main page.
 * @typedef {Object} game The game data.
 */
export default class Majiang {
	constructor() {
		this.game = null
		this.hashListen()
		this.escape()
	}

	hashListen() {
		window.addEventListener('hashchange', () => { this.hashLocator() })

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
			this.escape()
			location.hash = '#board'
		}
	}

	escape() {
		window.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				this.game = null
				saveGame(this.game)
				location.hash = '#'
			}
		}, { once: true })
	}
}
