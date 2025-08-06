#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/display
 */

import { ALLPLAYERS } from '../../models/tiles.js'
import { MAJIANGAVATAR } from '../../config.js'
import { displayFloors, displayRound } from './floor.js'
import { displayHiliteTiles, displayTileCount } from './tiles.js'
import { displayMelds } from './melds.js'
import { enableDrag } from '../../components/drag.js'
import { displayPrevailingWind, displaySeatWinds } from './winds.js'
import { displayDoors } from './door.js'
import { displayFlowers } from './flowers.js'

export function displayPoints(players) {
	for (const [key, player] of Object.entries(players)) {
		const points = document.getElementById('points' + key)
		if (!points) return

		points.textContent = player.points
	}
}

export function displayRemoveItem(item, key) {
	const elem = document.getElementById(item + key)
	if (!elem) return

	elem.innerHTML = ''
}

function killNode(target, key) {
	const elem = document.getElementById(target + key)
	if (!elem) return

	elem.innerHTML = ''
	elem.replaceWith(elem.cloneNode(true))
}

export async function  displayClearBoard() {
	for (const key of ALLPLAYERS) {
		killNode('door', key)
		killNode('control-drop', key)
		displayRemoveItem('flowers', key)
		displayRemoveItem('melds', key)
		displayRemoveItem('control-player', key)
	}

	const board = document.getElementById('majiang-board')
	if (board) board.replaceWith(board.cloneNode(true))
}

export async function displaySetAvatar() {
	const avatar = localStorage.getItem(MAJIANGAVATAR)
	const user = document.getElementById('grid-user4')
	if (avatar && user) {
		user.style.backgroundImage =
			'url(' + `img/avatar/${avatar}.svg` + ')'
	}
}

export async function layoutGame(game) {
	if (!game) return

	displayClearBoard()
	displayRound(game.round, game.rotation, game.hand)
	displaySetAvatar()
	displayPrevailingWind(game.prevailingWind)
	displaySeatWinds(game.players, game.prevailingWind)
	displayDoors(game.players)
	enableDrag(game)
	displayMelds(game.players)
	displayFlowers(game.players)
	displayFloors(game.players)
	displayPoints(game.players)
	displayTileCount(game.tiles.length)
	displayHiliteTiles()
}
