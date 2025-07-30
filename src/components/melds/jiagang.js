#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/melds/jiagang
 */

import { createTile } from '../tiles.js'
import { delay, sound } from '../helpers.js'
import { displayDoor } from '../display/door.js'
import { displayMeld } from '../display/melds.js'
import { modalDrag } from '../drag.js'
import { createElement } from '../elements.js'

export async function checkJiagang(game, discarded) {
	const type = discarded[7]
	const value = discarded[1]

	let peng = -1
	for (const [key, meld] of Object.entries(game.players[game.currentPlayer].melds)) {
		if (meld.type === 'peng') {
			if (meld.meld[0][7] === type && meld.meld[0][1] === value) {
				peng = key
				break
			}
		}
	}

	if (peng < 0) return false

	if (game.currentPlayer === 4) {
		return await humanJiagangHandling(game, peng)
	}

	return await AIJiagangHandling(game, peng)
}

async function jiagang(game, peng) {
	sound('snd/gang.m4a')
	game.players[game.currentPlayer].door.splice(-1, 1)
	displayDoor(game.currentPlayer, game.players[game.currentPlayer])

	game.players[game.currentPlayer].melds[peng].type = 'gang'
	displayMeld(game.currentPlayer, game.players[game.currentPlayer])
}

async function AIJiagangHandling(game, peng) {
	// bots will just jiagang for now
	await delay(500)
	await jiagang(game, peng)
	await delay(1000)

	return true
}

async function humanJiagangHandling(game, peng) {
	let isJiagang = false

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
		jiagang(game, peng)
		isJiagang = true

		const door = document.getElementById('door' + game.currentPlayer)
		if (!door) return

		// remove modal and get new tile
		button.click()
	}, {once: true})

	meldContents.appendChild(paragraph)

	modalDrag(meldOverlay, meldContents)

	meldOverlay.appendChild(meldContents)
	document.body.appendChild(meldOverlay)

	await new Promise(resolve => {
		button.addEventListener('click', () => {
			document.body.removeChild(meldOverlay)
			resolve()
		}, { once: true })
	})

	return isJiagang
}
