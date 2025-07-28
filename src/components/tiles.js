#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module tiles
 */

import { displayDiscarded, displayDoor, displayZoomToggle } from './display.js'
import { sortTiles, sound } from './helpers.js'

export function createTile(tile, ext = '') {
	if (!tile) return
	const img = document.createElement('img')

	switch (ext) {
	case '':
		img.width = 19
		img.height = 26
		img.classList.add('t')
		break
	case '-o':
		img.width = 26
		img.height = 19
		img.classList.add('to')
		break
	case '-d':
		img.width = 26
		img.height = 38
		img.classList.add('td')
		break
	}

	img.dataset.id = tile[0]
	img.alt = tile[5]
	img.src = 'img/tiles/' + tile[6] + ext + '.svg'

	return img
}

export function	humanTileHandling(game, door) {
	if (!door) return

	displayZoomToggle(door)

	door.addEventListener('click', function callback(e) {
		// Listener on door, but click on tile in door
		if (!e.target.matches('.t')) return

		// Find clicked tile
		const index = Array.from(door.children).findIndex(elem => elem.dataset.id === e.target.dataset.id)
		const chosen = game.players[game.currentPlayer].door[index]

		// Discard clicked tile
		game.players[game.currentPlayer].drop = chosen
		game.players[game.currentPlayer].door.splice(index, 1)
		game.players[game.currentPlayer].discarded = true

		// Display discarded tile
		displayDiscarded(game.currentPlayer, chosen)
		sound('snd/clack.m4a')

		// Redisplay door, optionally with sorting
		sortTiles(game.players[game.currentPlayer].door, game.sorted)
		displayDoor(game.currentPlayer, game.players[game.currentPlayer])

		// Self-destruct. Because of initial return condition, we can't have once: true
		e.currentTarget.removeEventListener('click', callback)
	})
}
