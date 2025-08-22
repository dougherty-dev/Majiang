#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/results
 */

import { EXITFAN } from '../../models/constants.js'
import Points from '../../models/points.js'
import { displayExit } from '../display/display.js'
import { createElement } from '../elements.js'
import { sound } from '../helpers.js'
import { createTile } from '../tiles.js'
import { displayResults } from './results.js'

export async function draw(game) {
	game.winner = false
	game.draw = true
	displayResults(game, 0, [])
}

export async function hu(game, key) {
	let door = []
	for (const set of game.players[key].melds) {
		for (const tile of set.meld) {
			door.push(tile)
		}
	}

	door = [...door, ...game.players[key].door]

	if (game.players[key].hu.dianhu) {
		const tile = game.players[game.currentPlayer].drop
		door.push(tile)
	}

	const points = new Points(game, key, door)
	await points.fanPoints()

	if (key != 4) {
		if (points.struct.exit < EXITFAN) return false

		sound('snd/hule.m4a')
		displayResults(game, key, door, points)

		return true
	}


	if (key == 4) {
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

		for (const tile of door) {
			const img = createTile(tile)
			img.classList.add('hu')
			paragraph.appendChild(img)
		}

		paragraph.lastChild.classList.add('tile-divider', 'hu')

		const ok = createElement('button', '', 'Win')
		huContents.append(paragraph, ok)

		huOverlay.appendChild(huContents)
		board.appendChild(huOverlay)

		ok.addEventListener('click', async() => {
			sound('snd/hule.m4a')
			if (huOverlay) huOverlay.remove()
			await displayResults(game, key, door, points)
		}, { once: true })

		await new Promise(resolve => {
			button.addEventListener('click', () => {
				resolve()
			}, { once: true })
		})

		if (huOverlay) huOverlay.remove()
		return false
	}
}
