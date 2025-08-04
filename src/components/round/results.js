#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/results
 */

import { createElement } from '../elements.js'
import { ALLPLAYERS } from '../../models/tiles.js'
import { newRound } from './new-round.js'
import { sortTiles } from '../helpers.js'
import { displayClearBoard, layoutGame } from '../display/display.js'
import { displayRound } from '../display/floor.js'
import { play } from '../play.js'
import { createTile } from '../tiles.js'

export async function displayResults(game, key, door) {
	const board = document.getElementById('majiang-board')

	const resultsOverlay = createElement('div', ['results-overlay'])
	const resultsContents = createElement('div', ['results-contents'])

	const h1 = createElement('h1', '', 'Results')
	resultsContents.appendChild(h1)

	const msg = game.draw ? 'Draw' : `Player ${key} won the round`

	const h2 = createElement('h2', '', msg)
	resultsContents.appendChild(h2)


	if (door.length) {
		const paragraph = createElement('p', ['results-set'])

		sortTiles(door)
		for (const tile of door) {
			const img = createTile(tile)
			img.classList.add('results')
			paragraph.appendChild(img)
		}

		resultsContents.appendChild(paragraph)
	}

	const ok = createElement('button', '', 'OK')
	resultsContents.appendChild(ok)

	resultsOverlay.appendChild(resultsContents)
	board.appendChild(resultsOverlay)

	await new Promise(resolve => {
		ok.addEventListener('click', async() => { resolve() }, { once: true })
	})

	board.removeChild(resultsOverlay)

	const players = ALLPLAYERS.filter(item => item !== key)

	if (game.winner) {
		game.players[key].points += 24
		for (const index of players) {
			game.players[index].points -= 8
		}
	}

	for (const index of ALLPLAYERS) {
		game.players[index].door = []
		game.players[index].melds = []
		game.players[index].flowers = []
		game.players[index].floor = []
		game.players[index].drop = null
		game.players[index].discarded = null
		game.players[index].tingpai = null
	}

	await displayClearBoard()
	displayRound(game.round, game.rotation, game.hand)

	if (await newRound(game)) {
		await layoutGame(game)
		play(game)
	}
}
