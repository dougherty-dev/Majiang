#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 * @property {Function} fz28QingLong 28. Pure straight (Qing long, 清龙).
 * @property {Function} fz29SanSeShuangLongHui 29. Three-suited terminal shunzi (San se shuang long hui, 三色双龙会).
 * @property {Function} fz30YiSeSanBuGao 30. Pure shifted shunzi (Yi se san bu gao, 一色三步高).
 * @property {Function} fz31QuanDaiWu 31. All fives (Quan dai wu, 全带五).
 * @property {Function} fz32SanTongke 32. Triple kezi (San tongke, 三同刻).
 * @property {Function} fz33SanAnke 33. Three concealed kezi (San anke, 三暗刻).
 */

import { lookup2 } from '../../components/hu/lookup2.js'
import { lookup3 } from '../../components/hu/lookup3.js'
import { lookup5 } from '../../components/hu/lookup5.js'
import { SHIFTEDAX3, SHIFTEDBX3 } from '../../components/hu/patterns.js'
import { SHU } from '../tiles.js'

const FZ16 = 16

/**
 * 28. Pure straight (Qing long, 清龙).
 * Three shunzi 123, 456, 789 in the same suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz28QingLong(struct) {
	let shuTypes = struct.shuTypes.filter(item => item[1].match(/1+2+3+4+5+6+7+8+9+/g))
	if (!shuTypes.length) return 0
	shuTypes = shuTypes[0][1]

	// Remove long, check remainder
	for (const digit of '123456789'.split('')) {
		shuTypes = shuTypes.replace(digit, '')
	}

	const lookup = {
		lookup2: lookup2,
		lookup3: lookup3,
		lookup5: lookup5
	}

	if (shuTypes.length === 0) return FZ16

	if ([2, 3, 5].includes(shuTypes.length)) {
		console.log(shuTypes.length)
		if (shuTypes in lookup[`lookup${shuTypes.length}`]) return FZ16
	}

	return 0
}

/**
 * 29. Three-suited terminal shunzi (San se shuang long hui, 三色双龙会).
 * Two suited shunzi each of 1-2-3 and 7-8-9, and a pair of fives in the third suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz29SanSeShuangLongHui(struct) {
	const shuanglong = struct.shuTypes.filter(item => item[1] === '123789').length
	const fives = struct.shuTypes.filter(item => item[1] === '55').length

	return (shuanglong === 2 && fives === 1) ? FZ16 : 0
}

// Not satisfactory, rewrite
/**
 * 30. Pure shifted shunzi (Yi se san bu gao, 一色三步高).
 * Three suited shunzi shifted up either 1 or 2 in value, but not both.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz30YiSeSanBuGao(struct) {
	const hu = struct.game.players[struct.key].hu

	for (const type of Object.values(hu.types)) {
		if (type.match(SHIFTEDAX3) || type.match(SHIFTEDBX3)) {
			return FZ16
		}
	}

	return 0
}

/**
 * 31. All fives (Quan dai wu, 全带五).
 * All shunzi, kezi (gangzi) and duizi containing a five.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz31QuanDaiWu(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const quandaiwu = melds.filter(item => item[1].includes('5'))

	return (quandaiwu.length === 5) ? FZ16 : 0
}

/**
 * 32. Triple kezi (San tongke, 三同刻).
 * Three kezi (gangzi) of the same value.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz32SanTongke(struct) {
	const suited = struct.keziGangzi.filter(item => SHU.includes(item[0]))
	const reduced = suited.map(item => item[1][0])
	const set = [...new Set(reduced)]

	return (reduced.length === 3 && set.length === 1) ? FZ16 : 0
}

/**
 * 33. Three concealed kezi (San anke, 三暗刻).
 * Three kezi (gangzi), on hand or melded (angang).
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz33SanAnke(struct) {
	return (struct.concealedKezi === 3) ? FZ16 : 0
}
