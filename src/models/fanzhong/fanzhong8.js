#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong8
 * @property {Function} fz39Hualong 39. Mixed straight (Hualong, 花龙).
 * @property {Function} fz40Tuibudao 40. Reversible tiles (Tuibudao, 推不倒).
 * @property {Function} fz41SanSeSanTongshun 41. Mixed triple shunzi (San se san tongshun, 三色三同顺).
 * @property {Function} fz42SanSeSanJieGao 42. Mixed shifted kezi (San se san jie gao, 三色三节高).
 * @property {Function} fz43WuFanHu 43. Chicken hand (Wu fan hu, 无番和).
 * @property {Function} fz44MiaoshouHuichun 44. Last tile draw (Miaoshou-huichun, 妙手回春).
 * @property {Function} fz45HaidiLaoyue 45. Last tile claim (Haidi-laoyue, 海底捞月).
 * @property {Function} fz46GangshangKaihua 46. Out with replacement tile (Gangshang kaihua, 杠上开花).
 * @property {Function} fz47Qiangganghu 47. Robbing the gang (Qiangganghu, 抢杠和).
 * @property {Function} fz48ShuangAngang 48. Two concealed gangzi (Shuang angang, 双暗杠).
 */

import { checkPattern } from '../../components/hu/check-type.js'
import { KEZI, SHUNZI } from '../../components/hu/patterns.js'

const FZ8 = 8

// 39. Mixed straight (Hualong, 花龙)
export async function fz39Hualong(struct) {
	const shunzi = struct.game.players[struct.key].hu.shunzi.map(item => `${item[0]}${item[1]}`)
	const hualong = [
		['b123', 't456', 'w789'],
		['b123', 't789', 'w456'],
		['b456', 't123', 'w789'],
		['b456', 't789', 'w123'],
		['b789', 't123', 'w456'],
		['b789', 't456', 'w123']
	]

	for (const long of hualong) {
		const contains = long.every(item => shunzi.includes(item))
		if (contains) return FZ8
	}

	return 0
}

/**
 * ✅ 40. Reversible tiles (Tuibudao, 推不倒).
 * Dots 1234589, bamboo 245689, and white dragon only.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 8.
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
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 8.
 */
export async function fz41SanSeSanTongshun(struct) {
	const shuTypes = struct.shuTypes14.filter(item => item[1] !== '')
	if (shuTypes.length < 3) return 0

	let sorted = shuTypes.map(item => item[1]).sort((a, b) => a.length - b.length)

	const shunzi = sorted[0].match(SHUNZI)
	if (!shunzi) return 0

	// Remove shunzi, check remainder
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
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 8.
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
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 8.
 */
export async function fz43WuFanHu(struct) {
	return (struct.points === 0) ? FZ8 : 0 
}

/**
 * ✅ 44. Last tile draw (Miaoshou-huichun, 妙手回春).
 * Self-draw win on the last tile in the wall.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 8.
 */
export async function fz44MiaoshouHuichun(struct) {
	const zimo = struct.game.players[struct.key].hu.zimo
	const tileCount = struct.game.tiles.length
	return (zimo && tileCount === 0) ? FZ8 : 0
}

/**
 * ✅ 45. Last tile claim (Haidi-laoyue, 海底捞月).
 * Winning on the last (discarded) tile in the game.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 8.
 */
export async function fz45HaidiLaoyue(struct) {
	const dianhu = struct.game.players[struct.key].hu.dianhu
	const tileCount = struct.game.tiles.length
	return (dianhu && tileCount === 0) ? FZ8 : 0
}

// 46. Out with replacement tile (Gangshang kaihua, 杠上开花)
// PROBBLEMATIC
export async function fz46GangshangKaihua(struct) {
	return (struct.game.gangshangKaihua) ? FZ8 : 0
}

// 47. Robbing the gang (Qiangganghu, 抢杠和)
// PROBBLEMATIC
export async function fz47Qiangganghu(struct) {
	return (struct.game.qianggang) ? FZ8 : 0
}

/**
 * ✅ 48. Two concealed gangzi (Shuang angang, 双暗杠).
 * Having two concealed gangzi laid out.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 8.
 */
export async function fz48ShuangAngang(struct) {
	return (struct.angangMelds.length === 2) ? FZ8 : 0
}
