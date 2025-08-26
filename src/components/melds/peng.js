#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/melds/peng
 */

import { createTile, handleTiles } from '../tiles.js'
import { delay, sound } from '../helpers.js'
import { displayDoor } from '../display/door.js'
import { displayMeld } from '../display/melds.js'
import { displayRemoveItem } from '../display/display.js'
import { modalDrag } from '../drag.js'
import { createElement } from '../elements.js'
import { botDiscard } from '../bot/discard.js'

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
	game.openTiles.push(meldSet[1], meldSet[2]) // discarded tile already in set
	for (const paizi of meldSet) {
		const index = game.players[pengPlayer].door.findIndex(elem => elem[0] === paizi[0])
		if (index > -1) {
			game.players[pengPlayer].door.splice(index, 1)
		}
	}

	sound(`snd/${meldType}.m4a`)
	displayDoor(pengPlayer, game.players[pengPlayer])
	displayRemoveItem('control-drop', game.currentPlayer)

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
	await delay(1000)
}

async function AIPengHandling(game, meldSet, pengPlayer) {
	if (meldSet.length === 4 && game.tiles.length < 1) {
		return false
	}

	await delay(1000)
	const meldType = (meldSet.length === 4) ? 'gang' : 'peng'
	await peng(game, meldSet, meldType, pengPlayer)

	if (meldType === 'peng') {
		await botDiscard(game)
	}

	return meldType
}

async function humanPengHandling(game, meldSet, pengPlayer) {
	let isPeng = false
	const board = document.getElementById('majiang-board')

	let pengSet = Object.assign([], meldSet)
	let gangSet = []

	if (meldSet.length === 4) {
		gangSet = Object.assign([], meldSet)
		pengSet.splice(-1, 1)
	}
	if (meldSet.length === 4 && game.tiles.length < 2) gangSet = []

	const meldOverlay = createElement('div', ['meld-overlay'])
	const meldContents = createElement('div', ['meld-contents'])

	const button = createElement('button', '', '❌')
	meldContents.appendChild(button)

	for (let [key, set] of Object.entries([pengSet, gangSet])) {
		if (key == 1 && set.length < 4) break

		const meldText = (key == 0) ? '碰 Peng' : '杠 Gang'
		const meldType = (key == 0) ? 'peng' : 'gang'
		const h1 = createElement('h1', '', meldText)
		meldContents.appendChild(h1)

		const paragraph = createElement('p', ['meld-set'])
		for (const paizi of set) {
			const img = createTile(paizi)
			img.classList.add('meld')
			paragraph.appendChild(img)
		}

		paragraph.addEventListener('click', async() => {
			peng(game, set, meldType, pengPlayer)

			const door = document.getElementById('door' + game.currentPlayer)
			if (!door) return

			if (meldType === 'peng') {
				isPeng = 'peng'
				if (meldOverlay) meldOverlay.remove()

				handleTiles(game, door)
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

	if (meldOverlay) meldOverlay.remove()
	return isPeng
}
