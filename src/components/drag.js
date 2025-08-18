#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/drag
 */

import { sortTiles } from './helpers.js'
import { displayDoor } from './display/door.js'

export function enableDrag(game) {
	const humanPlayer = 4
	const door = document.getElementById('door' + humanPlayer)
	if (!door) return

	let item = null

	door.addEventListener('dragstart', (e) => {
		item = e.target
		e.target.classList.add('dragstart')
		door.lastChild.classList.remove('tile-divider')
		game.sorted = true
	})

	door.addEventListener('dragend', (e) => {
		e.target.classList.remove('dragstart')
		item = null
	})

	let dx = 0
	door.addEventListener('dragover', (e) => {
		e.preventDefault()

		const x = e.clientX
		if (x > dx) {
			e.target.classList.add('dragright')
			e.target.classList.remove('dragleft')
		} else if (x < dx) {
			e.target.classList.add('dragleft')
			e.target.classList.remove('dragright')
		}
		dx = x
	})

	door.addEventListener('dragleave', (e) => {
		e.preventDefault()
		e.target.classList.remove('dragright', 'dragleft')
	})

	door.addEventListener('drop', (e) => {
		e.preventDefault()
		e.target.classList.remove('dragright', 'dragleft')

		if (e.target && e.target !== item && e.target.classList.contains('t')) {
			const draggedIndex = [...door.children].indexOf(item)
			const targetIndex = [...door.children].indexOf(e.target)

			if (draggedIndex < targetIndex) {
				door.insertBefore(item, e.target.nextSibling)
			} else {
				door.insertBefore(item, e.target)
			}
		}

		const datasets = []
		const items = Array.from(door.children)

		items.forEach(item => {
			datasets.push(parseInt(item.dataset.id))
		})

		game.players[humanPlayer].door = datasets.map(
			order => game.players[humanPlayer].door.find(item => item[0] === order)
		)
	})

	const sort = document.getElementById('sort')
	sort.addEventListener('click', () => {
		game.sorted = false
		sortTiles(game.players[humanPlayer].door, game.sorted)
		displayDoor(humanPlayer, game.players[humanPlayer])
	})
}

export function modalDrag(overlay, contents) {
	let dragging = false
	let offsetX, offsetY

	contents.addEventListener('mousedown', (e) => {
		dragging = true
		offsetX = e.clientX - contents.getBoundingClientRect().left
		offsetY = e.clientY - contents.getBoundingClientRect().top
	})

	overlay.addEventListener('mousemove', (e) => {
		if (!dragging) return
		contents.style.left = (e.clientX - offsetX) + 'px'
		contents.style.top = (e.clientY - offsetY) + 'px'
	})

	overlay.addEventListener('mouseup', () => {
		dragging = false
	})

	window.addEventListener('resize', () => {
		const newLeft = window.innerWidth - contents.offsetWidth - 30
		const newTop = window.innerHeight - contents.offsetHeight - 60

		if (!dragging) {
			contents.style.left = newLeft + 'px'
			contents.style.top = newTop + 'px'
		}
	})

	window.addEventListener('hashchange', () => {
		overlay.remove()
	})
}
