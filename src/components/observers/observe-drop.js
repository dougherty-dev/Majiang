#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/observers/observe-new-tile
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
 * 
 * @param {Object} game
 * @description MutationObserver for discarded tile.
 */
export function observeDrop(game) {
	const options = { childList: true }

	for (const key of ALLPLAYERS) {
		let drop = document.getElementById('control-drop' + key)
		if (!drop) return

		// jshint unused:false
		let callback = async (mutationList, observer) => { // eslint-disable-line
			if (!drop.firstChild) return // no tile

			// remove dropped tile from door, set latest drop tile
			let tile = game.players[key].drop
			if (tile === undefined) return
			game.drop = [tile[7], tile[1]]

			// update door, change status to finally discarded
			displayDoor(game.currentPlayer, game.players[game.currentPlayer])
			game.players[game.currentPlayer].discarded = true

			if (await dropTileChecks(game, tile, key)) return
			await delay(1000)

			// remove tile from drop zone
			displayRemoveItem('control-drop', game.currentPlayer)

			// put tile on floor
			game.players[game.currentPlayer].floor.push(tile)
			let index = game.players[game.currentPlayer].floor.length - 1
			displayFloor(game.currentPlayer, tile, index)

			// rotate player
			game.currentPlayer = modIncrease(game.currentPlayer)

			// save game state for resumption
			await saveGame(game)

			// take a new tile for next player, trigger observeNewTile
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
