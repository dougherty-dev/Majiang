#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/check-type
 */

import { KEZI, SHUNZI } from './patterns.js'
import { ZI } from '../../models/tiles.js'
import { lookup2 } from './lookup2.js'
import { lookup3 } from './lookup3.js'
import { lookup5 } from './lookup5.js'
import { lookup6 } from './lookup6.js'
import { lookup8 } from './lookup8.js'
import { lookup9 } from './lookup9.js'
import { lookup11 } from './lookup11.js'
import { lookup12 } from './lookup12.js'
import { lookup14 } from './lookup14.js'

const lookup = {
	lookup2: lookup2,
	lookup3: lookup3,
	lookup5: lookup5,
	lookup6: lookup6,
	lookup8: lookup8,
	lookup9: lookup9,
	lookup11: lookup11,
	lookup12: lookup12,
	lookup14: lookup14,
}

export async function checkType(key, type, lookupKey, player) {
	if (!(type in lookup[lookupKey])) return false

	const meldsets = lookup[lookupKey][type]

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

export async function tingpai(seq) {
	let count = 0
	const index = `lookup${seq.length + 1}`
	let type
	let str
	for (const val of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
		type = Object.assign([], seq)
		type.push(val)
		str = type.sort().join('')

		if (lookup[index] && lookup[index][str]) count++
	}

	return (count === 1)
}
