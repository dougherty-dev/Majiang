#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module display
 */

import { ALLPLAYERS } from '../../models/tiles.js'

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
		displayRemoveItem('control-drop', key)
	}
}
