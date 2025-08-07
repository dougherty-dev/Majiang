#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/new-game
 */

import { createElement } from '../elements.js'
import { saveGame } from '../gameio.js'
import { initGame } from '../init-game.js'

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

	control.removeChild(newGameOverlay)
	await saveGame(null)
	await initGame()
}
