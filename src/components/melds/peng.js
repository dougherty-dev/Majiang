#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/melds/peng
 * @description Actions when opportunity to meld a kezi or open gangzi.
 * @property {function} checkPeng Probe if a kezi/gangzi can be formed from discarded tile.
 * @property {function} peng Move kezi/gangzi tiles from door and drop zone to melded set.
 * @property {function} AIPengHandling Bot handling of kezi/gangzi, will always peng/gang.
 * @property {function} humanPengHandling Human player interactive handling of kezi/gangzi.
 */

import { createTile, handleTiles } from '../tiles.js'
import { delay, sound } from '../helpers.js'
import { displayDoor } from '../display/door.js'
import { displayMeld } from '../display/melds.js'
import { displayRemoveItem } from '../display/display.js'
import { modalDrag } from '../drag.js'
import { createElement } from '../elements.js'
import { botDiscard } from '../bot/discard.js'

/**
 * Probe if a kezi/gangzi can be formed from discarded tile, and what to do with it.
 * @param {object} game The game parameters.
 * @param {object} discarded The discarded tile potentially forming a kezi/gangzi.
 * @returns {promise<boolean>}
 */
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

/**
 * Move kezi/gangzi tiles from door and drop zone to melded set, update displayed melds.
 * @param {object} game The game parameters.
 * @param {object} meldSet The kezi/gangzi array of tiles.
 * @param {string} meldType The type of meld, kezi or gangzi.
 * @param {number} pengPlayer Player number melding the kezi/gangzi.
 */
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

	// Rotate players.
	game.players[game.currentPlayer].turn = false
	game.currentPlayer = pengPlayer
	game.players[game.currentPlayer].turn = true
	await delay(1000)
}

/**
 * Bot handling of kezi/gangzi, will always peng/gang.
 * @param {object} game The game parameters.
 * @param {object} meldSet The kezi/gangzi array of tiles.
 * @param {number} pengPlayer Player number melding the kezi/gangzi.
 * @returns {promise<string>}
 */
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

/**
 * Human player interactive handling of kezi/gangzi.
 * @param {object} game The game parameters.
 * @param {object} meldSet The kezi/gangzi array of tiles.
 * @param {number} pengPlayer Player number melding the kezi/gangzi.
 * @returns {promise<false|string>}
 */
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

		// Accept kezi/gangzi.
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

	// Dismiss kezi/gangzi.
	await new Promise(resolve => {
		button.addEventListener('click', async() => { resolve() }, {once: true})
	})

	if (meldOverlay) meldOverlay.remove()
	return isPeng
}
