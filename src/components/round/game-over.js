#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/game-over
 */

import { MAJIANGAVATAR } from '../../models/constants.js'
import { createElement } from '../elements.js'
import { newGame } from './new-game.js'

export async function gameOver(game) {
	const board = document.getElementById('majiang-board')

	const resultsOverlay = createElement('div', ['results-overlay'])
	const resultsContents = createElement('div', ['results-contents'])

	const h1 = createElement('h1', '', 'Game over')
	resultsContents.appendChild(h1)

	const winners = Object.values(game.players).map(obj => obj.points)
	const winner = winners.indexOf(Math.max(...winners)) + 1

	const player = winner == 4 ? 'You' : `Player ${winner}`
	const msg = `${player} won the game`

	let icon = `user${winner}`
	if (winner == 4) {
		const avatar = localStorage.getItem(MAJIANGAVATAR)
		if (avatar) {
			icon = `avatar/${avatar}`
		}
	}

	const image = createElement('img', ['profile'])
	image.height = 50
	image.width = 50
	image.alt = `Player ${winner}`
	image.src = `img/${icon}.svg`

	const h2 = createElement('h2', '', msg)
	resultsContents.append(image, h2)

	const ok = createElement('button', '', 'OK')
	resultsContents.appendChild(ok)

	resultsOverlay.appendChild(resultsContents)
	board.appendChild(resultsOverlay)

	await new Promise(resolve => {
		ok.addEventListener('click', async() => { resolve() }, { once: true })
	})

	board.removeChild(resultsOverlay)
	newGame()
}
