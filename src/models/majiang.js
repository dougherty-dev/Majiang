#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Majiang
 */

import { VERSION } from '../config.js'
import { determineSeatWinds } from './winds.js'
import { getRandomInt } from '../components/helpers.js'
import { fetchGame, saveGame } from '../components/gameio.js'
import { newRound } from '../components/round/new-round.js'
import { play } from '../components/play.js'

import Players from './players.js'

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
				await this.initGame()
			}, { once: true })

			location.hash = 'board'
		}
	}

	async initGame() {
		this.game = {
			version: VERSION,
			active: true,
			round: 1,
			rotation: 1,
			hand: 0,
			prevailingWind: 1,
			windShifter: getRandomInt(1, 4),
			currentPlayer: null,
			tiles: null,
			sorted: false,
			draw: false,
			winner: false,
			players: new Players().players
		}

		await determineSeatWinds(this.game)
		await newRound(this.game)

		play(this.game)
	}
}
