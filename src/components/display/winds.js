#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/winds
 */

import { ALLPLAYERS } from '../../models/constants.js'
import { WINDS } from '../../models/tiles.js'
import { createElement } from '../elements.js'

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

		const img = createElement('img', ['wind'], '', 'seatwind' + key)
		img.width = 17
		img.height = 20
		img.alt = WINDS[player.wind][1]
		img.src = 'img/' + WINDS[player.wind][0] + '.svg'

		seat.appendChild(img)
		seat.classList.remove('prevailing')
		if (prevailingWind == player.wind) {
			seat.classList.add('prevailing')
		}

		if (1 == player.wind) {
			seat.lastChild.classList.add('banker')
		}
	}

	document.getElementById('seatwind4').addEventListener('click', avatar)
}

async function avatar() {
	const avatarOverlay = createElement('div', ['avatar-overlay'])
	const avatarContents = createElement('div', ['avatar-contents'])

	const button = createElement('button', '', '❌')
	avatarContents.appendChild(button)

	const h1 = createElement('h1', '', 'Choose avatar')
	avatarContents.appendChild(h1)

	const paragraph = createElement('p', ['avatar-set'])
	for (let i = 0; i <= 16; i++) {
		const img = createElement('img', ['avatar'], '', 'avatar' + i)
		img.src = 'img/avatar/avatar' + i + '.svg'
		img.width = 40
		img.height = 40
		img.alt = i
		paragraph.appendChild(img)
	}

	paragraph.addEventListener('click', async(e) => {
		const target = e.target
		if (target.nodeName === 'IMG' && target.classList.contains('avatar')) {
			localStorage.setItem('Majiang_avatar', target.id)
			document.getElementById('grid-user4').style.backgroundImage = 'url(' + `img/avatar/${target.id}.svg` + ')'
			if (avatarOverlay) avatarOverlay.remove()
		}
	}, {once: true})

	avatarContents.appendChild(paragraph)

	avatarOverlay.appendChild(avatarContents)
	document.body.appendChild(avatarOverlay)

	await new Promise(resolve => {
		button.addEventListener('click', async() => { resolve() }, {once: true})
	})

	if (avatarOverlay) avatarOverlay.remove()
}
