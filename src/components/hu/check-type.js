#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/check-type
 */

import { KEZI, SHUNZI } from './patterns.js'
import { ZI } from '../../models/tiles.js'

export function checkType(key, type, lookup, player) {
	if (!(type in lookup)) return false

	const meldsets = lookup[type]

	// traverse all possible duplicates, find max number of melds
	let maxHuMelds = -1
	let maxMelds = meldsets[0]

	const actualMelds = []
	for (const meld of player.melds) {
		if (meld.meld[0][7] === key) {
			const set = meld.meld.map(item => item[1]).join('')
			actualMelds.push(set)
		}
	}

	// DRY
	if (meldsets.length > 1) {
		console.log(actualMelds, meldsets) // to be implemented, actual melds must be subset of contructed sets
		for (const melds of meldsets) {
			let huPairs = player.hu.pairs
			let huMelds = player.hu.melds

			for (const meld of melds) {
				switch (meld.length) {
				case 2:
					huPairs++
					break
				case 3:
					if (!ZI.includes(key) && meld.match(SHUNZI)) {
						huMelds++
					} else if (meld.match(KEZI)) {
						huMelds++
					}

					break
				}
			}

			if (huPairs <= 1 && huMelds > maxHuMelds) {
				maxHuMelds = huMelds
				maxMelds = melds
			}
		}
	}

	// accept solution
	for (const meld of maxMelds) {
		switch (meld.length) {
		case 2:
			player.hu.duizi.push([key, meld])
			player.hu.pairs++
			break
		case 3:
			if (!ZI.includes(key) && meld.match(SHUNZI)) {
				player.hu.shunzi.push([key, meld])
				player.hu.melds++
			} else if (meld.match(KEZI)) {
				player.hu.kezi.push([key, meld])
				player.hu.melds++
			}

			break
		}
	}

	return true
}
