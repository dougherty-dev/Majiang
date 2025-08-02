#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/melds/peng
 */

import { createTile, humanTileHandling } from '../tiles.js'
import { delay, sound } from '../helpers.js'
import { displayDiscarded } from '../display/tiles.js'
import { displayDoor } from '../display/door.js'
import { displayMeld } from '../display/melds.js'
import { displayRemoveItem } from '../display/display.js'
import { modalDrag } from '../drag.js'
import { createElement } from '../elements.js'

export async function checkPeng(game, discarded) {
	const type = discarded[7]
	const value = discarded[1]

	let pengPlayer = false
	for (const [key, player] of Object.entries(game.players)) {
		let occurence = 0
		for (const tile of player.door) {
			if (tile[7] === type && tile[1] === value) {
				occurence++
			}
		}
		if (occurence > 1) {
			pengPlayer = parseInt(key)
			break
		}
	}

	if (!pengPlayer) return false
	if (pengPlayer === game.currentPlayer) return false

	let meldSet = [discarded]

	for (const tile of game.players[pengPlayer].door) {
		if (tile[7] === type && tile[1] === value) {
			meldSet.push(tile)
		}
	}

	if (pengPlayer === 4) {
		return await humanPengHandling(game, meldSet, pengPlayer)
	}

	return await AIPengHandling(game, meldSet, pengPlayer)
}

async function peng(game, meldSet, meldType, pengPlayer) {
	for (const paizi of meldSet) {
		const index = game.players[pengPlayer].door.findIndex(elem => elem[0] === paizi[0])
		if (index > -1) {
			game.players[pengPlayer].door.splice(index, 1)
		}
	}

	sound(`snd/${meldType}.m4a`)
	displayDoor(pengPlayer, game.players[pengPlayer])
	displayRemoveItem('control-drop', game.currentPlayer)

	if (meldSet.length === 4) {
		meldSet.splice(-1, 1)
	}

	game.players[pengPlayer].melds.push({
		type: meldType,
		key: Math.abs((4 + pengPlayer - game.currentPlayer) % 4 - 1),
		meld: meldSet
	})

	displayMeld(pengPlayer, game.players[pengPlayer])

	// rotate player
	game.players[game.currentPlayer].turn = false
	game.currentPlayer = pengPlayer
	game.players[game.currentPlayer].turn = true
}

async function AIPengHandling(game, meldSet, pengPlayer) {
	// bots will just gang and peng for now
	await delay(1000)
	const meldType = (meldSet.length === 4) ? 'gang' : 'peng'
	peng(game, meldSet, meldType, pengPlayer)
	await delay(1000)

	if (meldType === 'peng') {
		const chosen = game.players[game.currentPlayer].door.at(-1)
		if (chosen !== undefined) {
			displayDiscarded(game.currentPlayer, chosen)
			game.players[game.currentPlayer].discarded = true
			game.players[game.currentPlayer].drop = chosen
			game.players[game.currentPlayer].door.splice(-1, 1)
			sound('snd/clack.m4a')
		}
	}

	return meldType
}

async function humanPengHandling(game, meldSet, pengPlayer) {
	let isPeng = false
	const board = document.getElementById('majiang-board')

	let pengSet = meldSet
	let gangSet = []

	if (meldSet.length === 4) {
		gangSet = meldSet
		pengSet = Object.assign([], gangSet)
		pengSet.splice(-1, 1)
	}

	const meldOverlay = createElement('div', ['meld-overlay'])
	const meldContents = createElement('div', ['meld-contents'])

	const button = createElement('button', '', '❌')
	meldContents.appendChild(button)

	for (let [key, meldSet] of Object.entries([pengSet, gangSet])) {
		if (key == 1 && meldSet.length < 4) break

		const meldText = (key == 0) ? '碰 Peng' : '杠 Gang'
		const meldType = (key == 0) ? 'peng' : 'gang'
		const h1 = createElement('h1', '', meldText)
		meldContents.appendChild(h1)

		const paragraph = createElement('p', ['meld-set'])
		for (const paizi of meldSet) {
			const img = createTile(paizi)
			img.classList.add('meld')
			paragraph.appendChild(img)
		}

		paragraph.addEventListener('click', async() => {
			peng(game, meldSet, meldType, pengPlayer)

			const door = document.getElementById('door' + game.currentPlayer)
			if (!door) return

			if (meldType === 'peng') {
				isPeng = 'peng'
				humanTileHandling(game, door)
				board.removeChild(meldOverlay)
			} else {
				isPeng = 'gang'
				button.click()
			}
		}, {once: true})

		meldContents.appendChild(paragraph)
	}

	modalDrag(meldOverlay, meldContents)

	meldOverlay.appendChild(meldContents)
	board.appendChild(meldOverlay)

	await new Promise(resolve => {
		button.addEventListener('click', async() => { resolve() }, {once: true})
	})

	board.removeChild(meldOverlay)
	return isPeng
}
