#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/display
 * @description Various display functions.
 * @property {Function} displayPoints Paints the current points for all players.
 * @property {Function} displayRemoveItem Helper to clear contents from DOM elements.
 * @property {Function} killNode Stripping and cloning a node, killing event listeners.
 * @property {Function} displayClearBoard Clear the entire board of tiles.
 * @property {Function} displaySetAvatar Display the chosen avatar for human player.
 * @property {Function} layoutGame Draw everything on the board after setup.
 * @property {Function} displayExit Display hint required fan points for exit.
 * @property {Function} fadeOut Helper: fade out and remove exit point hint.
 */

import { ALLPLAYERS, MAJIANGAVATAR } from '../../models/constants.js'
import { displayFloors, displayRound } from './floor.js'
import { displayHiliteTiles, displayTileCount } from './tiles.js'
import { displayMelds } from './melds.js'
import { enableDrag } from '../drag.js'
import { displayPrevailingWind, displaySeatWinds } from './winds.js'
import { displayDoors } from './door.js'
import { displayFlowers } from './flowers.js'
import { sound } from '../helpers.js'

/**
 * Paints the current points for all players.
 * @param {Object} players The players structure.
 */
export function displayPoints(players) {
	for (const [key, player] of Object.entries(players)) {
		const points = document.getElementById('points' + key)
		if (!points) return

		points.textContent = player.points
	}
}

/**
 * Helper to clear contents from DOM elements.
 * @param {string} item ID base.
 * @param {number} key Player number.
 */
export function displayRemoveItem(item, key) {
	const elem = document.getElementById(item + key)
	if (!elem) return

	elem.innerHTML = ''
}

/**
 * Stripping and cloning a node, killing event listeners.
 * @param {string} target ID base.
 * @param {number} key Player number.
 * @returns 
 */
function killNode(target, key) {
	const elem = document.getElementById(target + key)
	if (!elem) return

	elem.innerHTML = ''
	elem.replaceWith(elem.cloneNode(true))
}

/**
 * Clear the entire board of tiles.
 */
export async function displayClearBoard() {
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

/**
 * Display the chosen avatar for human player.
 */
export async function displaySetAvatar() {
	const avatar = localStorage.getItem(MAJIANGAVATAR)
	const user = document.getElementById('grid-user4')
	if (avatar && user) {
		user.style.backgroundImage =
			'url(' + `img/avatar/${avatar}.svg` + ')'
	}
}

/**
 * Draw everything on the board after setup.
 * @param {Object} game The game parameters.
 */
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

/**
 * Display hint for human player about required fan points for exit, when fan < 8.
 * @param {number} points 
 * @param {number} required 
 */
export async function displayExit(points, required) {
	const exit = document.getElementById('exit')
	if (exit) {
		sound('snd/note.m4a')
		exit.innerHTML = `${points} / ${required} 番`
		await fadeOut(exit, 4000)
		exit.innerHTML = ''
	}
}

/**
 * Helper: fade out and remove exit point hint.
 * @param {string} element DOM node.
 * @param {number} durationInMs Time in milliseconds.
 * @returns {Promise}
 */
async function fadeOut(element, durationInMs) {
	return new Promise((resolve) => {
		const animation = element.animate(
			[
				{ opacity: '1' },
				{ opacity: '0' }
			],
			{
				duration: durationInMs,
				easing: 'linear',
				fill: 'forwards'
			}
		)
		animation.onfinish = () => resolve()
	})
}
