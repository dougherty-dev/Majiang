#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/melds/chi
 */

import { SHUZIPAI } from '../../models/tiles.js'
import { createTile, humanTileHandling } from '../tiles.js'
import { delay, sortTiles, modIncrease, sound } from '../helpers.js'
import { displayDiscarded } from '../display/tiles.js'
import { displayDoor } from '../display/door.js'
import { displayMeld } from '../display/melds.js'
import { displayRemoveItem } from '../display/display.js'
import { modalDrag } from '../drag.js'
import { createElement } from '../elements.js'

export async function checkChi(game, tile) {
	const nextPlayer = modIncrease(game.currentPlayer)
	if (game.players[nextPlayer].door.length < 4) return false

	const type = tile[7]
	const value = tile[1]

	if (!SHUZIPAI.includes(type)) return false

	let patterns = []
	switch (value) {
	case 1:
		patterns.push([2, 3])
		break
	case 2:
		patterns.push([1, 3], [3, 4])
		break
	case 8:
		patterns.push([6, 7], [7, 9])
		break
	case 9:
		patterns.push([7, 8])
		break
	default:
		patterns.push([value - 2, value - 1], [value - 1, value + 1], [value + 1, value + 2])
	}

	let door = []
	for (const paizi of game.players[nextPlayer].door) {
		if (paizi[7] === type) {
			door.push(parseInt(paizi[1]))
		}
	}

	const set = [...new Set(door)].sort()

	let melds = []
	for (const pattern of patterns) {
		if (pattern.every(value => set.includes(value))) {
			melds.push(pattern)
		}
	}

	const hand = Array.from(game.players[nextPlayer].door)

	let meldTiles = []
	for (let meld of melds) {
		let chiSet = [tile]
		for (const paizi of meld) {
			let index = hand.findIndex(elem => elem[1] === paizi && elem[3].startsWith(type))
			chiSet.push(hand[index])
		}

		sortTiles(chiSet)
		meldTiles.push(chiSet)
	}

	if (meldTiles.length && nextPlayer === 4) {
		return await humanChiHandling(game, meldTiles, nextPlayer)
	}

	if (meldTiles.length) {
		return await AIChiHandling(game, meldTiles, nextPlayer)
	}
}

async function chi(game, meldSet, nextPlayer) {
	for (const paizi of meldSet) {
		const index = game.players[nextPlayer].door.findIndex(elem => elem[0] === paizi[0])
		if (index > -1) {
			game.players[nextPlayer].door.splice(index, 1)
		}
	}

	displayDoor(nextPlayer, game.players[nextPlayer])
	displayRemoveItem('control-drop', game.currentPlayer)
	sound('snd/chi.m4a')

	game.players[nextPlayer].melds.push({
		type: 'chi',
		key: 0,
		meld: meldSet
	})

	displayMeld(nextPlayer, game.players[nextPlayer])

	// rotate player
	game.players[game.currentPlayer].turn = false
	game.currentPlayer = modIncrease(game.currentPlayer)
	game.players[game.currentPlayer].turn = true
}

async function AIChiHandling(game, meldTiles, nextPlayer) {
	// bots will just eat for now
	const meldSet = meldTiles[0]
	await delay(1000)
	chi(game, meldSet, nextPlayer)
	await delay(1000)

	const chosen = game.players[game.currentPlayer].door.at(-1)
	if (chosen !== undefined) {
		displayDiscarded(game.currentPlayer, chosen)
		game.players[game.currentPlayer].discarded = true
		game.players[game.currentPlayer].drop = chosen
		game.players[game.currentPlayer].door.splice(-1, 1)
		sound('snd/clack.m4a')
	}

	return true
}

async function humanChiHandling(game, meldTiles, nextPlayer) {
	const meldOverlay = createElement('div', ['meld-overlay'])
	const meldContents = createElement('div', ['meld-contents'])

	const button = createElement('button', '', '❌')
	const h1 = createElement('h1', '', '吃 Chi')
	meldContents.append(button, h1)

	for (const meldSet of meldTiles) {
		const paragraph = createElement('p', ['meld-set'])
		for (const paizi of meldSet) {
			let img = createTile(paizi)
			img.classList.add('meld')
			paragraph.appendChild(img)
		}

		paragraph.addEventListener('click', async() => {
			chi(game, meldSet, nextPlayer)

			document.body.removeChild(meldOverlay)
			const door = document.getElementById('door' + game.currentPlayer)
			if (!door) return

			humanTileHandling(game, door)
			return true
		}, {once: true})

		meldContents.appendChild(paragraph)
	}

	modalDrag(meldOverlay, meldContents)

	meldOverlay.appendChild(meldContents)
	document.body.appendChild(meldOverlay)

	await new Promise(resolve => {
		button.addEventListener('click', () => {
			document.body.removeChild(meldOverlay)
			resolve()
		}, { once: true })
	})

	return false
}
