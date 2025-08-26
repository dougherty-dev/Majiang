#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong48
 * @description 48 番 (fan) scoring rules.
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

	const types = struct.shuTypes14.filter(item => item[1].match(pattern))

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

	const pattern = new RegExp([
		'111222333444', '222333444555', '333444555666',
		'444555666777', '555666777888', '666777888999'
	].join('|'), 'g')

	const types = struct.shuTypes14.filter(item => item[1].match(pattern))

	return (types.length) ? FZ48 : 0
}
