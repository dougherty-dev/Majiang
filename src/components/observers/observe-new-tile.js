#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/observers/observe-new-tile
 */

import { AIPLAYERS } from '../../models/tiles.js'
import { newTileChecks } from '../checks.js'
import { delay, sound } from '../helpers.js'
import { displayDiscarded } from '../display/tiles.js'

export function observeNewTile(game) {
	const options = { childList: true }

	for (const key of AIPLAYERS) {
		let door = document.getElementById('door' + key)
		if (!door) return

		let callback = async (mutationList, observer) => { // eslint-disable-line
			// player has a new tile?

			if (!door.lastChild || !door.lastChild.classList.contains('tile-divider')) return

			if (await newTileChecks(game, key)) return

			await delay(1000)

			const chosen = game.players[game.currentPlayer].door.at(-1)
			if (chosen === undefined) return

			displayDiscarded(game.currentPlayer, chosen)
			game.players[game.currentPlayer].discarded = true
			game.players[game.currentPlayer].drop = chosen
			game.players[game.currentPlayer].door.splice(-1, 1)
			sound('snd/clack.m4a')
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

