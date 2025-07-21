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

export function hiliteToggle(target) {
	toggle(target, 'mouseover')
	toggle(target, 'mouseout')

	function toggle(target, event) {
		target.addEventListener(event, hilite)

		async function hilite(e) {
			const target = e.target

			if (target.nodeName === 'IMG' && target.classList.contains('t')) {
				const src = target.getAttribute('src')
				const images = document.querySelectorAll(`img[src='${src}']`)

				for (const image of images) {
					image.classList.toggle('hilite')
				}
			}
		}
	}
}

export function zoomToggle(target) {
	toggle(target, 'mouseover')
	toggle(target, 'mouseout')

	function toggle(target, event) {
		target.addEventListener(event, zoom)

		async function zoom(e) {
			const target = e.target

			if (target.nodeName === 'IMG' && target.classList.contains('t')) {
				target.classList.toggle('pick')
			}
		}
	}
}

export function rot4(east, number) {
	return Math.abs(4 + number - east) % 4 + 1
}

export function modIncrease(number) {
	let res = Math.abs(number + 1) % 4
	return (res === 4) ? 1 : res
}

export function sortTiles(tiles) {
	tiles.sort((a, b) => a[1].localeCompare(b[1]))
}
