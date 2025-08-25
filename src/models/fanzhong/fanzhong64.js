#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong64
 * @description Rules definitions for 64 fan.
 * @property {Function} fz8QingYaoJiu 8. Pure terminals (Qing yao jiu, 清幺九).
 * @property {Function} fz9XiaoSiXi 9. Little four winds (Xiao si xi, 小四喜).
 * @property {Function} fz10XiaoSanYuan 10. Little three dragons (Xiao san yuan, 小三元).
 * @property {Function} fz11ZiYiSe 11. All honors (Zi yi se, 字一色).
 * @property {Function} fz12SiAnke 12. Four concealed kezi (Si anke, 四暗刻).
 * @property {Function} fz13YiSeShuangLongHui 13. Pure terminal shunzi (Yi se shuang long hui, 一色双龙会).
 */

import { DUIZI, KEZI } from '../../components/hu/patterns.js'
import { keziLookup } from '../../components/lookup/kezi.js'

const FZ64 = 64

/**
 * ✅ 8. Pure terminals (Qing yao jiu, 清幺九).
 * Suited kezi of 1s and 9s only.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz8QingYaoJiu(struct) {
	const types = struct.shuTypes.map(item => item[1]).join('')

	return (!struct.hasZi && /^[19][^2345678]+$/.test(types)) ? FZ64 : 0
}

/**
 * ✅ 9. Little four winds (Xiao si xi, 小四喜).
 * Three kezi/gangzi and a pair with winds, and an arbitrary shunzi/kezi/gangzi.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz9XiaoSiXi(struct) {
	const pattern = new RegExp([
		'1{2}2{3,4}3{3,4}4{3,4}',
		'1{3,4}2{2}3{3,4}4{3,4}',
		'1{3,4}2{3,4}3{2}4{3,4}',
		'1{3,4}2{3,4}3{3,4}4{2}'
	].join('|'), 'g')

	return (struct.fengTypes.match(pattern)) ? FZ64 : 0
}

/**
 * ✅ 10. Little three dragons (Xiao san yuan, 小三元).
 * Two kezi/gangzi and a pair with dragons, and an additional arbitrary kezi/shunzi.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz10XiaoSanYuan(struct) {
	const pattern = new RegExp([
		'1{2}2{3,4}3{3,4}',
		'1{3,4}2{2}3{3,4}',
		'1{3,4}2{3,4}3{2}',
	].join('|'), 'g')

	return (struct.jianTypes.match(pattern)) ? FZ64 : 0
}

/**
 * ✅ 11. All honors (Zi yi se, 字一色).
 * All melds are kezi/gangzi of winds and dragons.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz11ZiYiSe(struct) {
	return (struct.hasShu) ? 0 : FZ64
}

/**
 * ✅ 12. Four concealed kezi (Si anke, 四暗刻).
 * All melds are concealed kezi/gangzi, either on hand or as melded angang.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz12SiAnke(struct) {
	if (struct.openMelds.length) return 0

	const types14 = struct.allTypes14.map(item => [item[0], item[1].match(KEZI)]).filter(item => item[1])
	if (types14.map(item => item[1]).flat().length !== 4) return 0

	const types = Object.assign(struct.allTypes14.filter(item => item[1].length > 2))
	for (const type of types) {
		if (!keziLookup[`kezi${type[1].length}`][type[1]]) return 0
	}

	if (struct.game.players[struct.key].hu.dianhu) {
		const drop = struct.game.drop
		const pair = Object.assign(struct.allTypes14.filter(item => item[1].length === 2)).flat()

		if (
			drop.length && pair.length &&
			(drop[0] !== pair[0] || !pair[1].includes(drop[1])) // hupai not in pair but in kezi
		) return 0
	}

	if (!struct.derivedSets.length) {
		struct.derivedSets = struct.allTypes14
			.map(item => [item[0], item[1].match(KEZI) || item[1].match(DUIZI)])
	}

	return FZ64
}

/**
 * ✅ 13. Pure terminal shunzi (Yi se shuang long hui, 一色双龙会).
 * All melds in one suit, with two shunzi 123 and 789 each, and a pair 55.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz13YiSeShuangLongHui(struct) {
	const types = struct.shuTypes.filter(item => item[1] === '11223355778899')

	return (types.length && struct.tiles.length === 14) ? FZ64 : 0
}
