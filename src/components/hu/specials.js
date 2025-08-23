#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/specials
 */

import { SHU, ZI } from '../../models/tiles.js'
import { knittedLookup } from '../lookup/knitted.js'
import { DUIZI, KEZI } from './patterns.js'

// These hands have no melds
export async function checkSpecial(player, door) {
	if (await sevenPairs(player, door)) return true
	if (await orphans(player)) return true
	if (await knittedHonors(player)) return true
	if (await knittedStraight(player)) return true

	return false
}

// either seven pairs, or just one
async function sevenPairs(player, door) {
	let pairs = 0
	for (const type of Object.values(player.hu.types)) {
		const pair = type.match(DUIZI)
		if (pair) pairs += pair.length
	}

	if (pairs === 7) {
		player.hu.pairs = 7
		for (const [index, tile] of Object.entries(door)) {
			if (index % 2 !== 0) continue
			const set = [tile[7], `${tile[1]}${tile[1]}`]
			player.hu.duizi.push(set)
		}

		return true
	}

	return false
}

// 13 orphans
async function orphans(player) {
	const values = Object.values(player.hu.types).filter(item => item !== '')

	if (
		values.length === 5 &&
		player.hu.types.b.match(/1{1,2}9{1,2}/g) &&
		player.hu.types.t.match(/1{1,2}9{1,2}/g) &&
		player.hu.types.w.match(/1{1,2}9{1,2}/g) &&
		player.hu.types.f.match(/1{1,2}2{1,2}3{1,2}4{1,2}/g) &&
		player.hu.types.j.match(/1{1,2}2{1,2}3{1,2}/g)
	) {
		player.hu.shisanyao = true
		return true
	}

	return false
}

// knitted tiles with honors
async function knittedHonors(player) {
	const types = Object.entries(player.hu.types)
	const shu = types.filter(item => SHU.includes(item[0])).map(item => `${item[1]}`)

	if (shu.length < 3) return false
	const zi = types.filter(item => ZI.includes(item[0])).map(item => `${item[1]}`)

	const kni = [
		['1', '4', '7', '14', '17', '47', '147'],
		['2', '5', '8', '25', '28', '58', '258'],
		['3', '6', '9', '36', '39', '69', '369']
	]

	const isKnitted = shu.length === 3 && (
		(kni[0].includes(shu[0]) && kni[1].includes(shu[1]) && kni[2].includes(shu[2])) ||
		(kni[0].includes(shu[0]) && kni[1].includes(shu[2]) && kni[2].includes(shu[1])) ||
		(kni[0].includes(shu[1]) && kni[1].includes(shu[0]) && kni[2].includes(shu[2])) ||
		(kni[0].includes(shu[1]) && kni[1].includes(shu[2]) && kni[2].includes(shu[0])) ||
		(kni[0].includes(shu[2]) && kni[1].includes(shu[0]) && kni[2].includes(shu[1])) ||
		(kni[0].includes(shu[2]) && kni[1].includes(shu[1]) && kni[2].includes(shu[0]))
	)

	const isGreaterHonors = zi.length === 2 && zi[0] === '1234' && zi[1] === '123'

	if (isKnitted && isGreaterHonors) {
		player.hu.isKnitted = true
		player.hu.isGreaterHonors = true
		return true
	}

	const honors = [
		['12', '13', '14', '23', '24', '34', '123', '124', '134', '234', '1234'],
		['1', '2', '3', '12', '13', '23', '123'],
	]

	const isLesserHonors = zi.length === 2 && honors[0].includes(zi[0]) && honors[1].includes(zi[1])

	if (isKnitted && isLesserHonors) {
		player.hu.isKnitted = true
		player.hu.isLesserHonors = true
		return true
	}
}

async function knittedStraight(player) {
	const types = Object.entries(player.hu.types)
	const flowers = types.filter(item => SHU.includes(item[0]))

	if (flowers.length < 3) return false
	for (const flower of flowers) {
		if (![3, 5, 6, 8].includes(flower[1].length)) return false
	}

	const combinations = [
		['147', '258', '369'],
		['147', '369', '258'],
		['258', '147', '369'],
		['258', '369', '147'],
		['369', '147', '258'],
		['369', '258', '147']
	]

	let melds = []
	let item
	for (const combo of combinations) {
		melds = []

		for (const key of combo.keys()) {
			item = knittedLookup[`knitted${combo[key]}w${flowers[key][1].length}`][flowers[key][1]]
			if (item === undefined) continue
			melds.push(item)
		}
		if (melds.length === 3) break
	}

	if (melds.length < 3) return false

	player.allMelds = []
	for (const [key, group] of Object.entries(melds)) {
		for (const arr of group) {
			for (const meld of arr) {
				player.allMelds.push(SHU[key] + meld)
			}
		}
	}

	const zi = types.filter(item => ZI.includes(item[0]) && item[1].length)

	for (const meld of zi) {
		if (
			(meld[1].length === 2 && meld[1].match(DUIZI)) ||
			(meld[1].length === 3 && meld[1].match(KEZI))
		) {
			player.allMelds.push(meld[0] + meld[1])
		} else {
			return false
		}
	}

	if (player.allMelds.length === 5) {
		player.hu.isKnittedStraight = true
		return true
	}

	return false
}
