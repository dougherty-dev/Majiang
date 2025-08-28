#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/helpers
 * @description Routines for storing game data in local storage.
 * @property {function} delay Delay execution for some time.
 * @property {function} randInt Random integer within an interval.
 * @property {function} shuffle Randomly shuffle array of tiles.
 * @property {function} sound Play a sound file.
 * @property {function} rot4 Helper to shift winds.
 * @property {function} modIncrease Increase player number while keeping numbers in range 1–4.
 * @property {function} sortTiles Sort tiles by short name bing2, tiao3, wan4, zi3 etc.
 * @property {function} zhuangjiaBanker Determine who has eastern seat wind.
 */

/**
 * Delay execution for some time.
 * @param {number} ms Time in milliseconds.
 * @returns {promise}
 */
export function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Random integer within an interval.
 * @param {number} min From.
 * @param {number} max To.
 * @returns {number}
 */
export function randInt(min, max) {
	return min + (max - min + 1) * crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32 | 0
}

/**
 * Randomly shuffle array of tiles.
 * @param {object} tiles Array of tiles.
 * @returns {object} The shuffled array.
 */
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

/**
 * Play a sound file.
 * @param {string} src The sound file source name.
 */
export function sound(src) {
	const promise = new Audio(src).play()
	if (promise !== undefined) {
		// jshint unused:false
		promise.then(() => {}).catch((error) => {}) // eslint-disable-line
	}
}

/**
 * Helper to shift winds.
 * @param {number} east Current eastern wind.
 * @param {number} number Wind to rotate.
 * @returns {number} 1–4.
 */
export function rot4(east, number) {
	return modIncrease(4 + number - east)
}

/**
 * Increase player number while keeping numbers in range 1–4.
 * @param {number} number The number to be increased.
 * @returns {number} 1–4.
 */
export function modIncrease(number) {
	return Math.abs(number) % 4 + 1
}

/**
 * Sort tiles by short name bing2, tiao3, wan4, zi3 etc.
 * @param {object} tiles The array of tiles.
 * @param {boolean} ignore Whether to ignore sorting (bot tiles are unsorted)
 */
export function sortTiles(tiles, ignore = false) {
	if (tiles && !ignore) {
		tiles.sort((a, b) => a[2].localeCompare(b[2]))
	}
}

/**
 * Determine who has eastern seat wind.
 * @param {object} players The players structure.
 * @returns {number} Player number 1–4.
 */
export function zhuangjiaBanker(players) {
	return Object.values(players).findIndex(obj => obj.wind === 1) + 1
}
