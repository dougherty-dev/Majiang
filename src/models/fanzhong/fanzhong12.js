#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong12
 */

import { SHU } from '../tiles.js'

const FZ12 = 12

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
