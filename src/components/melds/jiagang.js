#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/melds/jiagang
 */

import { createTile } from '../tiles.js'
import { delay, sortTiles, sound } from '../helpers.js'
import { displayDoor } from '../display/door.js'
import { displayMeld } from '../display/melds.js'
import { modalDrag } from '../drag.js'
import { createElement } from '../elements.js'

export async function checkJiagang(game) {
	if (game.tiles.length === 0) return false

	let pengs = []
	for (const [key, meld] of Object.entries(game.players[game.currentPlayer].melds)) {
		if (meld.type === 'peng') {
			pengs.push({
				key: key,
				meld: meld.meld
			})
		}
	}

	if (pengs.length === 0) return false

	const door = Object.assign([], game.players[game.currentPlayer].door)
	sortTiles(door)

	let peng = -1
	let tile
	for (const paizi of door) {
		for (const meld of pengs) {
			if (paizi[7] === meld.meld[0][7] && paizi[1] === meld.meld[0][1]) {
				peng = meld.key
				tile = paizi
				break
			}
		}
	}

	if (peng < 0) return false

	if (game.currentPlayer === 4) {
		return await humanJiagangHandling(game, peng, tile)
	}

	return await AIJiagangHandling(game, peng, tile)
}

async function jiagang(game, peng, tile) {
	const index = game.players[game.currentPlayer].door.findIndex(
		elem => elem[1] === tile[1] && elem[7] === tile[7]
	)

	if (index > -1) {
		game.players[game.currentPlayer].door.splice(index, 1)
		for (const meld of game.players[game.currentPlayer].melds) {
			if (meld.meld[0][1] === tile[1] && meld.meld[0][7] === tile[7]) {
				meld.meld.push(tile)
			}
		}
	}

	sound('snd/gang.m4a')
	displayDoor(game.currentPlayer, game.players[game.currentPlayer])

	game.players[game.currentPlayer].melds[peng].type = 'gang'
	displayMeld(game.currentPlayer, game.players[game.currentPlayer])
}

async function AIJiagangHandling(game, peng, tile) {
	// bots will just jiagang for now
	await delay(1000)
	await jiagang(game, peng, tile)
	await delay(1000)

	return tile
}

async function humanJiagangHandling(game, peng, tile) {
	let isJiagang = false
	const board = document.getElementById('majiang-board')

	const meldOverlay = createElement('div', ['meld-overlay'])
	const meldContents = createElement('div', ['meld-contents'])

	const button = createElement('button', '', '❌')
	meldContents.appendChild(button)

	const h1 = createElement('h1', '', '杠 Gang')
	meldContents.appendChild(h1)

	const paragraph = createElement('p', ['meld-set'])

	const paizi = game.players[game.currentPlayer].melds[peng].meld[0]
	const img = createTile(paizi)
	img.classList.add('meld')

	for (let index = 0; index < 4; index++) {
		paragraph.appendChild(img.cloneNode(true))
	}

	paragraph.addEventListener('click', async() => {
		jiagang(game, peng, tile)
		isJiagang = tile

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
	return isJiagang
}
