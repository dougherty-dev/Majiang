#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/Majiang
 */

import { VERSION } from '../config.js'
import { ALLPLAYERS, AIPLAYERS, HUAPAI, TILES } from './tiles.js'
import { getRandomInt } from '../components/helpers.js'
import { createTile, humanTileHandling } from '../components/tiles.js'
import { delay, shuffle, sortTiles, modIncrease, sound } from '../components/helpers.js'
import { displaySetAvatar, displayClearBoard, displayPoints, displayRemoveItem } from '../components/display/display.js'
import { displayAddToDoor, displayDoor, displayDoors } from '../components/display/door.js'
import { displayFloor, displayFloors, displayRound } from '../components/display/floor.js'
import { displayFlower, displayFlowers } from '../components/display/flowers.js'
import { displayHiliteTiles, displayTileCount, displayDiscarded } from '../components/display/tiles.js'
import { displayPrevailingWind, displaySeatWinds } from '../components/display/winds.js'
import { displayMelds } from '../components/display/melds.js'
import { determineSeatWinds } from '../components/winds.js'
import { enableDrag } from '../components/drag.js'
import { checkAngang } from '../components/melds/angang.js'
import { checkJiagang } from '../components/melds/jiagang.js'
import { checkPeng } from '../components/melds/peng.js'
import { checkChi } from '../components/melds/chi.js'
import { checkZimo } from '../components/hu/zimo.js'
import { checkDianhu } from '../components/hu/dianhu.js'
import { fetchGame, saveGame } from '../components/gameio.js'
import { createElement } from '../components/elements.js'

import Players from './players.js'

export default class Majiang {
	constructor() {
		this.game = null
		this.newGame = false
		this.hashListen()
	}

	hashListen() {
		window.addEventListener('hashchange', () => {
			this.hashLocator()
		})

		this.hashLocator()
	}

	async hashLocator() {
		this.newGameListen()

		if (location.hash === '#board') {
			if (!this.newGame) {
				this.game = fetchGame()
				this.layoutGame()
			} else {
				this.newGame = false
			}
		}
	}

	newGameListen() {
		const button = document.getElementById('new-game')
		if (!button) return

		button.onclick = async() => {
			this.newGame = true
			this.game = null
			await saveGame(this.game)

			window.addEventListener('hashchange', async() => {
				await displayClearBoard()
				displaySetAvatar()
				await this.initGame()
				await this.layoutGame()
			}, { once: true })

			location.hash = 'board'
		}
	}

	async layoutGame() {
		if (!this.game) return

		displayClearBoard()
		displayRound(this.game.round, this.game.hand)
		displaySetAvatar()
		displayPrevailingWind(this.game.prevailingWind)
		displaySeatWinds(this.game.players, this.game.prevailingWind)
		displayDoors(this.game.players)
		enableDrag(this.game)
		displayMelds(this.game.players)
		displayFlowers(this.game.players)
		displayFloors(this.game.players)
		displayPoints(this.game.players)
		displayTileCount(this.game.tileCount)
		displayHiliteTiles()

		this.play()
	}

	async initGame() {
		this.game = {
			version: VERSION,
			active: true,
			round: 1,
			hand: 0,
			prevailingWind: 1,
			currentPlayer: null,
			tiles: null,
			tileCount: null,
			sorted: false,
			players: new Players().players
		}

		this.game.players[1].wind = getRandomInt(1, 4)
		for (const index of [2, 3, 4]) {
			this.game.players[index].wind = modIncrease(this.game.players[index - 1].wind)
		}

		this.game.currentPlayer = this.currentPlayer()

		await this.newRound()
	}

	async replaceFlowers() {
		let tileCopy
		let playing = true

		window.addEventListener('hashchange', () => { playing = false }, { once: true })

		for await (const [key, player] of Object.entries(this.game.players)) {
			for (let [index, tile] of Object.entries(player.door)) {
				while (HUAPAI.includes(tile)) {
					if (!playing) return

					tileCopy = tile
					player.flowers.push(tile)

					tile = this.takeTile()
					if (tile) {
						player.door.splice(index, 1, tile)
						displayDoor(key, player)
						await displayFlower(key, tileCopy)
					}
				}
			}

			sortTiles(player.door, this.game.sorted)
			displayDoor(key, player)
		}
	}

	currentPlayer() {
		return Object.values(this.game.players).findIndex(obj => obj.wind === 1) + 1
	}

	currentDiscarded() {
		for (const [key, player] of Object.entries(this.game.players)) {
			if (player.discarded) { return parseInt(key) }
		}
	}

	takeTile() {
		if (this.game.tiles.length) {
			const tile = this.game.tiles.shift()
			this.game.tileCount = this.game.tiles.length
			displayTileCount(this.game.tileCount)
			return tile
		}

		return false
	}

	humanPlayer() {
		return this.game.currentPlayer === 4
	}

	async play() {
		this.observeDrop()
		this.observeNewTile()
		this.newTile()
	}

	observeNewTile() {
		const options = { childList: true }

		for (const key of AIPLAYERS) {
			let door = document.getElementById('door' + key)
			if (!door) return

			let callback = async(mutationList, observer) => { // eslint-disable-line
				// player has a new tile?

				if (!door.lastChild || !door.lastChild.classList.contains('tile-divider')) return

				if (await this.newTileChecks(key)) return

				await delay(1000)

				const chosen = this.game.players[this.game.currentPlayer].door.at(-1)
				if (chosen === undefined) return

				displayDiscarded(this.game.currentPlayer, chosen)
				this.game.players[this.game.currentPlayer].discarded = true
				this.game.players[this.game.currentPlayer].drop = chosen
				this.game.players[this.game.currentPlayer].door.splice(-1, 1)
				sound('snd/clack.m4a')
			}

			const observer = new MutationObserver(callback)

			window.addEventListener('hashchange', () => { observer.disconnect() })

			try {
				observer.observe(door, options)
			} catch (error) {
				console.log(error)
			}
		}
	}

	// act on tile being dropped into control center
	async observeDrop() {
		const options = { childList: true }

		for (const key of ALLPLAYERS) {
			let drop = document.getElementById('control-drop' + key)
			if (!drop) return

			let callback = async(mutationList, observer) => { // eslint-disable-line
				if (!drop.firstChild) return // no tile

				// remove dropped tile from door
				let tile = this.game.players[key].drop
				if (tile === undefined) return

				// update door, change status to finally discarded
				displayDoor(this.game.currentPlayer, this.game.players[this.game.currentPlayer])
				this.game.players[this.game.currentPlayer].discarded = true

				const res = await checkDianhu(this.game, tile, key)
				if (res) {
					await this.hu(res)
					return
				}

				// melds
				switch (await checkPeng(this.game, tile)) {
				case 'gang':
					// if (await checkQianggang(this.game)) {
					// 	await this.hu()
					// 	return
					// }
					this.newTile()
					return
				case 'peng':
					return
				}

				if (await checkChi(this.game, tile)) return

				// no melds
				await delay(1000)

				// remove tile from drop zone
				displayRemoveItem('control-drop', this.game.currentPlayer)

				// put tile on floor
				this.game.players[this.game.currentPlayer].floor.push(tile)
				let index = this.game.players[this.game.currentPlayer].floor.length - 1
				displayFloor(this.game.currentPlayer, tile, index)

				// rotate player
				this.game.players[this.game.currentPlayer].turn = false
				this.game.currentPlayer = modIncrease(this.game.currentPlayer)
				this.game.players[this.game.currentPlayer].turn = true

				// save game state for resumption
				await saveGame(this.game)
				// take a new tile for next player, trigger observeNewTile
				this.newTile()
			}

			const observer = new MutationObserver(callback)

			window.addEventListener('hashchange', () => { observer.disconnect() })

			try {
				observer.observe(drop, options)
			} catch (error) {
				console.log(error)
			}
		}
	}

	async newTile() {
		let tile = this.takeTile()
		let tileCopy

		if (!tile) return

		while (HUAPAI.some(obj => JSON.stringify(obj) === JSON.stringify(tile))) {
			tileCopy = tile
			this.game.players[this.game.currentPlayer].flowers.push(tile)

			tile = this.takeTile()
			if (tile) {
				await displayFlower(this.game.currentPlayer, tileCopy)
			}
		}

		if (!tile) return

		this.game.players[this.game.currentPlayer].door.push(tile)
		displayAddToDoor(this.game.currentPlayer, tile)

		if (this.humanPlayer()) {
			if (await this.newTileChecks(4)) return

			const door = document.getElementById('door' + this.game.currentPlayer)
			if (!door) return

			humanTileHandling(this.game, door)
		}
	}

	async newTileChecks(key) {
		if (await checkZimo(this.game)) {
			await this.hu(key)
			return true
		}

		if (await checkJiagang(this.game)) {
			// if (await checkQianggang(this.game)) {
			// 	await this.hu()
			// 	return
			// }
			await this.newTile()
			return true
		}

		if (await checkAngang(this.game)) {
			await this.newTile()
			return true
		}

		return false
	}

	async hu(key) {
		let door = Object.assign([], this.game.players[key].door)
		for (const set of this.game.players[key].melds) {
			for (const tile of set.meld) {
				door.push(tile)
			}
		}

		if (this.game.players[key].hu.dianhu) {
			const tile = this.game.players[this.game.currentPlayer].drop
			door.push(tile)
		}

		if (key == 4) {
			const board = document.getElementById('majiang-board')
			const huOverlay = createElement('div', ['hu-overlay'])
			const huContents = createElement('div', ['hu-contents'])

			const button = createElement('button', '', '❌')
			huContents.appendChild(button)

			const h1 = createElement('h1', '', '和了 Hule!')
			huContents.appendChild(h1)

			const paragraph = createElement('p', ['hu-set'])

			for (const tile of door) {
				const img = createTile(tile)
				img.classList.add('hu')
				paragraph.appendChild(img)
			}

			if (this.game.players[4].hu.dianhu) {
				const tile = this.game.players[this.game.currentPlayer].drop
				const img = createTile(tile)
				img.classList.add('tile-divider', 'hu')
				paragraph.appendChild(img)
			}

			const ok = createElement('button', '', 'Win')
			huContents.append(paragraph, ok)

			huOverlay.appendChild(huContents)
			board.appendChild(huOverlay)

			ok.addEventListener('click', async() => {
				sound('snd/hule.m4a')
				board.removeChild(huOverlay)
				this.displayResults(this.game, key, door)
			}, {once: true})

			await new Promise(resolve => {
				button.addEventListener('click', () => {
					board.removeChild(huOverlay)
					resolve()
				}, { once: true })
			})

			return
		}

		if (key != 4) {
			sound('snd/hule.m4a')
			this.displayResults(this.game, key, door)
		}
	}

	async displayResults(game, key, door) {
		const board = document.getElementById('majiang-board')

		const resultsOverlay = createElement('div', ['results-overlay'])
		const resultsContents = createElement('div', ['results-contents'])

		const h1 = createElement('h1', '', 'Results')
		resultsContents.appendChild(h1)

		const h2 = createElement('h2', '', `Player ${key} won the round`)
		resultsContents.appendChild(h2)

		const paragraph = createElement('p', ['results-set'])

		sortTiles(door)
		for (const tile of door) {
			const img = createTile(tile)
			img.classList.add('results')
			paragraph.appendChild(img)
		}

		const ok = createElement('button', '', 'OK')
		resultsContents.append(paragraph, ok)

		resultsOverlay.appendChild(resultsContents)
		board.appendChild(resultsOverlay)

		await new Promise(resolve => {
			ok.addEventListener('click', async() => { resolve() }, {once: true})
		})

		board.removeChild(resultsOverlay)

		const players = ALLPLAYERS.filter(item => item !== key)

		game.players[key].points += 8
		for (const index of players) {
			game.players[index].points -= 8
		}

		for (const index of ALLPLAYERS) {
			game.players[index].door = []
			game.players[index].melds = []
			game.players[index].flowers = []
			game.players[index].floor = []
			game.players[index].drop = null
			game.players[index].discarded = null
			game.players[index].tingpai = null
		}
		await displayClearBoard()
		displayRound(this.game.round, this.game.hand)
		await this.newRound()
		await this.layoutGame()
	}

	async newRound() {
		this.game.tiles = shuffle(Object.assign([], TILES))

		this.game.hand++
		if (this.game.hand > 4) {
			this.game.hand = 1
			this.game.round++
			this.game.prevailingWind++
		}

		if (this.game.round > 4) {
			// handle game over
		}

		this.game.tileCount = this.game.tiles.length

		// for (const index of ALLPLAYERS) {
		// 	this.game.players[index].wind = modIncrease(this.game.players[index].wind + 3)
		// }

		displayPrevailingWind(this.game.prevailingWind)
		determineSeatWinds(this.game.players, this.game.round)
		displaySeatWinds(this.game.players, this.game.prevailingWind)
		this.game.currentPlayer = this.currentPlayer()

		for (const player of Object.values(this.game.players)) {
			for (let i = 1; i <= 13; i++) {
				const tile = this.game.tiles.shift()
				player.door.push(tile)
			}

			sortTiles(player.door, this.game.sorted)
		}

		this.game.tileCount = this.game.tiles.length
		displayDoors(this.game.players)

		await this.replaceFlowers()
		await saveGame(this.game)
	}
}
