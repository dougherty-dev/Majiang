#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong32
 * @property {Function} fz14YiSeSiTongshun 14. Quadruple shunzi (Yi se si tongshun, 一色四同顺).
 * @property {Function} fz15YiSeSiJieGao 15. Four pure shifted kezi (Yi se si jie gao, 一色四节高).
 */

const FZ48 = 48

/**
 * ✅ 14. Quadruple shunzi (Yi se si tongshun, 一色四同顺).
 * Four identical shunzi, in the same suit, with the same values.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 48.
 */
export async function fz14YiSeSiTongshun(struct) {
	if (struct.nonchiMelds.length) return 0

	const pattern = new RegExp([
		'111122223333', '222233334444', '333344445555', '444455556666',
		'555566667777', '666677778888', '777788889999'
	].join('|'), 'g')

	const types = struct.shuTypes.filter(item => item[1].match(pattern))

	return (types.length) ? FZ48 : 0
}

/**
 * ✅ 15. Four pure shifted kezi (Yi se si jie gao, 一色四节高).
 * Four kezi in the same suit, shifted up one in value for each kezi.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 48.
 */
export async function fz15YiSeSiJieGao(struct) {
	if (struct.chiMelds.length) return 0

	const types = struct.shuTypes.filter(item => item[1].length >= 12)
	if (!types.length) return 0

	const pattern = new RegExp([
		'1{3,4}2{3,4}3{3,4}4{3,4}',
		'2{3,4}3{3,4}4{3,4}5{3,4}',
		'3{3,4}4{3,4}5{3,4}6{3,4}',
		'4{3,4}5{3,4}6{3,4}7{3,4}',
		'5{3,4}6{3,4}7{3,4}8{3,4}',
		'6{3,4}7{3,4}8{3,4}9{3,4}'
	].join('|'), 'g')

	return (types[0][1].match(pattern)) ? FZ48 : 0
}
