#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong32
 * @property {Function} fz16YiSeSiBuGao 16. Four shifted shunzi (Yi se si bu gao, 一色四步高).
 * @property {Function} fz17SanGang 17. Three gangs (San gang, 三杠).
 * @property {Function} fz18HunYaoJiu 18. Non-pure terminals (Hun yao jiu, 混幺九).
 */

const FZ32 = 32

/**
 * 16. Four shifted shunzi (Yi se si bu gao, 一色四步高).
 * Four shunzi in the same suit, shifted up one or two in value for each shunzi.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 32.
 */
export async function fz16YiSeSiBuGao(struct) {
	if (struct.nonchiMelds.length) return 0

	let types = struct.shuTypes.filter(item => item[1].length >= 12)
	if (!types.length) return 0
	types = types[0][1]

	const duizi = struct.game.players[struct.key].hu.duizi
	if (duizi.length && types.length === 14) {
		const value = duizi[0][1]
		types = types.replace(value, '').replace(value, '')
	}

	const shifted = /(122333444556|233444555667|344555666778|455666777889|123345567789)/g

	return (types.match(shifted)) ? FZ32 : 0
}

/**
 * 17. Three gangs (San gang, 三杠).
 * Exactly three gangs amounts to 17 tiles.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 32.
 */
export async function fz17SanGang(struct) {
	return (struct.tiles.length === 17) ? FZ32 : 0
}

/**
 * 18. Non-pure terminals (Hun yao jiu, 混幺九).
 * Kezi (gangzi) and a single duizi of ones and/or nines, and honors.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 32.
 */
export async function fz18HunYaoJiu(struct) {
	if (struct.chiMelds.length) return 0

	const hasZi = struct.fengTypes.length || struct.jianTypes.length
	const shuTypes = struct.shuTypes.map(item => item[1]).join('')

	return (hasZi && /^[19][^2345678]+$/.test(shuTypes)) ? FZ32 : 0
}
