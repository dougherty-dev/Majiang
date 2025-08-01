#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/hu
 */

import { sortTiles } from '../helpers.js'

const duizi = /(\d)\1{1}/g
const kezi = /(\d)\1{2}/g

const shunzi = /(123|234|345|456|567|678|789)/g

const shunzix2 = /(112233|223344|334455|445566|556677|667788|778899)/g
const shiftedx2 = /(122334|233445|344556|455667|566778|677889)/g

const shunzix3 =  /(111222333|222333444|333444555|444555666|555666777|666777888|777888999)/g
const shiftedax3 = /(112223334|223334445|334445556|445556667|556667778|667778889)/g
const shiftedbx3 = /(122233344|233344455|344455566|455566677|566677788|677788899)/g

const shunzix4 =  /(111122223333|222233334444|333344445555|444455556666|555566667777|666677778888|777788889999)/g
const shiftedax4 = /(111222233334|222333344445|333444455556|444555566667|555666677778|666777788889)/g
const shiftedbx4 = /(112222333344|223333444455|334444555566|445555666677|556666777788|667777888899)/g
const shiftedcx4 = /(122223333444|233334444555|344445555666|455556666777|566667777888|677778888999)/g

function checkPair(length, pair, struct) {
	console.log(length + ': ', pair , (pair))
	if (!pair) {
		console.log(length + ': not pair')
		return false
	}
	struct.pairs++
	return true
}

function checkTriple(length, triple, straight, struct) {
	if (!triple && !straight) {
		console.log(length + ': not triple, not straight', triple, straight)
		return false
	}

	if (triple) console.log(length + ': triple', triple[0])
	else if (straight) console.log(length + ': straight', straight[0])
	struct.melds++
	return true
}

function checkDoubleTriple(length, type, triple, straight, straightx2, shiftedStraightx2, struct) {
	if (triple && triple.length === 2) {
		console.log(length + ': double triple', triple)
		struct.melds += 2
		return true
	}

	if ((straightx2 || shiftedStraightx2) || (straight && straight.length === 2)) {
		console.log(length + ': double straight', straight, straightx2, shiftedStraightx2)
		struct.melds += 2
		return true
	}

	if (triple) {
		// consider the case 144456 => (444, 456), false
		let rest = type.replace(triple[0], '')
		// break out kezi, then check remainder for shunzi
		if (rest.match(shunzi)) {
			console.log(length + ': triple & straight', triple, straight)
			struct.melds += 2
		return true
		}
	}

	console.log(length + ': no double triple', triple, straight, straightx2, shiftedStraightx2)
	return false
}

export async function checkZimo(game) {
	if (game.currentPlayer !== 4) return

	console.log('--------------- START -----------------')

	const door = Object.assign([], game.players[game.currentPlayer].door)
	sortTiles(door)

	let struct = {
		pairs: 0,
		melds: game.players[game.currentPlayer].melds.length
	}

	const types = { b: '', t: '', w: '', f: '', j: ''}

	for (const tile of door) {
		types[tile[7]] += tile[1]
	}


	console.log(types)
	for (const [key, type] of Object.entries(types)) {
		console.log('------- ', key, ': ------')
		const pair = type.match(duizi) // 2

		const triple = type.match(kezi) // 3
		const straight = type.match(shunzi)

		const straightx2 = type.match(shunzix2) // 6
		const shiftedStraightx2 = type.match(shiftedx2)

		const straightx3 = type.match(shunzix3) // 9
		const shiftedStraightax3 = type.match(shiftedax3)
		const shiftedStraightbx3 = type.match(shiftedbx3)

		const straightx4 = type.match(shunzix4) // 12
		const shiftedStraightax4 = type.match(shiftedax4)
		const shiftedStraightbx4 = type.match(shiftedbx4)
		const shiftedStraightcx4 = type.match(shiftedcx4)

		if (type.length >= 2) {
			console.log('pair: ', pair, type)
		}

		if (type.length >= 3) {
			console.log('triple: ', triple, type)
			console.log('straight: ', straight, type)
		}

		if (type.length >= 6) {
			console.log('straightx2: ', straightx2, type)
			console.log('straightx3: ', straightx3, type)
			console.log('straightx4: ', straightx4, type)
			console.log('shiftedStraightx2: ', shiftedStraightx2, type)
		}

		if (type.length >= 9) {
			console.log('shiftedStraightax3: ', shiftedStraightax3, type)
			console.log('shiftedStraightbx3: ', shiftedStraightbx3, type)
		}

		if (type.length >= 12) {
			console.log('shiftedStraightax4: ', shiftedStraightax4, type)
			console.log('shiftedStraightbx4: ', shiftedStraightbx4, type)
			console.log('shiftedStraightcx4: ', shiftedStraightcx4, type)
		}

		let pairs = 0
		if (pair) {
			pairs = pair.length
			console.log('Pairs: ', pairs)
			if (pairs === 7) return true // qi duizi
		}

		let rest
		switch (true) {
		case type.length === 0:
			break
		case [1, 4, 7, 10, 13].includes(type.length):
			console.log('1, 4, 7, 10, 13: wrong length')
			// check special hands first, though
			return
		case type.length === 2:
			if (!checkPair(2, pair, struct)) return false
			break
		case type.length === 3:
			if (!checkTriple(3, triple, straight, struct)) return false
			break
		case type.length === 5:
			if (!checkPair(5, pair, struct)) return false

			rest = type.replace(pair[0], '')
			console.log('5: pair', pair[0], rest)

			if (!checkTriple(5, rest.match(kezi), rest.match(shunzi), struct)) return false
			break
		case type.length === 6:
			if (!checkDoubleTriple(6, type, triple, straight, straightx2, shiftedStraightx2, struct)) return false
			break
		case type.length === 8:
			if (!pair) return false

			let found = false
			for (const set of pair) {
				rest = type.replace(set, '')
				console.log('8: pair', set, rest)
				if (checkDoubleTriple(8, type, rest.match(kezi), rest.match(shunzi), rest.match(shunzix2), rest.match(shiftedx2), struct)) {
					found = true
					struct.pairs++
					break
				}
			}
			if (!found) return false
			break
		default:
			break
		}
	}

	console.log('struct: ', struct)
	if (struct.pairs === 1 && struct.melds === 4) {
		console.log('hule!')
		return true
	}

	return false
}
