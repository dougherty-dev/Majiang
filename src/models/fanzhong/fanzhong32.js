#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong32
 * @description 32 番 (fan) scoring rules.
 * @property {function} fz16YiSeSiBuGao 16. Four shifted shunzi (Yi se si bu gao, 一色四步高).
 * @property {function} fz17SanGang 17. Three gangs (San gang, 三杠).
 * @property {function} fz18HunYaoJiu 18. Non-pure terminals (Hun yao jiu, 混幺九).
 */

const FZ32 = 32

/**
 * ✅ 16. Four shifted shunzi (Yi se si bu gao, 一色四步高).
 * Four shunzi in the same suit, shifted up one or two in value for each shunzi.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 32.
 */
export async function fz16YiSeSiBuGao(struct) {
	if (struct.nonchiMelds.length) return 0

	let types = struct.shuTypes14.filter(item => item[1].length >= 12)
	if (!types.length) return 0

	const patterns = new RegExp([
		'122333444556', '233444555667', '344555666778', '455666777889', '123345567789',
		'11122333444556', '12222333444556', '12233344455556', '12233344455666', '12233344455677',
		'12233344455688', '12233344455699', '11233444555667', '22233444555667', '23333444555667',
		'23344455566667', '23344455566777', '23344455566788', '23344455566799', '11344555666778',
		'22344555666778', '33344555666778', '34444555666778', '34455566677778', '34455566677888',
		'34455566677899', '11455666777889', '22455666777889', '33455666777889', '44455666777889',
		'45555666777889', '45566677788889', '45566677788999', '11123345567789', '12223345567789',
		'12333345567789', '12334445567789', '12334555567789', '12334556667789', '12334556777789',
		'12334556778889', '12334556778999'
	].join('|'), 'g')

	return (types[0][1].match(patterns)) ? FZ32 : 0
}

/**
 * ✅ 17. Three gangs (San gang, 三杠).
 * Exactly three gangs amounts to 17 tiles.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 32.
 */
export async function fz17SanGang(struct) {
	return (struct.tiles.length === 17) ? FZ32 : 0
}

/**
 * ✅ 18. Non-pure terminals (Hun yao jiu, 混幺九).
 * Kezi (gangzi) and a single duizi of ones and/or nines, and honors.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 32.
 */
export async function fz18HunYaoJiu(struct) {
	if (!struct.hasZi || struct.chiMelds.length) return 0

	const shuTypes = struct.shuTypes.map(item => item[1]).join('')

	return (/^[19][^2345678]+$/.test(shuTypes)) ? FZ32 : 0
}
