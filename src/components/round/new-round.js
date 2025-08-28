#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/new-round
 * @description Prepare new round.
 * @property {function} newRound Set winds, rotate players.
 */

import { TILES } from '../../models/tiles.js'
import { determineSeatWinds } from '../../models/winds.js'
import { shuffle, sortTiles, zhuangjiaBanker } from '../helpers.js'
import { saveGame } from '../gameio.js'
import { replaceFlowers } from '../tiles.js'
import { displayPrevailingWind, displaySeatWinds } from '../display/winds.js'
import { displayDoors } from '../display/door.js'
import { gameOver } from './game-over.js'
import { cheat } from './test-cheat.js'
import { ALLPLAYERS } from '../../models/constants.js'
import Hu from '../../models/hu.js'

/**
 * Prepare new round. Set winds, rotate players.
 * @param {object} game The game parameters.
 * @returns {promise<boolean>}
 */
export async function newRound(game) {
	for (const index of ALLPLAYERS) {
		game.players[index].tingpai = null
		game.players[index].discarded = null
		game.players[index].door = []
		game.players[index].melds = []
		game.players[index].flowers = []
		game.players[index].floor = []
		game.players[index].drop = []
		game.players[index].sets = []
		game.players[index].zimo = false
		game.players[index].dianhu = false
		game.players[index].shisanyao = false
		game.players[index].qidui = false
		game.players[index].knitted = false
		game.players[index].lesserHonors = false
		game.players[index].greaterHonors = false
		game.players[index].knittedStraight = false
		game.players[index].hu = new Hu().hu
	}

	game.tiles = shuffle(Object.assign([], TILES))
	game.openTiles = []
	game.hupai = null
	game.hand++

	if (game.winner && game.players[game.winner].wind !== 1) {
		game.rotation++
	}

	if (game.rotation > 4) {
		game.round++
		game.rotation = 1
		game.hand = 1
		game.prevailingWind++
	}

	if (game.round > 4) {
		await gameOver(game)
		return false
	}

	if (game.winner && game.players[game.winner].wind !== 1) {
		await determineSeatWinds(game)
	}

	displaySeatWinds(game.players, game.prevailingWind)
	displayPrevailingWind(game.prevailingWind)

	game.currentPlayer = zhuangjiaBanker(game.players)
	game.winner = false
	game.draw = false
	game.qianggang = false

	const cheatOn = false
	if (cheatOn) {
		cheat(game)
	} else {
		for (const player of Object.values(game.players)) {
			for (let i = 1; i <= 13; i++) {
				const tile = game.tiles.shift()
				player.door.push(tile)
			}

			sortTiles(player.door, game.sorted)
		}
	}

	displayDoors(game.players)

	await replaceFlowers(game)
	await saveGame(game)

	return true
}
