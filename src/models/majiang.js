#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Majiang
 * @description The Majiang class.
 */

import { fetchGame, saveGame } from '../components/gameio.js'
import { newGame } from '../components/round/new-game.js'
import { play } from '../components/play.js'

/**
 * @class Majiang
 * @description Top level flow of action.
 * @property {function} hashListen Listen for hash change.
 * @property {function} hashLocator Resume or start a new game.
 * @property {function} playListen Hash change on button click from main page.
 * @typedef {object} game The game data.
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
		})
	}
}
