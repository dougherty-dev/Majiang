#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module helpers
 */

export function getRandomInt(min, max) {
	return min + (max- min + 1) * crypto.getRandomValues(new Uint32Array(1))[0]/2**32|0
}

export function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function shuffle(tiles) {
	const randval = new Uint32Array(tiles.length)

	let current = tiles.length
	let random

	while (current !== 0) {
		crypto.getRandomValues(randval)

		random = Math.floor(randval[current - 1] / (0xFFFFFFFF + 1) * current)
		current--

		[tiles[current], tiles[random]] = [tiles[random], tiles[current]]
	}

	return tiles
}

export function sound(src) {
	const promise = new Audio(src).play()
	if (promise !== undefined) {
		promise.then(_ => {}).catch(__ => {}) // eslint-disable-line
	}
}

export function rot4(east, number) {
	return Math.abs(4 + number - east) % 4 + 1
}

export function modIncrease(number) {
	return Math.abs(number) % 4 + 1
}

export function sortTiles(tiles, ignore = false) {
	if (!ignore) {
		tiles.sort((a, b) => a[2].localeCompare(b[2]))
	}
}
