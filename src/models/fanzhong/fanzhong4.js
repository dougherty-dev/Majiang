#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong4
 */

import { play } from '../../components/play.js'
import { ZI } from '../tiles.js'

const FZ4 = 4
const FZ2 = 2

// 55. Outside hand (Quan dai yao, 全带幺)
export async function fz55QuanDaiYao(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds

	const yaojiuzi = melds.filter(item => ZI.includes(item[0]) || /[19]+/.test(item[1]))
	if (yaojiuzi.length === 5) return FZ4 

	return 0
}

// 56. Fully concealed hand (Bu qiu ren, 不求人)
export async function fz56BuQiuRen(struct) {
	if (
		struct.game.players[struct.key].melds.length === 0 &&
		struct.game.zimo
	) return FZ4

	return 0
}

// 57. Two melded gangs (Shuang minggang, 双明杠)
export async function fz57ShuangMinggang(struct) {
	const melds = struct.game.players[struct.key].melds

	const gang = melds.filter(item => item.type === 'gang').length
	const angang = melds.filter(item => item.type === 'angang').length

	if (angang === 1 && gang === 1) return FZ4 + FZ2
	if (angang === 0 && gang === 2) return FZ4

	return 0
}

// 58. Last of its kind (Hu juezhang, 和绝张)
export async function fz58HuJuezhang(struct) {
	const hupai = struct.game.hupai[2]
	const players = Object.entries(struct.game.players)
	const currentPlayer = struct.game.players[struct.game.currentPlayer]
	const winner = struct.game.players[struct.key].door

	const drop = currentPlayer.drop.filter(item => item[2] === hupai)
	const floor = players.map(item => item[1].floor).flat().filter(item => item[2] === hupai)
	const melds = players.map(item => item[1].melds).flat().filter(item => item.type !== 'angang')
		.map(item => item.meld).flat().filter(item => item[2] === hupai)
	const door = winner.filter(item => item[2] === hupai)

	const count = floor.length + melds.length + door.length + drop.length

	return (count === 4) ? FZ4 : 0
}
