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

export function hiliteHelper(table, event, fn) {
	table.removeEventListener(event, hilite)
	table.addEventListener(event, hilite)
		
	async function hilite(e) {
		const target = e.target

		if (target.nodeName === 'IMG' && target.classList.contains('t')) {
			const src = target.getAttribute('src')
			const images = document.querySelectorAll(`img[src='${src}']`)

			for (const image of images) {
				switch (fn) {
				case 'add':
					image.classList.add('hilite')
					break
				case 'remove':
					image.classList.remove('hilite')
					break
				}
			}
		}
	}
}

export function mod4(east, number) {
	let mod = (east + number - 1) % 4
	return mod === 0 ? 4 : mod
}
