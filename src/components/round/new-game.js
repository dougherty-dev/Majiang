#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/new-game
 */

import { createElement } from '../elements.js'
import { initGame } from '../init-game.js'

export async function newGame() {
	const board = document.getElementById('majiang-board')

	const newGameOverlay = createElement('div', ['new-game-overlay'])
	const newGameContents = createElement('div', ['new-game-contents'])

	const button = createElement('button', ['new-game'], 'New game', 'new-game')
	newGameContents.appendChild(button)

	newGameOverlay.appendChild(newGameContents)
	board.appendChild(newGameOverlay)


	await new Promise(resolve => {
		button.addEventListener('click', async() => {
			resolve()
		}, { once: true })
	})

	board.removeChild(newGameOverlay)
	await initGame()
}
