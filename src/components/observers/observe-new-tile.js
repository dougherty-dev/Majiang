#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/observers/observe-new-tile
 */

import { AIPLAYERS } from '../../models/constants.js'
import { newTileChecks } from '../checks.js'
import { delay } from '../helpers.js'
import { botDiscard } from '../bot/discard.js'

/**
 * 
 * @param {Object} game
 * @description MutationObserver for new tile.
 */
export function observeNewTile(game) {
	const options = { childList: true }

	for (const key of AIPLAYERS) {
		let door = document.getElementById('door' + key)
		if (!door) return

		let callback = async (mutationList, observer) => { // eslint-disable-line
			if (!door.lastChild || !door.lastChild.classList.contains('tile-divider')) return

			if (await newTileChecks(game, key)) return
			await delay(1000)

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
