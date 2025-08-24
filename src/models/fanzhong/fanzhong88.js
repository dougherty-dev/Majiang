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

const FZ88 = 88

/**
 * ✅ 1. Big four winds (Da si xi, 大四喜).
 * Four kezi/gangzi with winds, and an arbitrary pair.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz1DaSiXi(struct) {
	return (struct.fengTypes.match(/1{3,4}2{3,4}3{3,4}4{3,4}/g)) ? FZ88 : 0
}

/**
 * ✅ 2. Big three dragons (Da san yuan, 大三元).
 * Three kezi/gangzi with dragons, an additional arbitrary shunzi/kezi, and an additional pair.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz2DaSanYuan(struct) {
	return (struct.jianTypes.match(/1{3,4}2{3,4}3{3,4}/g)) ? FZ88 : 0
}

/**
 * ✅ 3. All green (Lü yise, 绿一色).
 * Four regular melds and a pair consisting of bamboo 23468 and optionally green dragon.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz3LyYise(struct) {
	return (
		struct.jianTypes.length + struct.tiaoTypes.length === struct.tiles.length &&
		/^[2]*$/.test(struct.jianTypes) &&
		/^[23468][^19]+$/.test(struct.tiaoTypes)
	) ? FZ88 : 0
}

/**
 * ✅ 4. Nine gates (Jiu lian baodeng, 九莲宝灯).
 * Suited sequence 1112345678999 at hand, waiting for any additional tile in the suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz4JiuLianBaodeng(struct) {
	if (!struct.qingyise) return 0
	if (struct.game.players[struct.key].melds.length) return 0

	let door = Object.assign([], struct.tiles)
	door.splice(-1, 1)
	sortTiles(door)

	return (door.map(item => item[1]).join('') === '1112345678999') ? FZ88 : 0
}

/**
 * ✅ 5. Four gangs (Si gang, 四杠).
 * Four open or concealed gangs.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz5SiGang(struct) {
	return (struct.tiles.length === 18) ? FZ88 : 0
}

/**
 * ✅ 6. Seven shifted pairs (Lian qi dui, 连七对).
 * Sequence of seven pairs shifted up one in value, e.g. 33445566778899
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz6LianQiDui(struct) {
	const types = struct.shuTypes14.filter(item => item[1].length === 14)

	return (
		types.length &&
		struct.tiles.length === 14 &&
		types[0][1].match(LIANQIDUI)
	) ? FZ88 : 0
}

/**
 * ✅ 7. Thirteen orphans (Shisan yao, 十三幺).
 * All suited 1s and 9s, one each of honors, plus an additional tile of the same kind.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 88.
 */
export async function fz7ShisanYao(struct) {
	return (struct.game.players[struct.key].hu.shisanyao) ? FZ88 : 0
}
