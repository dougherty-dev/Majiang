#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/hu
 */

import { TYPES, DUIZI, KEZI, SHUNZI } from './patterns.js'
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

import Hu from '../../models/hu.js'

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

export async function checkHu(player, door) {
	player.hu = new Hu().hu
	player.hu.melds = player.melds.length

	for (const meld of player.melds) {
		const set = [meld.meld[0][7], meld.meld.map(item => item[1]).join('')]

		switch (meld.type) {
		case 'peng':
			player.hu.kezi.push(set)
			break
		case 'gang':
		case 'angang':
			player.hu.gangzi.push(set)
			break
		case 'chi':
			player.hu.shunzi.push(set)
			break
		}
	}

	const types = Object.assign([], TYPES)

	for (const tile of door) {
		types[tile[7]] += tile[1]
	}

	player.hu.types = types

	// either seven pairs, or just one
	let pairs = 0
	for (const type of Object.values(types)) {
		const pair = type.match(DUIZI)
		if (pair) pairs += pair.length
	}

	if (pairs === 7) return true

	for (const [key, type] of Object.entries(types)) {

		switch (true) {
		case type.length === 0:
			break
		case [1, 4, 7, 10, 13].includes(type.length):
			// check special hands first, though
			return
		default:
			if (!checkType(key, type, lookup['lookup' + type.length], player.hu)) return false
			break
		}
	}

	if (player.hu.pairs === 1 && player.hu.melds === 4) {
		return true
	}

	return false
}

function checkType(key, type, lookup, hu) {
	if (!(type in lookup)) return false
	
	const melds = lookup[type]

	// ignore duplicates for now, just use first occurrence
	for (const meld of melds[0]) {
		switch (meld.length) {
		case 2:
			hu.duizi.push([key, meld])
			hu.pairs++
			break
		case 3:
			if (!ZI.includes(key) && meld.match(SHUNZI)) {
				hu.shunzi.push([key, meld])
				hu.melds++
			} else if (meld.match(KEZI)) {
				hu.kezi.push([key, meld])
				hu.melds++
			}

			break
		}
	}

	return true
}
