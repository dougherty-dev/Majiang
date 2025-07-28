#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module meld-chi
 */

import { SHUZIPAI } from './tiles.js'
import { createTile, humanTileHandling } from '../components/tiles.js'
import { sortTiles, modIncrease, sound } from '../components/helpers.js'
import { displayDoor, displayMeld, displayRemoveItem } from '../components/display.js'
import { modalDrag } from '../components/drag.js'
import { createElement } from '../components/elements.js'

export async function checkChi(game, tile) {
	const nextPlayer = modIncrease(game.currentPlayer)
	if (game.players[nextPlayer].door.length < 4) return false

	const type = tile[7]
	const value = tile[1]

	if (!SHUZIPAI.includes(type)) return

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
		if (paizi[3].startsWith(type)) {
			door.push(parseInt(paizi[3].split(' ')[1]))
		}
	}

	const set = [...new Set(door)].sort()

	let melds = []
	for (const pattern of patterns) {
		if (pattern.every(value => set.includes(value))) {
			melds.push(pattern)
		}
	}

	let meldTiles = []
	let chiSet
	let index
	const hand = Array.from(game.players[nextPlayer].door)

	for (let meld of melds) {
		chiSet = [tile]
		for (const paizi of meld) {
			index = hand.findIndex(elem => elem[1] === paizi && elem[3].startsWith(type))
			chiSet.push(hand[index])
		}

		sortTiles(chiSet)
		meldTiles.push(chiSet)
	}

	if (meldTiles.length && nextPlayer === 4) {
		return await humanChiHandling(game, meldTiles)
	}

	return await AIChiHandling(game, meldTiles)
}

async function AIChiHandling(game, meldTiles) {

}

async function humanChiHandling(game, meldTiles) {
	const meldOverlay = createElement('div', ['meld-overlay'])
	const meldContents = createElement('div', ['meld-contents'])

	const h1 = createElement('h1', '', '吃 Chi')
	const button = createElement('button', '', '❌')
	meldContents.append(h1, button)

	for (const meldSet of meldTiles) {
		const paragraph = createElement('p', ['meld-set'])
		for (const paizi of meldSet) {
			let img = createTile(paizi)
			img.classList.add('meld')
			paragraph.appendChild(img)
		}

		paragraph.addEventListener('click', async() => {
			game.players[4].melds.push({
				type: 'chi',
				from: game.currentPlayer,
				meld: meldSet
			})

			displayMeld(4, game.players[4])

			for (const paizi of meldSet) {
				const index = game.players[4].door.findIndex(elem => elem[0] === paizi[0])
				if (index > -1) {
					game.players[4].door.splice(index, 1)
				}
			}

			displayDoor(4, game.players[4])
			displayRemoveItem('control-drop', game.currentPlayer)
			sound('snd/chi.m4a')

			// rotate player
			game.players[game.currentPlayer].turn = false
			game.currentPlayer = modIncrease(game.currentPlayer)
			game.players[game.currentPlayer].turn = true

			document.body.removeChild(meldOverlay)
			const door = document.getElementById('door' + game.currentPlayer)
			if (!door) return

			humanTileHandling(game, door)
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
