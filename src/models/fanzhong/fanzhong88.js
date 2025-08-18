#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong88
 * @description Rules definitions for 88 fan.
 * @property {Function} fz1DaSiXi 1. Big four winds (Da si xi, 大四喜).
 * @property {Function} fz2DaSanYuan 2. Big three dragons (Da san yuan, 大三元).
 * @property {Function} fz3LyYise 3. All green (Lü yise, 绿一色).
 * @property {Function} fz4JiuLianBaodeng 4. Nine gates (Jiu lian baodeng, 九莲宝灯).
 * @property {Function} fz5SiGang 5. Four gangs (Si gang, 四杠).
 * @property {Function} fz6LianQiDui 6. Seven shifted pairs (Lian qi dui, 连七对).
 * @property {Function} fz7ShisanYao 7. Thirteen orphans (Shisan yao, 十三幺).
 */

import { sortTiles } from '../../components/helpers.js'
import { LIANQIDUI } from '../../components/hu/patterns.js'
import { FENG, JIAN, TIAO } from '../tiles.js'

const FZ88 = 88

/**
 * 1. Big four winds (Da si xi, 大四喜)
 * Four kezi/gangzi with winds, and an arbitrary pair.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz1DaSiXi(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi

	struct.keziGangzi = [...kezi, ...gangzi]
	struct.fengKezi = struct.keziGangzi.filter(item => item[0] === FENG)

	return (struct.fengKezi.length === 4) ? FZ88 : 0
}

/**
 * 2. Big three dragons (Da san yuan, 大三元)
 * Three kezi/gangzi with dragons, an additional arbitrary shunzi/kezi, and an additional pair.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz2DaSanYuan(struct) {
	struct.jianKezi = struct.keziGangzi.filter(item => item[0] === JIAN)

	return (struct.jianKezi.length === 3) ? FZ88 : 0
}

/**
 * 3. All green (Lü yise, 绿一色)
 * Four regular melds and a pair consisting of bamboo 23468 and optionally green dragon.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz3LyYise(struct) {
	const allMelds = struct.game.players[struct.key].hu.allMelds

	const jianMelds = allMelds.filter(item => item[0] === JIAN).map(item => item[1])
	const tiaoMelds = allMelds.filter(item => item[0] === TIAO).map(item => item[1])

	return (
		jianMelds.length + tiaoMelds.length === 5 &&
		/^[2]*$/.test(jianMelds.join('')) &&
		/^[23468]+$/.test(tiaoMelds.join(''))
	) ? FZ88 : 0
}

/**
 * 4. Nine gates (Jiu lian baodeng, 九莲宝灯)
 * Suited sequence 1112345678999 at hand, waiting for any additional tile in the suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz4JiuLianBaodeng(struct) {
	struct.qingyise = struct.tiles.filter(item => item[7] === struct.tiles[0][7]).length === 14
	if (!struct.qingyise) return 0

	let door = Object.assign([], struct.tiles)
	door.splice(-1, 1)
	sortTiles(door)

	const pattern = '1112345678999'
	if (door.map(item => item[1]).join('') === pattern) return FZ88

	return 0
}

/**
 * 5. Four gangs (Si gang, 四杠)
 * Four open or concealed gangs.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz5SiGang(struct) {
	return (struct.game.players[struct.key].hu.gangzi.length === 4) ? FZ88 : 0
}

/**
 * 6. Seven shifted pairs (Lian qi dui, 连七对)
 * Sequence of seven pairs shifted up one in value, e.g. 33445566778899
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz6LianQiDui(struct) {
	const types = Object.values(struct.types).filter(item => item.length === 14)

	if (!(types.length && types[0].match(LIANQIDUI))) return 0

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

/**
 * 7. Thirteen orphans (Shisan yao, 十三幺)
 * All suited 1s and 9s, one each of honors, plus an additional tile of the same kind.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz7ShisanYao(struct) {
	return (struct.game.players[struct.key].hu.shisanyao) ? FZ88 : 0
}
