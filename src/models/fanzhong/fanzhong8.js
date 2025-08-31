#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong8
 * @description 8 番 (fan) scoring rules.
 * @property {function} fz39Hualong 39. Mixed straight (Hualong, 花龙).
 * @property {function} fz40Tuibudao 40. Reversible tiles (Tuibudao, 推不倒).
 * @property {function} fz41SanSeSanTongshun 41. Mixed triple shunzi (San se san tongshun, 三色三同顺).
 * @property {function} fz42SanSeSanJieGao 42. Mixed shifted kezi (San se san jie gao, 三色三节高).
 * @property {function} fz43WuFanHu 43. Chicken hand (Wu fan hu, 无番和).
 * @property {function} fz44MiaoshouHuichun 44. Last tile draw (Miaoshou-huichun, 妙手回春).
 * @property {function} fz45HaidiLaoyue 45. Last tile claim (Haidi-laoyue, 海底捞月).
 * @property {function} fz46GangshangKaihua 46. Out with replacement tile (Gangshang kaihua, 杠上开花).
 * @property {function} fz47Qiangganghu 47. Robbing the gang (Qiangganghu, 抢杠和).
 * @property {function} fz48ShuangAngang 48. Two concealed gangzi (Shuang angang, 双暗杠).
 */

import { checkPattern } from '../../components/hu/check-type.js'
import { KEZI, SHUNZI } from '../../components/hu/patterns.js'
import { lookup5 } from '../../components/lookup/lookup.js'

const FZ8 = 8

// ✅ 39. Mixed straight (Hualong, 花龙)
export async function fz39Hualong(struct) {
	const shuTypes = struct.shuTypes14.filter(item => item[1])
		.filter(item => item[1].length > 2).map(item => item[1]).flat()
		.sort((a, b) => a.length - b.length)

	// Three suited sets, lengths: 3, 3, 3 | 3, 3, 5 | 3, 3, 6 | 3, 5, 6 
	if (shuTypes.length < 3) return 0

	let shunzi = []

	if (!shuTypes[0].match(SHUNZI)) return 0
	shunzi.push(shuTypes[0]) // First set given, length 3.

	let sets
	switch (shuTypes[1].length) { // Second set 3 or 5.
	case 3:
		shunzi.push(shuTypes[1])
		break
	case 5:
		if (!lookup5[shuTypes[1]]) return 0
		sets = lookup5[shuTypes[1]].flat().filter(item => item.length === 3)
		if (!sets[0].match(SHUNZI)) return 0
		shunzi.push(sets[0])
	}

	let hualong = '123456789'
	for (const set of shunzi) {
		hualong = hualong.replace(set, '')
	}

	if (hualong.length !== 3 || !hualong.match(SHUNZI) || !shuTypes[2].match(hualong)) return 0
	shuTypes[2] = shuTypes[2].replace(hualong, '')

	switch (shuTypes[2].length) { // Third set 3 or 6, check remainder.
	case 0:
		return FZ8
	case 3:
		return (shuTypes[2].match(SHUNZI) || shuTypes[2].match(KEZI)) ? FZ8 : 0
	}

	return 0
}

/**
 * ✅ 40. Reversible tiles (Tuibudao, 推不倒).
 * Dots 1234589, bamboo 245689, and white dragon only.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz40Tuibudao(struct) {
	return (
		struct.types.f === '' &&
		struct.types.w === '' &&
		/^[3][^12]*$/g.test(struct.types.j) &&
		/^[245689][^137]*$/g.test(struct.types.t) &&
		/^[1234589][^67]*$/g.test(struct.types.b)
	) ? FZ8 : 0
}

/**
 * ✅ 41. Mixed triple shunzi (San se san tongshun, 三色三同顺).
 * Three equal shunzi in each suit.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz41SanSeSanTongshun(struct) {
	const shuTypes = struct.shuTypes14.filter(item => item[1])
	if (shuTypes.length < 3) return 0

	let sorted = shuTypes.map(item => item[1]).sort((a, b) => a.length - b.length)

	// Three shunzi in three suits means shortest set has length 3, and is in fact a shunzi.
	// Three shunzi equals nine tiles, remaining five can be arranged as 5 or 2 + 3.
	const shunzi = sorted[0].match(SHUNZI)
	if (!shunzi) return 0

	// Remove shunzi, check remainder.
	for (const digit of shunzi[0].split('')) {
		if (!sorted[1].includes(digit) || !sorted[2].includes(digit)) return 0
		sorted[1] = sorted[1].replace(digit, '')
		sorted[2] = sorted[2].replace(digit, '')
	}

	for (const key of [1, 2]) {
		if (!await checkPattern(sorted[key])) return 0
	}

	return FZ8
}

/**
 * ✅ 42. Mixed shifted kezi (San se san jie gao, 三色三节高).
 * Three kezi (gangzi) in each suit, shifted upwards in value.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz42SanSeSanJieGao(struct) {
	let shuTypes = struct.shuTypes14.filter(item => item[1] !== '')
	if (shuTypes.length < 3) return 0

	const kezi = shuTypes.map(item => item[1].match(KEZI))
	if (kezi.length < 3) return 0

	const sorted = kezi.sort().map(item => parseInt(item))
	const diff = sorted[2] - sorted[1] === 111 && sorted[1] - sorted[0] === 111
	if (!diff) return 0

	// Remove kezi, check remainder
	let remainder = shuTypes.map(item => item[1]
		.replace(item[1].match(KEZI), ''))
		.filter(item => item)

	for (const type of remainder) {
		if (!await checkPattern(type)) return 0
	}

	return FZ8
}

/**
 * ✅ 43. Chicken hand (Wu fan hu, 无番和).
 * Hand with no regular fan value.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz43WuFanHu(struct) {
	return (struct.points === 0) ? FZ8 : 0 
}

/**
 * ✅ 44. Last tile draw (Miaoshou-huichun, 妙手回春).
 * Self-draw win on the last tile in the wall.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz44MiaoshouHuichun(struct) {
	const zimo = struct.game.players[struct.key].zimo
	const tileCount = struct.game.tiles.length
	return (zimo && tileCount === 0) ? FZ8 : 0
}

/**
 * ✅ 45. Last tile claim (Haidi-laoyue, 海底捞月).
 * Winning on the last (discarded) tile in the game.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz45HaidiLaoyue(struct) {
	const dianhu = struct.game.players[struct.key].dianhu
	const tileCount = struct.game.tiles.length
	return (dianhu && tileCount === 0) ? FZ8 : 0
}

/**
 * ✅ 46. Out with replacement tile (Gangshang kaihua, 杠上开花).
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz46GangshangKaihua(struct) {
	return (struct.game.players[struct.key].gangshangKaihua === 2) ? FZ8 : 0
}

/**
 * ✅ 47. Robbing the gang (Qiangganghu, 抢杠和).
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz47Qiangganghu(struct) {
	return (struct.game.players[struct.key].qianggang) ? FZ8 : 0
}

/**
 * ✅ 48. Two concealed gangzi (Shuang angang, 双暗杠).
 * Having two concealed gangzi laid out.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 8.
 */
export async function fz48ShuangAngang(struct) {
	return (struct.angangMelds.length === 2) ? FZ8 : 0
}
