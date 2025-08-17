#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong8
 */

import { BING, FENG, JIAN, SHU, TIAO, WAN } from '../tiles.js'

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

// 40. Reversible tiles (Tuibudao, 推不倒)
export async function fz40Tuibudao(struct) {
	const melds = Object.entries(struct.game.players[struct.key].hu.types)

	const winds = melds.filter(item => item[0] === FENG)
	if (winds.length) return 0

	const wanzi = melds.filter(item => item[0] === WAN)
	if (wanzi.length) return 0

	const dragons = melds.filter(item => item[0] === JIAN && !item[1].includes('3'))
	if (dragons.length) return 0

	const tiaozi = melds.filter(item => item[0] === TIAO && !item[1].match(/^[245689]+$/))
	if (tiaozi.length) return 0

	const bingzi = melds.filter(item => item[0] === BING && !item[1].match(/^[1234589]+$/))
	if (bingzi.length) return 0

	return FZ8
}

// 41. Mixed triple shunzi (San se san tongshun, 三色三同顺)
export async function fz41SanSeSanTongshun(struct) {
	const values = struct.game.players[struct.key].hu.shunzi.map(item => `${item[1]}`)
	if (values.length < 3) return 0

	const top = Array.from(new Set(values)).reduce((prev, curr) =>
		values.filter(el => el === curr).length > values.filter(el => el === prev).length ? curr : prev
	)

	const shunzi = struct.game.players[struct.key].hu.shunzi.map(item => `${item[0]}${item[1]}`)
	for (const type of SHU) {
		if (!shunzi.includes(type + top)) return 0
	}

	return FZ8
}

// 42. Mixed shifted kezi (San se san jie gao, 三色三节高)
export async function fz42SanSeSanJieGao(struct) {
	const kegang = struct.keziGangzi.filter(item => SHU.includes(item[0])).map(item => `${item[0]}${item[1]}`)
	if (kegang.length < 3) return 0

	const combinations = [
		[111, 222, 333],
		[111, 333, 222],
		[222, 111, 333],
		[222, 333, 111],
		[333, 111, 222],
		[333, 222, 111]
	]

	for (const add of [111, 222, 333, 444, 555, 666, 777]) {
		for (const combo of combinations) {
			if (
				kegang.includes(`b${combo[0] + add}`) &&
				kegang.includes(`t${combo[1] + add}`) &&
				kegang.includes(`w${combo[2] + add}`)
			) return FZ8
		}
	}

	return 0
}

// 43. Chicken hand (Wu fan hu, 无番和)
export async function fz43WuFanHu(struct) { // eslint-disable-line
	return FZ8
}

// 44. Last tile draw (Miaoshou-huichun, 妙手回春)
export async function fz44MiaoshouHuichun(struct) {
	const zimo = struct.game.players[struct.key].hu.zimo
	const tileCount = struct.game.tiles.length
	return (zimo && tileCount === 0) ? FZ8 : 0
}

// 45. Last tile claim (Haidi-laoyue, 海底捞月)
export async function fz45HaidiLaoyue(struct) {
	const dianhu = struct.game.players[struct.key].hu.dianhu
	const tileCount = struct.game.tiles.length
	return (dianhu && tileCount === 0) ? FZ8 : 0
}

// 46. Out with replacement tile (Gangshang kaihua, 杠上开花)
export async function fz46GangshangKaihua(struct) {
	return (struct.game.gangshangKaihua) ? FZ8 : 0
}

// 47. Robbing the gang (Qiangganghu, 抢杠和)
export async function fz47Qiangganghu(struct) {
	return (struct.game.qianggang) ? FZ8 : 0
}

// 48. Two concealed gangzi (Shuang angang, 双暗杠)
export async function fz48ShuangAngang(struct) {
	const melds = struct.game.players[struct.key].melds
	const angang = melds.filter(item => item.type === 'angang')
	return (angang.length === 2) ? FZ8 : 0
}
