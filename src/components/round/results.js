#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/results
 */

import { ALLPLAYERS, HUMANPLAYER, MAJIANGAVATAR } from '../../models/constants.js'
import { createElement } from '../elements.js'
import { newRound } from './new-round.js'
import { delay, sortTiles, sound } from '../helpers.js'
import { displayRound } from '../display/floor.js'
import { displayPoints } from '../display/display.js'
import { revealDoors } from '../display/door.js'
import { revealMelds } from '../display/melds.js'
import { play } from '../play.js'
import { createTile } from '../tiles.js'

export async function displayResults(game, key, door, points) {
	await delay(500)
	revealDoors(game.players)
	revealMelds(game.players)

	const board = document.getElementById('majiang-board')

	const resultsOverlay = createElement('div', ['results-overlay'])
	const resultsContents = createElement('div', ['results-contents'])

	const h1 = createElement('h1', '', 'Results')
	resultsContents.appendChild(h1)

	if (game.winner) {
		let icon = `user${key}`
		if (key == HUMANPLAYER) {
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

		resultsContents.appendChild(image)
	}

	const player = key == HUMANPLAYER ? 'You' : `Player ${key}`
	const msg = game.draw ? 'Draw' : `${player} won the round`

	const h2 = createElement('h2', '', msg)
	resultsContents.appendChild(h2)

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
		const score = Object.entries(points.fanzhong).filter(arr => arr[1][4] > 0)

		await delay(1500)
		for (const point of Object.values(score)) {
			const fan = createElement('p', ['fan'])
			fan.textContent = `${point[0]}: ${point[1][0]} ${point[1][1]} | ${point[1][2]}: ${point[1][4]} p`
			resultsContents.appendChild(fan)
			sound(`snd/fanzhong/${point[0]}.m4a`)
			await delay(1500)
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

	if (resultsOverlay) resultsOverlay.remove()

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
