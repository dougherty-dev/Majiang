#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module display
 */

import { createTile } from '../../components/tiles.js'

export function displayDiscarded(key, tile) {
	const control = document.getElementById('control-drop' + key)
	if (!control) return

	const img = createTile(tile)
	if (!img) return
	control.appendChild(img)
}
