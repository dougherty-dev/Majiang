#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module winds
 */

import { ALLPLAYERS, WINDS } from '../../models/tiles.js'

export function displayPrevailingWind(prevailingWind) {
	for (const key of ALLPLAYERS) {
		const prevailing = document.getElementById('prevailing' + key)
		if (!prevailing) return

		prevailing.classList.remove('prevailing')
		if (prevailingWind == key) {
			prevailing.classList.add('prevailing')
		}
	}
}

export function displaySeatWinds(players, prevailingWind) {
	for (const [key, player] of Object.entries(players)) {
		const seat = document.getElementById('seat' + key)
		if (!seat) return

		seat.innerHTML = ''

		const img = document.createElement('img')
		img.width = 17
		img.height = 20
		img.alt = WINDS[player.wind][1]
		img.classList.add('wind')
		img.src = 'img/' + WINDS[player.wind][0] + '.svg'

		seat.appendChild(img)
		seat.classList.remove('prevailing')
		if (prevailingWind == player.wind) {
			seat.classList.add('prevailing')
		}
	}
}
