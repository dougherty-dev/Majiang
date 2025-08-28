#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/tiles
 * @description Display functions pertaining tiles.
 * @property {function} hiliteToggle Find and hilite all similar (open) tiles on the board.
 * @property {function} displayHiliteTiles Initiate hiliting.
 * @property {function} displayTileCount Display number of tiles left in wall.
 * @property {function} displayDiscarded Display the discarded tile in the drop zone.
 */

import { createTile } from '../tiles.js'

/**
 * Find and hilite all similar (open) tiles on the board.
 * @param {string} target DOM node ID.
 */
function hiliteToggle(target) {
	toggle(target, 'mouseover')
	toggle(target, 'mouseout')
	toggle(target, 'dblclick')

	function toggle(target, event) {
		target.addEventListener(event, hilite)

		async function hilite(e) {
			const target = e.target

			if (target.nodeName === 'IMG' && target.classList.contains('mt')) {
				const alt = target.getAttribute('alt')
				const images = document.querySelectorAll(`img[alt='${alt}']`)

				if (event === 'mouseover') {
					for (const image of images) {
						image.classList.add('hilite')
						setTimeout(() => {
							image.classList.remove('hilite')
						}, 10000)
					}
					return
				}

				for (const image of images) {
					image.classList.remove('hilite')
				}
			}
		}
	}
}

/**
 * Initiate hiliting.
 */
export function displayHiliteTiles() {
	const board = document.getElementById('majiang-board')
	if (!board) return

	hiliteToggle(board)
}

/**
 * Display number of tiles left in wall.
 * @param {number} tileCount 
 */
export function displayTileCount(tileCount) {
	const elem = document.getElementById('tiles')
	if (!elem) return

	elem.textContent = tileCount
}

/**
 * Display the discarded tile in the drop zone.
 * @param {number} key Player number.
 * @param {object} tile The tile.
 * @returns 
 */
export function displayDiscarded(key, tile) {
	const control = document.getElementById('control-drop' + key)
	if (!control) return

	const img = createTile(tile)
	if (!img) return
	control.appendChild(img)
}
