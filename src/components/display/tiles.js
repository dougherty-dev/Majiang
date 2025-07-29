#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/display/tiles
 */

import { createTile } from '../../components/tiles.js'

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

export function displayHiliteTiles() {
	const table = document.getElementById('majiang-table')
	if (!table) return

	hiliteToggle(table)
}

export function displayTileCount(tileCount) {
	const elem = document.getElementById('tiles')
	if (!elem) return

	elem.textContent = tileCount
}

export function displayDiscarded(key, tile) {
	const control = document.getElementById('control-drop' + key)
	if (!control) return

	const img = createTile(tile)
	if (!img) return
	control.appendChild(img)
}
