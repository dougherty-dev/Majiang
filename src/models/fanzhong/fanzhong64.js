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

import { FENG, JIAN, SHU, ZI } from '../tiles.js'

const FZ64 = 64

// 
/**
 * 8. Pure terminals (Qing yao jiu, 清幺九)
 * Suited tiles of 1s and 9s only.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz8QingYaoJiu(struct) {
	const allMelds = struct.game.players[struct.key].hu.allMelds
	struct.shuMelds = allMelds.filter(item => SHU.includes(item[0]))
	struct.yaojiu = struct.shuMelds.filter(item => ['11', '99', '111', '999', '1111', '9999'].includes(item[1]))

	return (struct.yaojiu.length === 5) ? FZ64 : 0
}

/**
 * 9. Little four winds (Xiao si xi, 小四喜)
 * Three kezi/gangzi and a pair with winds, and an arbitrary shunzi/kezi/gangzi.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 * struct.fengKezi defined in: 1. Big four winds (Da si xi, 大四喜)
 */
export async function fz9XiaoSiXi(struct) {
	const duizi = struct.game.players[struct.key].hu.duizi
	const fengDuizi = duizi.filter(item => item[0] === FENG)

	return (struct.fengKezi.length === 3 && fengDuizi.length === 1) ? FZ64 : 0
}

/**
 * 10. Little three dragons (Xiao san yuan, 小三元)
 * Two kezi/gangzi and a pair with dragons, and an additional arbitrary kezi/shunzi.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 * struct.jianKezi defined in: 2. Big three dragons (Da san yuan, 大三元)
 */
export async function fz10XiaoSanYuan(struct) {
	const duizi = struct.game.players[struct.key].hu.duizi
	const jianDuizi = duizi.filter(item => item[0] === JIAN)

	return (struct.jianKezi.length === 2 && jianDuizi.length === 1) ? FZ64 : 0
}

/**
 * 11. All honors (Zi yi se, 字一色)
 * All melds are kezi/gangzi of winds and dragons.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz11ZiYiSe(struct) {
	const allMelds = struct.game.players[struct.key].hu.allMelds
	struct.ziMelds = allMelds.filter(item => ZI.includes(item[0]))

	return (struct.ziMelds.length === 5) ? FZ64 : 0
}

/**
 * 12. Four concealed kezi (Si anke, 四暗刻)
 * All melds are concealed kezi/gangzi, either on hand or as melded angang.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 * struct.keziGangzi defined in: 1. Big four winds (Da si xi, 大四喜)
 */
export async function fz12SiAnke(struct) {
	const melds = struct.game.players[struct.key].melds
	const gangMelds = melds.filter(item => item.type === 'gang')
	const pengMelds = melds.filter(item => item.type === 'peng')

	// kezi on dianhu (and qianggang) is open
	if (struct.game.players[struct.key].hu.dianhu) {
		const tile = struct.game.players[struct.game.currentPlayer].drop
		for (const ke of struct.keziGangzi) {
			if (ke[0] == tile[7] && ke[1][0] == tile[1]) return 0
		}
	}

	struct.concealedKezi = struct.keziGangzi.length - gangMelds.length - pengMelds.length

	return (struct.concealedKezi === 4) ? FZ64 : 0
}

/**
 * 13. Pure terminal shunzi (Yi se shuang long hui, 一色双龙会)
 * All melds in one suit, with two shunzi 123 and 789 each, and a pair 55.
 * @param {Object} struct Game parameters.
 * @returns {Number} 0 or 64.
 */
export async function fz13YiSeShuangLongHui(struct) {
	const pattern = '11223355778899'
	const types = Object.values(struct.types).map(item => item.split('').sort().join(''))

	return (types.includes(pattern)) ? FZ64 : 0
}
