#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/observers/observe-new-tile
 * @description Listen for and act on DOM changes in bot player’s door.
 * @property {function} observeNewTile MutationObserver for discarded tile.
 */

import { AIPLAYERS } from '../../models/constants.js'
import { newTileChecks } from '../checks.js'
import { delay } from '../helpers.js'
import { botDiscard } from '../bot/discard.js'

/**
 * MutationObserver for new tile. Bots only, human action is interactive.
 * @param {object} game The game parameters.
 */
export function observeNewTile(game) {
	const options = { childList: true }

	for (const key of AIPLAYERS) {
		let door = document.getElementById('door' + key)
		if (!door) return

		// jshint unused:false
		let callback = async (mutationList, observer) => { // eslint-disable-line
			if (!door.lastChild || !door.lastChild.classList.contains('tile-divider')) return

			// Player can zimo, jiagang, angang?
			if (await newTileChecks(game, key)) return
			await delay(1000)

			// Discard a suitable tile.
			await botDiscard(game)
		}

		const observer = new MutationObserver(callback)

		window.addEventListener('hashchange', () => { observer.disconnect() })

		try {
			observer.observe(door, options)
		} catch (error) {
			console.log(error)
		}
	}
}
