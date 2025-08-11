#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong88
 */

import { sortTiles } from '../../components/helpers.js'
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

	if (count === 3) return FZ88

	return 0
}

// 3. All green (Lü yise, 绿一色)
export async function fz3LyYise(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds

	const jian = melds.filter(item => item[0] === 'j').map(item => item[1]).join('')
	const tiao = melds.filter(item => item[0] === 't').map(item => item[1]).join('')

	if (/^[2]+$/.test(jian) && /^[23468]+$/.test(tiao)) return FZ88

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
	if (struct.game.players[struct.key].hu.pairs !== 7) return 0

	const duizi = struct.game.players[struct.key].hu.duizi
	const type = duizi.map(item => item[1]).join('')
	const pattern = /(11223344556677|22334455667788|33445566778899)/g

	if (
		struct.game.players[struct.key].hu.pairs === 7 &&
		type.match(pattern)
	) return FZ88
		
	return 0
}

// 7. Thirteen orphans (Shisan yao, 十三幺)
export async function fz7ShisanYao(struct) {
	if (struct.game.players[struct.key].hu.shisanyao) return FZ88
	return 0
}
