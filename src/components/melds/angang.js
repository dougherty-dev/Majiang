#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/melds/angang
 */

import { createTile } from '../tiles.js'
import { delay, sortTiles, sound } from '../helpers.js'
import { displayDoor } from '../display/door.js'
import { displayMeld } from '../display/melds.js'
import { modalDrag } from '../drag.js'
import { createElement } from '../elements.js'

export async function checkAngang(game) {
	if (game.tiles.length === 0) return false

	const door = Object.assign([], game.players[game.currentPlayer].door)
	sortTiles(door)

	let occurence = 0
	let meldSet = []
	let type = door[0][7]
	let value = door[0][1]

	for (const tile of door) {
		if (tile[7] === type && tile[1] === value) {
			occurence++
			meldSet.push(tile)
			if (occurence === 4) {
				break
			}
		} else {
			type = tile[7]
			value = tile[1]
			occurence = 1
			meldSet = [tile]
		}
	}

	if (occurence < 4) return false

	if (game.currentPlayer === 4) {
		return await humanAngangHandling(game, meldSet)
	}

	return await AIAngangHandling(game, meldSet)
}

async function angang(game, meldSet) {
	for (const paizi of meldSet) {
		const index = game.players[game.currentPlayer].door.findIndex(elem => elem[0] === paizi[0])
		if (index > -1) {
			game.players[game.currentPlayer].door.splice(index, 1)
		}
	}

	sound('snd/gang.m4a')
	displayDoor(game.currentPlayer, game.players[game.currentPlayer])

	game.players[game.currentPlayer].melds.push({
		type: 'angang',
		key: -1,
		meld: meldSet
	})

	displayMeld(game.currentPlayer, game.players[game.currentPlayer])
	await delay(1000)
}

async function AIAngangHandling(game, meldSet) {
	// bots will just angang for now
	await delay(1000)
	await angang(game, meldSet)

	return true
}

async function humanAngangHandling(game, meldSet) {
	let isAngang = false
	const board = document.getElementById('majiang-board')

	const meldOverlay = createElement('div', ['meld-overlay'])
	const meldContents = createElement('div', ['meld-contents'])

	const button = createElement('button', '', '❌')
	meldContents.appendChild(button)

	const h1 = createElement('h1', '', '杠 Gang')
	meldContents.appendChild(h1)

	const paragraph = createElement('p', ['meld-set'])
	for (const paizi of meldSet) {
		const img = createTile(paizi)
		img.classList.add('meld')
		paragraph.appendChild(img)
	}

	paragraph.addEventListener('click', async() => {
		angang(game, meldSet)
		isAngang = true

		button.click()
	}, {once: true})

	meldContents.appendChild(paragraph)

	modalDrag(meldOverlay, meldContents)

	meldOverlay.appendChild(meldContents)
	board.appendChild(meldOverlay)

	await new Promise(resolve => {
		button.addEventListener('click', async() => { resolve() }, {once: true})
	})

	if (meldOverlay) meldOverlay.remove()
	return isAngang
}
