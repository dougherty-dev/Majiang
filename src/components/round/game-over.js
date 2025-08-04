#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/game-over
 */

import { createElement } from '../elements.js'

export async function gameOver(game) {
	const board = document.getElementById('majiang-board')

	const resultsOverlay = createElement('div', ['results-overlay'])
	const resultsContents = createElement('div', ['results-contents'])

	const h1 = createElement('h1', '', 'Game over')
	resultsContents.appendChild(h1)

	const winners = Object.values(game.players).map(obj => obj.points)
	const winner = winners.indexOf(Math.max(...winners)) + 1

	const h2 = createElement('h2', '', `Player ${winner} won the game`)
	resultsContents.appendChild(h2)

	const ok = createElement('button', '', 'OK')
	resultsContents.appendChild(ok)

	resultsOverlay.appendChild(resultsContents)
	board.appendChild(resultsOverlay)

	await new Promise(resolve => {
		ok.addEventListener('click', async() => { resolve() }, { once: true })
	})

	board.removeChild(resultsOverlay)
}
