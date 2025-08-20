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
import { KEZI } from '../../components/hu/patterns.js'

const FZ16 = 16
const lookup = {
	lookup2: lookup2,
	lookup3: lookup3,
	lookup5: lookup5
}

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

	if (shuTypes.length === 0) return FZ16

	if ([2, 3, 5].includes(shuTypes.length)) {
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

/**
 * 30. Pure shifted shunzi (Yi se san bu gao, 一色三步高).
 * Three suited shunzi shifted up either 1 or 2 in value, but not both.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz30YiSeSanBuGao(struct) {
	let shuTypes = struct.shuTypes.filter(item => item[1].length >= 9)
	if (!shuTypes.length) return 0
	shuTypes = shuTypes[0][1]

	const shifted = new RegExp ([
		'1{1,}2{2,}3{3,}4{2,}5{1,}',
		'2{1,}3{2,}4{3,}5{2,}6{1,}',
		'3{1,}4{2,}5{3,}6{2,}7{1,}',
		'4{1,}5{2,}6{3,}7{2,}8{1,}',
		'5{1,}6{2,}7{3,}8{2,}9{1,}',
		'1{1,}2{1,}3{2,}4{1,}5{2,}6{1,}7{1,}',
		'2{1,}3{1,}4{2,}5{1,}6{2,}7{1,}8{1,}',
		'3{1,}4{1,}5{2,}6{1,}7{2,}8{1,}9{1,}'
	].join('|'), 'g')

	const type = shuTypes.match(shifted)
	if (type && type.length === 0) return 0
console.log(type)
	const digits = [...new Set(type[0].split(''))].join('')
	const patterns = {
		'15': '122333445',
		'26': '233444556',
		'37': '344555667',
		'47': '455666778',
		'59': '566777889',
		'17': '123345567',
		'28': '234456678',
		'39': '345567789'
	}

	const pattern = patterns[`${digits[0]}${digits.at(-1)}`]

	// Remove shunzi, check remainder
	for (const digit of pattern.split('')) {
		shuTypes = shuTypes.replace(digit, '')
	}

	if (shuTypes.length === 0) return FZ16

	if ([2, 3, 5].includes(shuTypes.length)) {
		if (shuTypes in lookup[`lookup${shuTypes.length}`]) return FZ16
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
	if (struct.jianTypes.length || struct.fengTypes.length) return 0

	const noWu = struct.shuTypes.filter(item => !item[1].includes('5'))
	if (noWu.length) return 0

	const melds = struct.game.players[struct.key]
		.melds.filter(item => ['gang', 'angang'].includes(item.type))
		.map(item => item.meld)
		.filter(item => item[0][1] === 5)

	return (melds.length) ? 0 : FZ16
}

/**
 * 32. Triple kezi (San tongke, 三同刻).
 * Three kezi (gangzi) of the same value.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz32SanTongke(struct) {
	const kezi = struct.shuTypes.filter(item => item[1]
		.match(KEZI))
		.map(item => item[1])
		.sort((a, b) => a.length - b.length)

	if (!kezi.length) return

	const santongke = kezi.filter(item => item.includes(kezi[0]))

	return (santongke.length === 3) ? FZ16 : 0
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
