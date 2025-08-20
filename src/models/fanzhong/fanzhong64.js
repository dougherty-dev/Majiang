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

const FZ64 = 64

/**
 * 8. Pure terminals (Qing yao jiu, 清幺九).
 * Suited kezi of 1s and 9s only.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz8QingYaoJiu(struct) {
	if (struct.fengTypes.length || struct.jianTypes.length) return 0

	const types = struct.shuTypes.map(item => item[1]).join('')
	return (/^[19][^2345678]+$/.test(types)) ? FZ64 : 0
}

/**
 * 9. Little four winds (Xiao si xi, 小四喜).
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
 * 10. Little three dragons (Xiao san yuan, 小三元).
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
 * 11. All honors (Zi yi se, 字一色).
 * All melds are kezi/gangzi of winds and dragons.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz11ZiYiSe(struct) {
	return (struct.jianTypes.length + struct.fengTypes.length === struct.tiles.length) ? FZ64 : 0
}

/**
 * 12. Four concealed kezi (Si anke, 四暗刻).
 * All melds are concealed kezi/gangzi, either on hand or as melded angang.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 * PROBLEMATIC
 */
export async function fz12SiAnke(struct) {
	const melds = struct.game.players[struct.key].melds
	struct.chiMelds = melds.filter(item => item.type === 'chi')
	struct.pengMelds = melds.filter(item => item.type === 'peng')
	struct.gangMelds = melds.filter(item => item.type === 'gang')
	struct.angangMelds = melds.filter(item => item.type === 'angang')
	struct.nonchiMelds = melds.filter(item => item.type !== 'chi')

	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	struct.keziGangzi = [...kezi, ...gangzi]

	// kezi on dianhu (and qianggang) is open
	if (struct.game.players[struct.key].hu.dianhu) {
		const tile = struct.game.players[struct.game.currentPlayer].drop
		for (const ke of struct.keziGangzi) {
			if (ke[0] == tile[7] && ke[1][0] == tile[1]) return 0
		}
	}

	struct.concealedKezi =
		struct.keziGangzi.length - struct.gangMelds.length - struct.pengMelds.length

	return (struct.concealedKezi === 4) ? FZ64 : 0
}

/**
 * 13. Pure terminal shunzi (Yi se shuang long hui, 一色双龙会).
 * All melds in one suit, with two shunzi 123 and 789 each, and a pair 55.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz13YiSeShuangLongHui(struct) {
	const types = struct.shuTypes.filter(item => item[1] === '11223355778899')

	return (types.length && struct.tiles.length === 14) ? FZ64 : 0
}
