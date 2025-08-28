#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/observers/observe-new-tile
 * @description Listen for and act on DOM changes in drop zone.
 * @property {function} observeDrop MutationObserver for discarded tile.
 */

import { ALLPLAYERS } from '../../models/constants.js'
import { displayDoor } from '../display/door.js'
import { displayRemoveItem } from '../display/display.js'
import { displayFloor } from '../display/floor.js'
import { delay, modIncrease } from '../helpers.js'
import { saveGame } from '../gameio.js'
import { newTile } from '../tiles.js'
import { dropTileChecks } from '../checks.js'

/**
 * MutationObserver for discarded tile.
 * @param {object} game The game parameters.
 */
export function observeDrop(game) {
	const options = { childList: true }

	for (const key of ALLPLAYERS) {
		let drop = document.getElementById('control-drop' + key)
		if (!drop) return

		// jshint unused:false
		let callback = async (mutationList, observer) => { // eslint-disable-line
			if (!drop.firstChild) return // no tile

			// Remove dropped tile from door, set latest drop tile.
			let tile = game.players[key].drop
			if (tile === undefined) return
			game.drop = [tile[7], tile[1]]

			// Update door, change status to finally discarded.
			displayDoor(game.currentPlayer, game.players[game.currentPlayer])
			game.players[game.currentPlayer].discarded = true

			// Player will chi, peng, gang or gang discarded tile?
			if (await dropTileChecks(game, tile, key)) return
			await delay(1000)

			// Remove tile from drop zone.
			displayRemoveItem('control-drop', game.currentPlayer)

			// Put tile on floor.
			game.players[game.currentPlayer].floor.push(tile)
			game.openTiles.push(tile)
			let index = game.players[game.currentPlayer].floor.length - 1
			displayFloor(game.currentPlayer, tile, index)

			// Rotate players.
			game.currentPlayer = modIncrease(game.currentPlayer)

			// Save game state for resumption when discard is completed.
			await saveGame(game)

			// Take a new tile for next player, trigger observeNewTile.
			newTile(game)
		}

		const observer = new MutationObserver(callback)

		window.addEventListener('hashchange', () => { observer.disconnect() })

		try {
			observer.observe(drop, options)
		} catch (error) {
			console.log(error)
		}
	}
}
