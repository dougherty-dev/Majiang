#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/results
 */

import { MAJIANGAVATAR } from '../../config.js'
import { createElement } from '../elements.js'
import { ALLPLAYERS } from '../../models/tiles.js'
import { newRound } from './new-round.js'
import { delay, sortTiles, sound } from '../helpers.js'
import { displayRound } from '../display/floor.js'
import { displayPoints } from '../display/display.js'
import { play } from '../play.js'
import { createTile } from '../tiles.js'

import Points from '../../models/points.js'

export async function displayResults(game, key, door) {
	const board = document.getElementById('majiang-board')

	const resultsOverlay = createElement('div', ['results-overlay'])
	const resultsContents = createElement('div', ['results-contents'])

	const h1 = createElement('h1', '', 'Results')
	resultsContents.appendChild(h1)

	const player = key == 4 ? 'You' : `Player ${key}`
	const msg = game.draw ? 'Draw' : `${player} won the round`

	let icon = `user${key}`
	if (key == 4) {
		const avatar = localStorage.getItem(MAJIANGAVATAR)
		if (avatar) {
			icon = `avatar/${avatar}`
		}
	}

	const image = createElement('img', ['profile'])
	image.height = 50
	image.width = 50
	image.alt = `Player ${key}`
	image.src = `img/${icon}.svg`

	const h2 = createElement('h2', '', msg)
	resultsContents.append(image, h2)

	if (door.length) {
		const paragraph = createElement('p', ['results-set'])

		sortTiles(door)
		for (const tile of door) {
			const img = createTile(tile)
			img.classList.add('results')
			paragraph.appendChild(img)
		}

		resultsContents.appendChild(paragraph)
	}

	resultsOverlay.appendChild(resultsContents)
	board.appendChild(resultsOverlay)

	if (game.winner) {
		const points = new Points(game, key, door)
		await points.fanPoints()
		const score = Object.entries(points.fanzhong).filter(arr => arr[1][4] > 0)

		await delay(1200)
		for (const point of Object.values(score)) {
			const fan = createElement('p', ['fan'])
			fan.textContent = `${point[1][0]} ${point[1][1]} | ${point[1][2]}: ${point[1][4]} p`
			resultsContents.appendChild(fan)
			sound(`snd/fanzhong/${point[0]}.m4a`)
			await delay(1200)
		}

		const fan = createElement('p', ['fan'])
		fan.textContent = `Sum: ${points.points} p`
		resultsContents.appendChild(fan)

		points.sumPoints(game, key)
		displayPoints(game.players)
	}

	const ok = createElement('button', '', 'OK')
	resultsContents.appendChild(ok)

	await new Promise(resolve => {
		ok.addEventListener('click', async() => { resolve() }, { once: true })
	})

	board.removeChild(resultsOverlay)

	for (const index of ALLPLAYERS) {
		game.players[index].door = []
		game.players[index].melds = []
		game.players[index].flowers = []
		game.players[index].floor = []
		game.players[index].drop = null
		game.players[index].discarded = null
		game.players[index].tingpai = null
	}

	displayRound(game.round, game.rotation, game.hand)

	if (await newRound(game)) {
		play(game)
	}
}
