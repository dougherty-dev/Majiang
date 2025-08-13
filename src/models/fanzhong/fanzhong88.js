#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong88
 */

import { sortTiles } from '../../components/helpers.js'
import { LIANQIDUI } from '../../components/hu/patterns.js'
import { FENG, JIAN } from '../tiles.js'
import { fz22QingYiSe } from './fanzhong24.js'

const FZ88 = 88

// 1. Big four winds (Da si xi, 大四喜)
export async function fz1DaSiXi(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi

	if (
		kezi.length + gangzi.length === 4 &&
		kezi.every((type) => type[0] === FENG) &&
		gangzi.every((type) => type[0] === FENG)
	) return FZ88

	return 0
}

// 2. Big three dragons (Da san yuan, 大三元)
export async function fz2DaSanYuan(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi

	const types = [...kezi.map(item => item[0]), ...gangzi.map(item => item[0])]
	const count = types.filter(item => item === JIAN).length

	return (count === 3) ? FZ88 : 0
}

// 3. All green (Lü yise, 绿一色)
export async function fz3LyYise(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds

	const jian = melds.filter(item => item[0] === 'j').map(item => item[1])
	const tiao = melds.filter(item => item[0] === 't').map(item => item[1])

	if (
		jian.length + tiao.length === 5 &&
		/^[2]+$/.test(jian.join('')) &&
		/^[23468]+$/.test(tiao.join(''))) return FZ88

	return 0
}

// 4. Nine gates (Jiu lian baodeng, 九莲宝灯)
export async function fz4JiuLianBaodeng(struct) {
	if (!await fz22QingYiSe(struct)) return 0

	let door = Object.assign([], struct.game.players[struct.key].door)
	if (door.length === 14) door.splice(-1, 1) // remove zimo tile
	sortTiles(door)

	const pattern = '1112345678999'
	if (door.map(item => item[1]).join('') === pattern) return FZ88

	return 0
}

// 5. Four gangs (Si gang, 四杠)
export async function fz5SiGang(struct) {
	return (struct.game.players[struct.key].hu.gangzi.length === 4) ? FZ88 : 0
}

// 6. Seven shifted pairs (Lian qi dui, 连七对)
export async function fz6LianQiDui(struct) {
	const types = Object.values(struct.types).filter(item => item.length === 14)

	if (types.length && types[0].match(LIANQIDUI)) {
		// reset and rearrange
		struct.game.players[struct.key].hu.allMelds = []
		struct.game.players[struct.key].hu.duizi = []
		struct.game.players[struct.key].hu.shunzi = []
		struct.game.players[struct.key].hu.kezi = []
		struct.game.players[struct.key].hu.gangzi = []

		for (const [index, tile] of Object.entries(struct.tiles)) {
			if (index % 2 !== 0) continue
			const set = [tile[7], `${tile[1]}${tile[1]}`]
			struct.game.players[struct.key].hu.duizi.push(set)
			struct.game.players[struct.key].hu.allMelds.push(set)
		}

		return FZ88
	}

	return 0
}

// 7. Thirteen orphans (Shisan yao, 十三幺)
export async function fz7ShisanYao(struct) {
	if (struct.game.players[struct.key].hu.shisanyao) return FZ88
	return 0
}
