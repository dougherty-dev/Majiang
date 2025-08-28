#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/melds/chi
 * @description Actions when opportunity to meld a shunzi.
 * @property {function} checkChi Probe if a shunzi can be formed from discarded tile.
 * @property {function} chi Move shunzi tiles from door and drop zone to melded set.
 * @property {function} AIChiHandling Bot handling of shunzi, will always chi.
 * @property {function} humanChiHandling Human player interactive handling of shunzi.
 */

import { SHU } from '../../models/tiles.js'
import { createTile, handleTiles } from '../tiles.js'
import { delay, sortTiles, modIncrease, sound } from '../helpers.js'
import { displayDoor } from '../display/door.js'
import { displayMeld } from '../display/melds.js'
import { displayRemoveItem } from '../display/display.js'
import { modalDrag } from '../drag.js'
import { createElement } from '../elements.js'
import { botDiscard } from '../bot/discard.js'

/**
 * Probe if a shunzi can be formed from discarded tile, and what to do with it.
 * @param {object} game The game parameters.
 * @param {object} tile The tile potentially forming a shunzi.
 * @returns {promise<boolean>}
 */
export async function checkChi(game, tile) {
	const nextPlayer = modIncrease(game.currentPlayer)
	if (game.players[nextPlayer].door.length < 4) return false

	const type = tile[7]
	const value = tile[1]

	if (!SHU.includes(type)) return false

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
			door.push(paizi[1])
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
			let index = hand.findIndex(elem => elem[1] === paizi && elem[7] === type)
			chiSet.push(hand[index])
		}

		sortTiles(chiSet)
		meldTiles.push(chiSet)
	}

	if (meldTiles.length === 0) return false

	if (nextPlayer === 4) {
		return await humanChiHandling(game, meldTiles, nextPlayer)
	}

	return await AIChiHandling(game, meldTiles, nextPlayer)
}

/**
 * Move shunzi tiles from door and drop zone to melded set, update displayed melds.
 * @param {object} game The game parameters.
 * @param {object} meldSet The gangzi array of tiles.
 * @param {number} nextPlayer Player number melding the shunzi, next after current player.
 */
async function chi(game, meldSet, nextPlayer) {
	for (const paizi of meldSet) {
		const index = game.players[nextPlayer].door.findIndex(elem => elem[0] === paizi[0])
		if (index > -1) {
			game.openTiles.push(paizi)
			game.players[nextPlayer].door.splice(index, 1)
		}
	}

	sound('snd/chi.m4a')
	displayDoor(nextPlayer, game.players[nextPlayer])
	displayRemoveItem('control-drop', game.currentPlayer)

	game.players[nextPlayer].melds.push({
		type: 'chi',
		key: 0,
		meld: meldSet
	})

	displayMeld(nextPlayer, game.players[nextPlayer])

	// Rotate players.
	game.players[game.currentPlayer].turn = false
	game.currentPlayer = modIncrease(game.currentPlayer)
	game.players[game.currentPlayer].turn = true
	await delay(1000)
}

/**
 * Bot handling of shunzi, will always chi.
 * @param {object} game The game parameters.
 * @param {object} meldTiles One or more arrays of shunzi tiles.
 * @param {number} nextPlayer Player number melding the shunzi, next after current player.
 * @returns {promise<true>}
 */
async function AIChiHandling(game, meldTiles, nextPlayer) {
	const meldSet = meldTiles[0]
	await delay(1000)
	await chi(game, meldSet, nextPlayer)
	await botDiscard(game)

	return true
}

/**
 * Human player interactive handling of shunzi.
 * @param {object} game The game parameters.
 * @param {object} meldTiles One or more arrays of shunzi tiles.
 * @param {number} nextPlayer Player number melding the shunzi, next after current player.
 * @returns {promise<boolean>}
 */
async function humanChiHandling(game, meldTiles, nextPlayer) {
	const board = document.getElementById('majiang-board')

	const meldOverlay = createElement('div', ['meld-overlay'])
	const meldContents = createElement('div', ['meld-contents'])

	const button = createElement('button', '', '❌')
	const h1 = createElement('h1', '', '吃 Chi')
	meldContents.append(button, h1)

	// Accept shunzi.
	for (const meldSet of meldTiles) {
		const paragraph = createElement('p', ['meld-set'])
		for (const paizi of meldSet) {
			let img = createTile(paizi)
			img.classList.add('meld')
			paragraph.appendChild(img)
		}

		paragraph.addEventListener('click', async() => {
			chi(game, meldSet, nextPlayer)

			if (meldOverlay) meldOverlay.remove()

			const door = document.getElementById('door' + game.currentPlayer)
			if (!door) return

			handleTiles(game, door)
			return true
		}, {once: true})

		meldContents.appendChild(paragraph)
	}

	modalDrag(meldOverlay, meldContents)

	meldOverlay.appendChild(meldContents)
	board.appendChild(meldOverlay)

	// Dismiss shunzi.
	await new Promise(resolve => {
		button.addEventListener('click', async() => { resolve() }, {once: true})
	})

	if (meldOverlay) meldOverlay.remove()
	return false
}
