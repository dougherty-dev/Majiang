#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/results
 * @description Announce draw or hu (win) of hand.
 * @property {function} draw No tiles left. Declare draw and replay hand.
 * @property {function} hu Announce and display potentially winning hand.
 */

import { EXITFAN } from '../../models/constants.js'
import Points from '../../models/points.js'
import { displayExit } from '../display/display.js'
import { createElement } from '../elements.js'
import { sound } from '../helpers.js'
import { createTile } from '../tiles.js'
import { displayResults } from './results.js'

/**
 * No tiles left. Declare draw and replay hand.
 * @param {object} game The game parameters.
 */
export async function draw(game) {
	game.winner = false
	game.draw = true
	displayResults(game, 0, [])
}

/**
 * Announce and display potentially winning hand.
 * @param {object} game The game parameters.
 * @param {*} key Winning player.
 * @returns {promise<boolean>}
 */
export async function hu(game, key) {
	// Collect tiles for point analysis.
	let tiles = []
	for (const set of game.players[key].melds) {
		for (const tile of set.meld) {
			tiles.push(tile)
		}
	}

	tiles = [...tiles, ...game.players[key].door]

	if (game.players[key].dianhu) {
		const tile = game.players[game.currentPlayer].drop
		tiles.push(tile)
	}

	const points = new Points(game, key, tiles)
	await points.fanPoints()

	 // Bots will always take a win.
	if (key != 4) {
		// Does player have enough (8 fan) points to exit?
		if (points.struct.exit < EXITFAN) return false

		sound('snd/hule.m4a')
		displayResults(game, key, tiles, points)

		return true
	}

	 // Human player can decline win.
	if (key == 4) {
		// Does player have enough (8 fan) points to exit?
		if (points.struct.exit < EXITFAN) {
			displayExit(points.struct.exit, EXITFAN)
			return false
		}

		const board = document.getElementById('majiang-board')
		const huOverlay = createElement('div', ['hu-overlay'])
		const huContents = createElement('div', ['hu-contents'])

		const button = createElement('button', '', '❌')
		huContents.appendChild(button)

		const h1 = createElement('h1', '', '和了 Hule!')
		huContents.appendChild(h1)

		const paragraph = createElement('p', ['hu-set'])

		for (const tile of tiles) {
			const img = createTile(tile)
			img.classList.add('hu')
			paragraph.appendChild(img)
		}

		paragraph.lastChild.classList.add('tile-divider', 'hu')

		const ok = createElement('button', '', 'Win')
		huContents.append(paragraph, ok)

		huOverlay.appendChild(huContents)
		board.appendChild(huOverlay)

		// Accept hu, prepare new hand.
		ok.addEventListener('click', async() => {
			sound('snd/hule.m4a')
			if (huOverlay) huOverlay.remove()
			await displayResults(game, key, tiles, points)
		}, { once: true })

		// Dismiss hu, continue hand.
		await new Promise(resolve => {
			button.addEventListener('click', () => {
				resolve()
			}, { once: true })
		})

		if (huOverlay) huOverlay.remove()
		return false
	}
}
