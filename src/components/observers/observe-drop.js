#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/observers/observe-new-tile
 */

import { ALLPLAYERS } from '../../models/tiles.js'
import { displayDoor } from '../display/door.js'
import { displayRemoveItem } from '../display/display.js'
import { displayFloor } from '../display/floor.js'
import { checkDianhu } from '../hu/dianhu.js'
import { checkPeng } from '../melds/peng.js'
import { checkChi } from '../melds/chi.js'
import { delay, modIncrease } from '../helpers.js'
import { saveGame } from '../gameio.js'
import { newTile } from '../tiles.js'
import { draw, hu } from '../round/hu.js'

export function observeDrop(game) {
	const options = { childList: true }

	for (const key of ALLPLAYERS) {
		let drop = document.getElementById('control-drop' + key)
		if (!drop) return

		let callback = async (mutationList, observer) => { // eslint-disable-line
			if (!drop.firstChild) return // no tile

			// remove dropped tile from door
			let tile = game.players[key].drop
			if (tile === undefined) return

			// update door, change status to finally discarded
			displayDoor(game.currentPlayer, game.players[game.currentPlayer])
			game.players[game.currentPlayer].discarded = true

			const res = await checkDianhu(game, tile, key)
			if (res) {
				await hu(game, res)
				return
			}

			// melds
			switch (await checkPeng(game, tile)) {
			case 'gang':
				// if (await checkQianggang(game)) {
				// 	await hu()
				// 	return
				// }
				newTile(game)
				return
			case 'peng':
				return
			}

			if (await checkChi(game, tile)) return

			if (game.tiles.length === 0) {
				await draw(game)
				return
			}

			// no melds
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
