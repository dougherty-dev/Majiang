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

export function sound(src) {
	const promise = new Audio(src).play()
	if (promise !== undefined) {
		// eslint-disable-next-line no-unused-vars
		promise.then(_ => {
		// eslint-disable-next-line no-unused-vars
		}).catch(error => {
		})
	}
}

export function hiliteToggle(target) {
	toggle(target, 'mouseover')
	toggle(target, 'mouseout')
	toggle(target, 'click')

	function toggle(target, event) {
		target.addEventListener(event, hilite)

		async function hilite(e) {
			const target = e.target

			if (target.nodeName === 'IMG' && target.classList.contains('t')) {
				const src = target.getAttribute('src')
				const images = document.querySelectorAll(`img[src='${src}']`)

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

export function zoomToggle(target) {
	toggle(target, 'mouseover')
	toggle(target, 'mouseout')

	function toggle(target, event) {
		target.addEventListener(event, zoom)

		async function zoom(e) {
			const target = e.target

			if (target.nodeName === 'IMG' && target.classList.contains('t')) {
				if (event === 'mouseover') {
					target.classList.add('pick')
					return
				}

				target.classList.remove('pick')
			}
		}
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
