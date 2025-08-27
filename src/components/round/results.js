#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/results
 * @description Display results.
 * @property {Function} displayResults Display results of hand (draw or win).
 */

import { HUMANPLAYER, MAJIANGAVATAR } from '../../models/constants.js'
import { createElement } from '../elements.js'
import { newRound } from './new-round.js'
import { delay, sortTiles, sound } from '../helpers.js'
import { displayRound } from '../display/floor.js'
import { displayPoints } from '../display/display.js'
import { revealDoors } from '../display/door.js'
import { revealMelds } from '../display/melds.js'
import { play } from '../play.js'
import { createTile } from '../tiles.js'

/**
 * Announce draw or win. List applicable fan rules with scores, and total points.
 * @param {Object} game The game parameters.
 * @param {number} key Winning player index (1–4).
 * @param {Array} tiles All 14–18 tiles of the winning hand.
 * @param {number} points The combined score for the winning hand.
 */
export async function displayResults(game, key, tiles, points) {
	await delay(500)
	revealDoors(game.players)
	revealMelds(game.players)

	const board = document.getElementById('majiang-board')

	const resultsOverlay = createElement('div', ['results-overlay'])
	const resultsContents = createElement('div', ['results-contents'])

	const h1 = createElement('h1', '', 'Results')
	resultsContents.appendChild(h1)

	if (game.winner) {
		let icon = `user${key}`
		if (key == HUMANPLAYER) {
			const avatar = localStorage.getItem(MAJIANGAVATAR)
			if (avatar) {
				icon = `avatar/${avatar}`
			}
		}

		const image = createElement('img', ['profile'])
		image.height = 50
		image.width = 50
		image.alt = `Player ${key}`
		image.src = `img/${icon}.svg`

		resultsContents.appendChild(image)
	}

	const player = key == HUMANPLAYER ? 'You' : `Player ${key}`
	const msg = game.draw ? 'Draw' : `${player} won the hand`

	const h2 = createElement('h2', '', msg)
	resultsContents.appendChild(h2)

	// No tiles when draw.
	if (tiles.length) {
		const paragraph = createElement('p', ['results-set'])

		sortTiles(tiles)
		for (const tile of tiles) {
			const img = createTile(tile)
			img.classList.add('results')
			paragraph.appendChild(img)
		}

		resultsContents.appendChild(paragraph)
	}

	resultsOverlay.appendChild(resultsContents)
	board.appendChild(resultsOverlay)

	// List fanzhongs and respective points.
	if (game.winner) {
		const score = Object.entries(points.fanzhong).filter(arr => arr[1][4] > 0)

		await delay(1500)
		for (const point of Object.values(score)) {
			const fan = createElement('p', ['fan'])
			fan.textContent = `${point[0]}: ${point[1][0]} ${point[1][1]} | ${point[1][2]}: ${point[1][4]} p`
			resultsContents.appendChild(fan)
			sound(`snd/fanzhong/${point[0]}.m4a`)
			await delay(1500)
		}

		const fan = createElement('p', ['fan'])
		fan.textContent = `Sum: ${points.struct.points} p`
		resultsContents.appendChild(fan)

		points.sumPoints(game, key)
		displayPoints(game.players)
	}

	const ok = createElement('button', '', 'OK')
	resultsContents.appendChild(ok)

	await new Promise(resolve => {
		ok.addEventListener('click', async() => { resolve() }, { once: true })
	})

	if (resultsOverlay) resultsOverlay.remove()

	displayRound(game.round, game.rotation, game.hand)

	if (await newRound(game)) {
		play(game)
	}
}
