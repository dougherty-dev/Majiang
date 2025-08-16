#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong1
 */

import { lookup11 } from '../../components/hu/lookup11.js'
import { lookup12 } from '../../components/hu/lookup12.js'
import { lookup14 } from '../../components/hu/lookup14.js'
import { lookup2 } from '../../components/hu/lookup2.js'
import { lookup3 } from '../../components/hu/lookup3.js'
import { lookup5 } from '../../components/hu/lookup5.js'
import { lookup6 } from '../../components/hu/lookup6.js'
import { lookup8 } from '../../components/hu/lookup8.js'
import { lookup9 } from '../../components/hu/lookup9.js'
import { BING, SHU, TIAO, WAN, ZI } from '../tiles.js'

const FZ1 = 1

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

// 69. Pure double shunzi (Yiban gao, 一般高)
export async function fz69YibanGao(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	let hit = []
	for (const type of shunzi) {
		if (hit.includes(type)) return FZ1
		hit.push(type)
	}

	return 0
}

// 70. Mixed double shunzi (Xi xiangfeng, 喜相逢)
export async function fz70XiXiangfeng(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	let hit = []
	for (const type of shunzi) {
		if (hit.length && hit[0][1] === type[1] && hit[0][0] !== type[0]) return FZ1
		hit.push(type)
	}

	return 0
}

// 71. Short straight (Lian liu, 连六)
export async function fz71LianLiu(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi
	const pattern = /(123456|234567|345678|456789)/g

	const bingzi = shunzi.filter(item => item[0] === BING).map(item => item[1]).join('').split('').sort().join('')
	if (bingzi.match(pattern)) return FZ1

	const tiaozi = shunzi.filter(item => item[0] === TIAO).map(item => item[1]).join('').split('').sort().join('')
	if (tiaozi.match(pattern)) return FZ1

	const wanzi = shunzi.filter(item => item[0] === WAN).map(item => item[1]).join('').split('').sort().join('')
	if (wanzi.match(pattern)) return FZ1

	return 0
}

// 72. Two terminal shunzi (Laoshao fu, 老少副)
export async function fz72LaoshaoFu(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi

	const bingzi = shunzi.filter(item => item[0] === BING).map(item => item[1])
	if (bingzi.includes('123') && bingzi.includes('789')) return FZ1

	const tiaozi = shunzi.filter(item => item[0] === TIAO).map(item => item[1])
	if (tiaozi.includes('123') && tiaozi.includes('789')) return FZ1

	const wanzi = shunzi.filter(item => item[0] === WAN).map(item => item[1])
	if (wanzi.includes('123') && wanzi.includes('789')) return FZ1

	return 0
}

// 73. Terminal kezi (Yao jiu ke, 幺九刻)
export async function fz73YaoJiuKe(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi

	const types = [...kezi, ...gangzi]
		.map(item => [item[0], item[1][0]])
		.filter(item => item[0] !== 'j')
		.filter(item => item[0] === 'f' || item[1] === '1' || item[1] === '9')

	return (types.length) ? FZ1 : 0
}

// 74. Melded gang (Minggang, 明杠)
export async function fz74Minggang(struct) {
	const melds = struct.game.players[struct.key].melds
	const gang = melds.filter(item => item.type === 'gang').length

	return (gang === 1) ? FZ1 : 0
}

// 75. One voided suit (Que yi men, 缺一门)
export async function fz75QueYiMen(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const suits = [... new Set(melds.filter(item => SHU.includes(item[0])).map(item => item[0]))]

	return (suits.length === 2) ? FZ1 : 0
}

// 76. No honors (Wu zi, 无字)
export async function fz76WuZi(struct) {
	return struct.tiles.some(arr => ZI.includes(arr[7])) ? 0 : FZ1
}

// 77. Edge wait (Bianzhang, 边张)
export async function fz77Bianzhang(struct) {
	const hupai = struct.game.hupai
	if (![3, 7].includes(hupai[1])) return 0

	const door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].hu.zimo) door.pop()

	const seq = door.filter(item => item[7] === hupai[7]).map(item => item[1])
	if (![1, 2, 4, 5, 7, 8, 10, 11, 13].includes(seq.length)) return 0

	switch (hupai[1]) {
	case 3:
		if (!seq.includes(1) || !seq.includes(2)) return 0
		break
	case 7:
		if (!seq.includes(8) || !seq.includes(9)) return 0
	}

	let count = 0
	let type
	let str
	let index
	for (const val of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
		type = Object.assign([], seq)
		type.push(val)
		str = type.sort().join('')
		index = 'lookup' + str.length
		if (lookup[index] && lookup[index][str]) count++
	}

	return (count === 1) ? FZ1 : 0
}

// 80. Self-drawn (Zimo, 自摸)
export async function fz80Zimo(struct) {
	return (struct.game.players[struct.key].hu.zimo) ? FZ1 : 0
}

// 81. Flower tiles (Huapai, 花牌)
export async function fz81Huapai(struct) {
	return struct.game.players[struct.key].flowers.length
}
