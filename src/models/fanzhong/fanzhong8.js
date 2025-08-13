#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong8
 */

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

// 43. Chicken hand (Wu fan hu, 无番和)
export async function fz43WuFanHu(struct) {
	return FZ8
}

// 48. Two concealed gangzi (Shuang angang, 双暗杠)
export async function fz48ShuangAngang(struct) {
	const melds = struct.game.players[struct.key].melds
	const angang = melds.filter(item => item.type === 'angang')

	return (angang.length === 2) ? FZ8 : 0
}
