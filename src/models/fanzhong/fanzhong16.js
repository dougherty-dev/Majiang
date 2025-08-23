#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong16
 * @property {Function} fz28QingLong 28. Pure straight (Qing long, 清龙).
 * @property {Function} fz29SanSeShuangLongHui 29. Three-suited terminal shunzi (San se shuang long hui, 三色双龙会).
 * @property {Function} fz30YiSeSanBuGao 30. Pure shifted shunzi (Yi se san bu gao, 一色三步高).
 * @property {Function} fz31QuanDaiWu 31. All fives (Quan dai wu, 全带五).
 * @property {Function} fz32SanTongke 32. Triple kezi (San tongke, 三同刻).
 * @property {Function} fz33SanAnke 33. Three concealed kezi (San anke, 三暗刻).
 */

import { checkPattern } from '../../components/hu/check-type.js'
import { KEZI } from '../../components/hu/patterns.js'

const FZ16 = 16

/**
 * ✅ 28. Pure straight (Qing long, 清龙).
 * Three shunzi 123, 456, 789 in the same suit.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz28QingLong(struct) {
	const shuTypes = struct.shuTypes14.filter(item => item[1].match(/1+2+3+4+5+6+7+8+9+/g))
	if (!shuTypes.length) return 0
	let types = shuTypes[0][1]

	// Remove long, check remainder
	for (const digit of '123456789'.split('')) {
		types = types.replace(digit, '')
	}

	if (types.length === 0) return FZ16

	return (await checkPattern(types)) ? FZ16 : 0
}

/**
 * ✅ 29. Three-suited terminal shunzi (San se shuang long hui, 三色双龙会).
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
 * ✅ 30. Pure shifted shunzi (Yi se san bu gao, 一色三步高).
 * Three suited shunzi shifted up either 1 or 2 in value, but not both.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz30YiSeSanBuGao(struct) {
	const shuTypes = struct.shuTypes14.filter(item => item[1].length >= 9)
	if (!shuTypes.length) return 0
	let types = shuTypes[0][1]

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

	const type = types.match(shifted)
	if (!type) return 0

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
		types = types.replace(digit, '')
	}

	if (types.length === 0) return FZ16

	return (await checkPattern(types)) ? FZ16 : 0
}

/**
 * ✅ 31. All fives (Quan dai wu, 全带五).
 * All shunzi, kezi (gangzi) and duizi containing a five.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz31QuanDaiWu(struct) {
	if (struct.hasZi) return 0

	const noWu = struct.shuTypes14.filter(item => !item[1].includes('5'))
	if (noWu.length) return 0

	const patterns = [
		'55', '345', '456', '555', '567', '34555', '45556', '55567', '334455',
		'344556', '345555', '345567', '445566', '455556', '455667', '555567',
		'556677', '33445555', '34455556', '34555567', '44555566', '45555667',
		'55556677', '333444555', '334445556', '334455567', '344455566',
		'344555667', '345556677', '444555666', '445556667', '455566677',
		'555666777', '333344445555', '333444455556', '333444555567',
		'334444555566', '334445555667', '334455556677', '344445555666',
		'344455556667', '344555566677', '345555666777', '444455556666',
		'444555566667', '445555666677', '455556666777', '555566667777',
	]

	const types =  struct.shuTypes14.filter(item => patterns.includes(item[1]))
	if (types.length !== struct.shuTypes14.length) return 0

	const melds = struct.game.players[struct.key].melds
		.filter(item => ['gang', 'angang'].includes(item.type))
		.map(item => item.meld)
		.filter(item => item[0][1] === 5)

	return (melds.length) ? 0 : FZ16
}

/**
 * ✅ 32. Triple kezi (San tongke, 三同刻).
 * Three kezi (gangzi) of the same value.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 16.
 */
export async function fz32SanTongke(struct) {
	const types = struct.shuTypes14.filter(item => item[1])
		.map(item => item[1].match(KEZI))
		.filter(item => item).flat()

	const candidates = [...new Set(types)]
	if (candidates.length + 2 > types.length) return 0

	let santongke
	const shuTypes = struct.shuTypes14.map(item => item[1])
	for (const candidate of candidates) {
		// Remove kezi, check remainder
		santongke = true

		for (const shuType of shuTypes) {
			let type = shuType
			for (const digit of candidate.split('')) {
				type = type.replace(digit, '')
			}

			santongke = await checkPattern(type)
		}

		if (santongke) return FZ16
	}

	return 0
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
