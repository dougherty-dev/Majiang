#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong64
 * @description 64 番 (fan) scoring rules.
 * @property {function} fz8QingYaoJiu 8. Pure terminals (Qing yao jiu, 清幺九).
 * @property {function} fz9XiaoSiXi 9. Little four winds (Xiao si xi, 小四喜).
 * @property {function} fz10XiaoSanYuan 10. Little three dragons (Xiao san yuan, 小三元).
 * @property {function} fz11ZiYiSe 11. All honors (Zi yi se, 字一色).
 * @property {function} fz12SiAnke 12. Four concealed kezi (Si anke, 四暗刻).
 * @property {function} fz13YiSeShuangLongHui 13. Pure terminal shunzi (Yi se shuang long hui, 一色双龙会).
 */

import { checkPattern } from '../../components/hu/check-type.js'
import { KEZI, TYPES } from '../../components/hu/patterns.js'

const FZ64 = 64

/**
 * ✅ 8. Pure terminals (Qing yao jiu, 清幺九).
 * Suited kezi of 1s and 9s only.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 64.
 */
export async function fz8QingYaoJiu(struct) {
	const types = struct.shuTypes.map(item => item[1]).join('')

	return (!struct.hasZi && /^[19][^2345678]+$/.test(types)) ? FZ64 : 0
}

/**
 * ✅ 9. Little four winds (Xiao si xi, 小四喜).
 * Three kezi/gangzi and a pair with winds, and an arbitrary shunzi/kezi/gangzi.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 64.
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
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 64.
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
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 64.
 */
export async function fz11ZiYiSe(struct) {
	return (struct.hasShu) ? 0 : FZ64
}

/**
 * ✅ 12. Four concealed kezi (Si anke, 四暗刻).
 * All melds are concealed kezi/gangzi, either on hand or as melded angang.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 64.
 */
export async function fz12SiAnke(struct) {
	struct.concealedKezi = struct.angangMelds.length
	const hupai = struct.game.hupai

	let door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].dianhu) door.push(hupai)

	let types = Object.assign({}, TYPES)
	for (const tile of door) {
		types[tile[7]] += tile[1]
	}

	types = Object.entries(types).filter(item => item[1])
	for (const type of types) {
		type[1] = type[1].split('').sort().join('')
	}

	for (const type of types) {
		let currentType = type
		const kezi = currentType[1].match(KEZI) ?? []

		for (const set of kezi) {
			let previousType = currentType
			currentType[1] = currentType[1].replace(set, '')
			if (await checkPattern(currentType[1])) {
				// Discarded tile forming a kezi is not concealed.
				if (!(type[0] === hupai[7] && set[0] == hupai[1])) {
					struct.concealedKezi++
				}
			} else {
				currentType = previousType
			}
		}
	}

	return (struct.concealedKezi === 4) ? FZ64 : 0
}

/**
 * ✅ 13. Pure terminal shunzi (Yi se shuang long hui, 一色双龙会).
 * All melds in one suit, with two shunzi 123 and 789 each, and a pair 55.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 64.
 */
export async function fz13YiSeShuangLongHui(struct) {
	const types = struct.shuTypes.filter(item => item[1] === '11223355778899')

	return (types.length && struct.tiles.length === 14) ? FZ64 : 0
}
