#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/new-game
 * @description Overlay and listener for a new game.
 * @property {function} newGame Wait for user starting a new game.
 */

import { createElement } from '../elements.js'
import { saveGame } from '../gameio.js'
import { initGame } from '../init-game.js'

/**
 * Wait for user starting a new game.
 */
export async function newGame() {
	const control = document.getElementById('control-counter')

	const newGameOverlay = createElement('div', ['new-game-overlay'])
	const newGameContents = createElement('div', ['new-game-contents'])

	const button = createElement('button', ['new-game'], 'New game')
	newGameContents.appendChild(button)

	newGameOverlay.appendChild(newGameContents)
	control.appendChild(newGameOverlay)

	await new Promise(resolve => {
		button.addEventListener('click', async() => {
			resolve()
		}, { once: true })
	})

	if (newGameOverlay) newGameOverlay.remove()

	await saveGame(null)
	await initGame()
}
