#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/round/test-cheat
 */

import { sortTiles } from '../helpers.js'

/**
 * Manually test hands by assigning tiles to human player.
 * @param {Object} game The game parameters.
 */
export async function cheat(game) {
	// 88 fan
	// const tiles = ['zi1', 'zi1', 'zi1', 'zi3', 'zi3', 'zi3', 'zi2', 'zi2', 'zi4', 'zi2', 'zi4', 'zi4', 'bing8'] // 1
	// const tiles = ['zi1', 'zi1', 'zi1', 'zi3', 'zi3', 'zi3', 'zi2', 'zi2', 'zi4', 'zi2', 'zi4', 'zi4', 'zi1'] // 1
	// const tiles = ['zi5', 'zi5', 'zi5', 'zi6', 'zi6', 'zi6', 'tiao1', 'tiao2', 'tiao3', 'zi7', 'zi7', 'zi7', 'bing8'] // 2
	// const tiles = ['tiao8', 'tiao8', 'tiao8', 'tiao2', 'tiao3', 'tiao4', 'tiao2', 'tiao3', 'tiao4', 'zi6', 'zi6', 'tiao2', 'tiao3'] // 3
	// const tiles = ['tiao8', 'tiao8', 'tiao8', 'tiao2', 'tiao3', 'tiao4', 'tiao2', 'tiao3', 'tiao4', 'zi7', 'zi7', 'tiao2', 'tiao3'] // 3 neg
	// const tiles = ['tiao8', 'tiao8', 'tiao8', 'tiao2', 'tiao3', 'tiao4', 'tiao2', 'tiao3', 'tiao4', 'tiao6', 'tiao6', 'tiao2', 'tiao3'] // 3
	// const tiles = ['wan1', 'wan1', 'wan1', 'wan2', 'wan3', 'wan4', 'wan5', 'wan6', 'wan7', 'wan8', 'wan9', 'wan9', 'wan9'] // 4
	// const tiles = ['zi5', 'zi5', 'zi5', 'zi5', 'wan3', 'wan3', 'wan3', 'bing2', 'bing2', 'bing2', 'bing2', 'tiao1', 'tiao1'] // 5
	// const tiles = ['bing2', 'bing2', 'bing3', 'bing3', 'bing5', 'bing5', 'bing4', 'bing4', 'bing7', 'bing6', 'bing6', 'bing8', 'bing7'] // 6
	// const tiles = ['bing1', 'bing9', 'tiao1', 'tiao9', 'wan9', 'wan1', 'zi1', 'zi2', 'zi3', 'zi4', 'zi5', 'zi6', 'zi7'] // 7

	// 64 fan
	// const tiles = ['tiao1', 'tiao1', 'tiao1', 'bing9', 'bing9', 'bing9', 'wan9', 'wan9', 'wan9', 'wan1', 'wan1', 'bing1', 'bing1'] // 8
	// const tiles = ['tiao1', 'tiao1', 'tiao1', 'bing9', 'bing9', 'bing9', 'wan9', 'wan9', 'wan9', 'wan1', 'wan1', 'bing1', 'bing2'] // 8 neg
	// const tiles = ['zi1', 'zi1', 'zi1', 'zi3', 'zi3', 'zi3', 'zi2', 'zi2', 'zi4', 'zi2', 'zi4', 'bing7', 'bing8'] // 9
	// const tiles = ['zi5', 'zi5', 'zi5', 'zi6', 'zi6', 'zi6', 'tiao1', 'tiao2', 'tiao3', 'zi7', 'zi7', 'bing7', 'bing8'] // 10
	// const tiles = ['zi1', 'zi1', 'zi1', 'zi3', 'zi3', 'zi3', 'zi2', 'zi2', 'zi2', 'zi5', 'zi5', 'zi6', 'zi6'] // 11
	// const tiles = ['bing2', 'bing2', 'bing2', 'bing9', 'bing9', 'bing9', 'wan5', 'wan5', 'wan5', 'zi7', 'zi7', 'zi7', 'tiao3'] // 12
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing1', 'bing2', 'bing3', 'bing5', 'bing5', 'bing7', 'bing8', 'bing9', 'bing7', 'bing8'] // 13

	// 48 fan
	// const tiles = ['wan5', 'wan6', 'wan7', 'wan5', 'wan6', 'wan7', 'wan5', 'wan6', 'wan7', 'wan5', 'wan6', 'wan7', 'bing2'] // 14
	// const tiles = ['wan5', 'wan6', 'wan7', 'wan5', 'wan6', 'wan7', 'wan5', 'wan6', 'wan7', 'wan5', 'wan6', 'wan7', 'wan8'] // 14
	// const tiles = ['wan4', 'wan5', 'wan6', 'wan5', 'wan6', 'wan7', 'wan5', 'wan6', 'wan7', 'wan5', 'wan6', 'wan7', 'wan8'] // 14 neg
	// const tiles = ['wan5', 'wan5', 'wan5', 'wan6', 'wan6', 'wan6', 'wan7', 'wan7', 'wan7', 'wan8', 'wan8', 'wan8', 'bing2'] // 15
	// const tiles = ['wan5', 'wan5', 'wan5', 'wan6', 'wan6', 'wan6', 'wan7', 'wan7', 'wan7', 'wan8', 'wan8', 'wan8', 'wan1'] // 15
	// const tiles = ['wan5', 'wan5', 'wan5', 'wan6', 'wan6', 'wan6', 'wan7', 'wan7', 'wan7', 'wan8', 'wan8', 'wan8', 'wan6'] // 15
	// const tiles = ['wan5', 'wan5', 'wan5', 'wan6', 'wan6', 'wan6', 'wan7', 'wan7', 'wan7', 'wan9', 'wan9', 'wan9', 'bing2'] // 15 neg

	// 32 fan
	// const tiles = ['tiao1', 'tiao2', 'tiao3', 'tiao2', 'tiao3', 'tiao4', 'tiao3', 'tiao4', 'tiao5', 'tiao4', 'tiao5', 'tiao6', 'bing2'] // 16
	// const tiles = ['tiao1', 'tiao2', 'tiao3', 'tiao2', 'tiao3', 'tiao4', 'tiao3', 'tiao4', 'tiao5', 'tiao4', 'tiao5', 'tiao6', 'tiao8'] // 16
	// const tiles = ['zi5', 'zi5', 'zi5', 'zi5', 'wan3', 'wan3', 'wan3', 'bing2', 'bing2', 'bing2', 'bing2', 'wan3', 'tiao3'] // 17
	// const tiles = ['bing1', 'bing1', 'bing1', 'bing9', 'bing9', 'bing9', 'tiao9', 'tiao9', 'tiao9', 'wan9', 'wan9', 'wan9', 'zi7'] // 18

	// 24 fan
	// const tiles = ['bing1', 'bing1', 'bing5', 'bing5', 'tiao4', 'tiao4', 'tiao7', 'tiao7', 'wan5', 'wan5', 'zi1', 'zi1', 'zi6'] // 19
	// const tiles = ['bing1', 'bing4', 'bing7', 'tiao2', 'tiao5', 'wan6', 'zi1', 'zi2', 'zi3', 'zi4', 'zi5', 'zi6', 'zi7'] // 20
	// const tiles = ['bing2', 'bing2', 'bing2', 'bing8', 'bing8', 'bing8', 'tiao6', 'tiao6', 'tiao6', 'wan2', 'wan2', 'wan2', 'wan8'] // 21
	// const tiles = ['bing1', 'bing1', 'bing1', 'bing8', 'bing8', 'bing8', 'tiao6', 'tiao6', 'tiao6', 'wan2', 'wan2', 'wan2', 'wan8'] // 21 neg
	// const tiles = ['bing2', 'bing2', 'bing4', 'bing4', 'bing8', 'bing8', 'tiao6', 'tiao6', 'tiao8', 'tiao8', 'wan2', 'wan2', 'wan4'] // 21 neg
	// const tiles = ['tiao1', 'tiao2', 'tiao3', 'tiao4', 'tiao4', 'tiao4', 'tiao5', 'tiao5', 'tiao5', 'tiao5', 'tiao6', 'tiao7', 'tiao9'] // 22
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing1', 'bing2', 'bing3', 'bing1', 'bing2', 'bing3', 'tiao1', 'tiao1', 'tiao1', 'zi2'] // 23 neg
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing1', 'bing2', 'bing3', 'bing1', 'bing2', 'bing3', 'bing2', 'bing3', 'bing4', 'bing5'] // 23
	// const tiles = ['bing4', 'bing5', 'bing6', 'bing4', 'bing5', 'bing6', 'bing4', 'bing5', 'bing6', 'bing3', 'bing4', 'bing5', 'wan7'] // 23
	// const tiles = ['tiao2', 'tiao3', 'tiao4', 'wan3', 'wan3', 'wan3', 'wan4', 'wan4', 'wan4', 'wan5', 'wan5', 'wan5', 'zi3'] // 23
	// const tiles = ['bing1', 'bing2', 'bing3', 'wan3', 'wan3', 'wan3', 'wan4', 'wan4', 'wan4', 'wan5', 'wan5', 'zi1', 'zi3'] // 24
	// const tiles = ['bing9', 'bing9', 'bing9', 'tiao7', 'tiao7', 'tiao8', 'tiao9', 'wan8', 'wan8', 'wan8', 'wan9', 'wan9', 'wan9'] // 25
	// const tiles = ['bing4', 'bing5', 'bing6', 'tiao4', 'tiao4', 'tiao4', 'tiao5', 'tiao5', 'tiao5', 'wan4', 'wan4', 'wan4', 'wan6'] // 26
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing3', 'bing3', 'tiao1', 'tiao2', 'tiao3', 'tiao3', 'tiao3', 'tiao3', 'wan3', 'wan3'] // 27

	// 16 fan
	// const tiles = ['tiao1', 'tiao2', 'tiao3', 'tiao4', 'tiao5', 'tiao6', 'tiao7', 'tiao8', 'tiao9', 'wan4', 'wan5', 'zi1', 'zi1'] // 28
	// const tiles = ['tiao1', 'tiao2', 'tiao3', 'tiao4', 'tiao5', 'tiao6', 'tiao7', 'tiao8', 'tiao9', 'tiao5', 'tiao5', 'tiao1', 'tiao1'] // 28
	// const tiles = ['tiao1', 'tiao2', 'tiao3', 'tiao4', 'tiao5', 'tiao6', 'tiao7', 'tiao8', 'tiao9', 'tiao1', 'tiao2', 'tiao3', 'tiao5'] // 28
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing7', 'bing8', 'bing9', 'tiao7', 'tiao8', 'tiao9', 'tiao1', 'tiao2', 'tiao3', 'wan5'] // 29
	// const tiles = ['bing1', 'bing1', 'bing8', 'bing8', 'bing8', 'tiao2', 'tiao3', 'tiao4', 'tiao4', 'tiao5', 'tiao6', 'tiao6', 'tiao7'] // 30
	// const tiles = ['tiao1', 'tiao1', 'tiao1', 'tiao9', 'tiao9', 'tiao2', 'tiao3', 'tiao4', 'tiao4', 'tiao5', 'tiao6', 'tiao6', 'tiao7'] // 30
	// const tiles = ['tiao1', 'tiao1', 'tiao1', 'tiao9', 'tiao9', 'tiao2', 'tiao3', 'tiao4', 'tiao3', 'tiao4', 'tiao5', 'tiao4', 'tiao5'] // 30
	// const tiles = ['bing4', 'bing5', 'bing6', 'bing5', 'bing6', 'bing7', 'tiao5', 'tiao5', 'tiao5', 'wan3', 'wan4', 'wan5', 'wan5'] // 31
	// const tiles = ['bing2', 'bing2', 'bing2', 'tiao2', 'tiao2', 'tiao2', 'wan2', 'wan2', 'wan2', 'zi7', 'zi7', 'wan5', 'wan6'] // 32

	// 12 fan
	// const tiles = ['bing1', 'bing4', 'bing7', 'tiao5', 'tiao8', 'wan3', 'wan6', 'wan9', 'zi3', 'zi4', 'zi5', 'zi6', 'zi7'] // 34
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing1', 'bing4', 'bing7', 'tiao2', 'tiao5', 'tiao8', 'wan3', 'wan6', 'wan9', 'wan9'] // 35
	// const tiles = ['zi5', 'bing2', 'bing2', 'bing1', 'bing4', 'bing7', 'tiao2', 'tiao5', 'tiao8', 'wan3', 'wan6', 'wan9', 'zi5'] // 35
	// const tiles = ['bing6', 'bing7', 'bing8', 'bing9', 'bing9', 'bing9', 'tiao7', 'tiao8', 'tiao9', 'wan6', 'wan6', 'wan6', 'wan8'] // 36
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing4', 'bing4', 'tiao2', 'tiao3', 'tiao4', 'wan1', 'wan1', 'wan1', 'wan4', 'wan4'] // 37
	// const tiles = ['bing2', 'bing2', 'bing4', 'bing4', 'wan2', 'wan2', 'tiao2', 'tiao2', 'wan4', 'wan4', 'tiao4', 'tiao4', 'wan3'] // 37
	// const tiles = ['bing8', 'bing8', 'tiao7', 'tiao8', 'tiao9', 'zi2', 'zi2', 'zi2', 'zi3', 'zi3', 'zi3', 'zi4', 'zi4'] // 38

	// 8 fan

	//const tiles = ['bing1', 'bing2', 'bing3', 'bing8', 'bing8', 'bing8', 'tiao2', 'tiao2', 'tiao2', 'tiao4', 'tiao5', 'tiao6', 'zi7'] // 40
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing8', 'bing8', 'bing8', 'tiao2', 'tiao2', 'tiao2', 'tiao4', 'tiao5', 'tiao6', 'zi6'] // 40 neg
	// const tiles = ['bing2', 'bing2', 'bing2', 'bing6', 'bing7', 'bing8', 'tiao6', 'tiao7', 'tiao8', 'wan6', 'wan7', 'wan8', 'zi7'] // 41
	// const tiles = ['bing2', 'bing3', 'bing9', 'bing6', 'bing7', 'bing8', 'tiao6', 'tiao7', 'tiao8', 'wan6', 'wan7', 'wan8', 'bing9'] // 41
	// const tiles = ['bing2', 'bing2', 'bing2', 'bing6', 'bing7', 'bing8', 'tiao6', 'tiao7', 'tiao8', 'wan5', 'wan6', 'wan7', 'zi7'] // 41 neg
	// const tiles = ['bing2', 'bing2', 'bing8', 'bing8', 'bing8', 'tiao6', 'tiao6', 'tiao6', 'wan7', 'wan7', 'wan7', 'tiao7', 'tiao8'] // 42
	const tiles = ['bing1', 'bing2', 'bing3', 'tiao7', 'tiao7', 'tiao7', 'zi4', 'zi4', 'wan8', 'wan8', 'wan8', 'tiao2', 'tiao3'] // 43
	// const tiles = ['bing1', 'bing2', 'bing3', 'tiao7', 'tiao7', 'tiao7', 'tiao7', 'wan8', 'wan8', 'wan8', 'wan8', 'tiao2', 'tiao3'] // 48
	// const tiles = ['bing9', 'bing9', 'bing9', 'tiao1', 'tiao1', 'tiao1', 'wan4', 'wan4', 'wan5', 'wan5', 'wan5', 'wan9', 'wan9'] // 49
	// const tiles = ['tiao1', 'tiao2', 'tiao3', 'tiao6', 'tiao6', 'tiao6', 'tiao8', 'tiao8', 'tiao8', 'zi5', 'zi5', 'zi1', 'zi1'] // 50

	// 6 fan
	// const tiles = ['bing7', 'bing8', 'bing9', 'tiao8', 'tiao8', 'tiao8', 'wan5', 'wan6', 'wan7', 'zi1', 'zi1', 'zi7', 'zi7'] // 52
	// const tiles = ['bing8', 'bing8', 'bing9', 'bing9', 'bing9', 'wan6', 'wan7', 'zi1', 'zi1', 'zi1', 'zi7', 'zi7', 'zi7'] // 54
	// const tiles = ['bing1', 'bing2', 'bing3', 'bing9', 'bing9', 'bing9', 'tiao1', 'tiao2', 'tiao3', 'zi3', 'zi3', 'zi6', 'zi6'] // 55
	// const tiles = ['bing1', 'bing1', 'bing9', 'bing9', 'wan9', 'wan9', 'tiao1', 'tiao1', 'zi5', 'zi3', 'zi3', 'tiao9', 'tiao9'] // 55 qidui

	// 2 fan
	// const tiles = ['bing2', 'bing2', 'bing2', 'bing2', 'bing3', 'bing4', 'tiao3', 'tiao4', 'tiao5', 'wan5', 'wan5', 'wan2', 'wan3'] // 64
	// const tiles = ['bing2', 'bing2', 'bing2', 'bing4', 'bing4', 'bing4', 'tiao4', 'tiao4', 'tiao4', 'wan5', 'wan5', 'wan3', 'wan3'] // 65

	// 1 fan
	// const tiles = ['bing7', 'bing8', 'bing9', 'bing7', 'bing8', 'bing9', 'tiao3', 'tiao3', 'tiao3', 'wan5', 'wan5', 'wan2', 'wan3'] // 69
	// const tiles = ['bing7', 'bing8', 'bing9', 'bing7', 'bing8', 'bing9', 'bing1', 'bing1', 'bing1', 'bing5', 'bing5', 'bing2', 'bing3'] // 69

	// const tiles = ['bing7', 'bing8', 'bing9', 'bing7', 'bing8', 'bing9', 'tiao2', 'tiao3', 'tiao4', 'tiao5', 'tiao6', 'tiao7', 'bing2'] // 71
	// const tiles = ['bing7', 'bing8', 'bing9', 'bing7', 'bing8', 'bing9', 'tiao1', 'tiao2', 'tiao3', 'tiao7', 'tiao8', 'tiao9', 'zi7'] // 72

	for (const tile of tiles) {
		game.players[4].door.push(game.tiles.splice(game.tiles.findIndex(item => item[2] === tile), 1)[0])
	}

	for (const [key, player] of Object.entries(game.players)) {
		if (key == 4) continue
		for (let i = 1; i <= 13; i++) {
			const tile = game.tiles.shift()
			player.door.push(tile)
		}

		sortTiles(player.door, game.sorted)
	}
}
