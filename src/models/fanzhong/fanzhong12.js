#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong12
 */

import { SHU } from '../tiles.js'

const FZ12 = 12

// 34. Lesser honors and knitted tiles (Quan bu kao, 全不靠)
export async function fz34QuanBuKao(struct) {
	const hu = struct.game.players[struct.key].hu

	return (hu.isKnitted && hu.isLesserHonors) ? FZ12 : 0
}

// 35. Knitted straight (Zuhe long, 组合龙)
export async function fz35ZuheLong(struct) {
	const hu = struct.game.players[struct.key].hu

	return (hu.isKnittedStraight) ? FZ12 : 0
}

// 36. Upper four (Da yu wu, 大于五)
export async function fz36DaYuWu(struct) {
	const lower = struct.tiles.filter(item => SHU.includes(item[7]) && item[1] > 5)

	return (lower.length >= 14) ? FZ12 : 0
}

// 37. Lower four (Xiao yu wu, 小于五)
export async function fz37XiaoYuWu(struct) {
	const lower = struct.tiles.filter(item => SHU.includes(item[7]) && item[1] < 5)

	return (lower.length >= 14) ? FZ12 : 0
}

// 38. Big three winds (San feng ke, 三风刻)
// From: 1. Big four winds (Da si xi, 大四喜)
export async function fz38SanFengKe(struct) {
	const pattern = new RegExp([
		'1{3,4}2{3,4}3{3,4}',
		'1{3,4}2{3,4}4{3,4}',
		'1{3,4}3{3,4}4{3,4}',
		'2{3,4}3{3,4}4{3,4}'
	].join('|'), 'g')

	return (struct.fengTypes.match(pattern)) ? FZ12 : 0
}
