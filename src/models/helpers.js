#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module helpers
 */

export function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function shuffle(array) {
	let currentIndex = array.length
	let randomIndex

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}

	return array
}
