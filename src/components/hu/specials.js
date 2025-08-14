#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/specials
 */

import { SHU, ZI } from '../../models/tiles.js'
import { DUIZI } from './patterns.js'

// These hands have no melds
export async function checkSpecial(player, door) {
	if (await sevenPairs(player, door)) return true
	if (await orphans(player)) return true
	if (await knitted(player)) return true

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
		['19'].every(n => player.hu.types.b.includes(n)) &&
		['19'].every(n => player.hu.types.t.includes(n)) &&
		['19'].every(n => player.hu.types.w.includes(n)) &&
		['1234'].every(n => player.hu.types.f.includes(n)) &&
		['123'].every(n => player.hu.types.j.includes(n))
	) {
		player.hu.shisanyao = true
		return true
	}

	return false
}

// knitted tiles with honors
async function knitted(player) {
	const shu = Object.entries(player.hu.types).filter(item => SHU.includes(item[0])).map(item => `${item[1]}`)

	if (shu.length < 3) return false
	const zi = Object.entries(player.hu.types).filter(item => ZI.includes(item[0])).map(item => `${item[1]}`)

	const knitted = [
		['1', '4', '7', '14', '17', '47', '147'],
		['2', '5', '8', '25', '28', '58', '258'],
		['3', '6', '9', '36', '39', '69', '369']
	]

	const isKnitted = shu.length === 3 && (
		(knitted[0].includes(shu[0]) && knitted[1].includes(shu[1]) && knitted[2].includes(shu[2])) ||
		(knitted[0].includes(shu[0]) && knitted[1].includes(shu[2]) && knitted[2].includes(shu[1])) ||
		(knitted[0].includes(shu[1]) && knitted[1].includes(shu[0]) && knitted[2].includes(shu[2])) ||
		(knitted[0].includes(shu[1]) && knitted[1].includes(shu[2]) && knitted[2].includes(shu[0])) ||
		(knitted[0].includes(shu[2]) && knitted[1].includes(shu[0]) && knitted[2].includes(shu[1])) ||
		(knitted[0].includes(shu[2]) && knitted[1].includes(shu[1]) && knitted[2].includes(shu[0]))
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

	// const flowers = Object.entries(player.hu.types).filter(item => SHU.includes(item[0])).map(item => `${item[0]}${item[1]}`)

	// const isKnittedStraight = (
	// 	(flowers.includes('b147') && flowers.includes('t258') && flowers.includes('w369')) ||
	// 	(flowers.includes('b147') && flowers.includes('w258') && flowers.includes('t369')) ||
	// 	(flowers.includes('t147') && flowers.includes('b258') && flowers.includes('w369')) ||
	// 	(flowers.includes('t147') && flowers.includes('w258') && flowers.includes('b369')) ||
	// 	(flowers.includes('w147') && flowers.includes('b258') && flowers.includes('t369')) ||
	// 	(flowers.includes('w147') && flowers.includes('t258') && flowers.includes('b369'))
	// )

	// if (isKnittedStraight) {
	// 	player.hu.isKnittedStraight = true
	// 	return true
	// }

	return false
}
