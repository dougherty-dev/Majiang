#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/tiles
 */

import { HUAPAI } from '../models/tiles.js'
import { displayTileCount, displayDiscarded } from './display/tiles.js'
import { displayDoor, displayAddToDoor } from './display/door.js'
import { displayFlower } from './display/flowers.js'
import { sortTiles, sound } from './helpers.js'
import { newTileChecks } from './checks.js'

export function createTile(tile, ext = '', hidden = false) {
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

	if (hidden) {
		img.alt = 'tile'
		img.src = 'img/tiles/beimian' + ext + '.svg'
		return img
	}

	img.classList.add('mt')
	img.dataset.id = tile[0]
	img.alt = tile[5]
	img.src = 'img/tiles/' + tile[6] + ext + '.svg'

	return img
}

export async function takeTile(tiles) {
	if (tiles) {
		const tile = tiles.shift()
		displayTileCount(tiles.length)
		return tile
	}

	return false
}

export async function newTile(game) {
	let tile = await takeTile(game.tiles)
	let tileCopy

	if (!tile) return

	while (HUAPAI.some(obj => JSON.stringify(obj) === JSON.stringify(tile))) {
		tileCopy = tile
		game.players[game.currentPlayer].flowers.push(tile)

		tile = await takeTile(game.tiles)
		if (tile) {
			await displayFlower(game.currentPlayer, tileCopy)
		}
	}

	if (!tile) return

	game.players[game.currentPlayer].door.push(tile)
	displayAddToDoor(game.currentPlayer, tile)

	if (game.currentPlayer === 4) {
		if (await newTileChecks(game, game.currentPlayer)) return

		const door = document.getElementById('door' + game.currentPlayer)
		if (!door) return

		handleTiles(game, door)
	}
}

export async function replaceFlowers(game) {
	let tileCopy
	let playing = true

	window.addEventListener('hashchange', () => { playing = false }, { once: true })

	for await (const [key, player] of Object.entries(game.players)) {
		for (let [index, tile] of Object.entries(player.door)) {
			while (HUAPAI.includes(tile)) {
				if (!playing) return

				tileCopy = tile
				player.flowers.push(tile)

				tile = await takeTile(game.tiles)
				if (tile) {
					player.door.splice(index, 1, tile)
					displayDoor(key, player)
					await displayFlower(key, tileCopy, false)
				}
			}
		}

		sortTiles(player.door, game.sorted)
		displayDoor(key, player)
	}
}

function zoom(e) {
	const target = e.target

	if (target.nodeName === 'IMG' && target.classList.contains('t')) {
		if (e.type === 'mouseover') {
			target.classList.remove('new-tile')
			target.classList.add('pick')
			return
		}

		target.classList.remove('pick')
	}
}

function displayZoomToggle(target) {
	toggle(target, 'mouseover')
	toggle(target, 'mouseout')

	function toggle(target, event) {
		target.addEventListener(event, zoom)
	}
}

export function	handleTiles(game, door) {
	if (!door) return

	displayZoomToggle(door)

	door.addEventListener('dblclick', function callback(e) {
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
		e.currentTarget.removeEventListener('dblclick', callback)
	})
}
