#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong64
 */

import { FENG, JIAN, SHU, ZI } from '../tiles.js'

const FZ64 = 64

// 8. Pure terminals (Qing yao jiu, 清幺九)
export async function fz8QingYaoJiu(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	const duizi = struct.game.players[struct.key].hu.duizi

	const melds = [...kezi, ...gangzi, ...duizi]
	const shu = melds.filter(item => SHU.includes(item[0]))
	const yaojiu = shu.filter(item => ['1', '9'].includes(item[1][0]))

	return (yaojiu.length === 5) ? FZ64 : 0
}

// 9. Little four winds (Xiao si xi, 小四喜)
export async function fz9XiaoSiXi(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	const duizi = struct.game.players[struct.key].hu.duizi

	const typesKezi = [...kezi.map(item => item[0]), ...gangzi.map(item => item[0])]
	const countKezi = typesKezi.filter(item => item === FENG).length

	const typesDuizi = duizi.map(item => item[0])
	const countDuizi = typesDuizi.filter(item => item === FENG).length

	return (countKezi === 3 && countDuizi === 1) ? FZ64 : 0
}

// 10. Little three dragons (Xiao san yuan, 小三元)
export async function fz10XiaoSanYuan(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	const duizi = struct.game.players[struct.key].hu.duizi

	const typesKezi = [...kezi.map(item => item[0]), ...gangzi.map(item => item[0])]
	const countKezi = typesKezi.filter(item => item === JIAN).length

	const typesDuizi = duizi.map(item => item[0])
	const countDuizi = typesDuizi.filter(item => item === JIAN).length

	return (countKezi === 2 && countDuizi === 1) ? FZ64 : 0
}

// 11. All honors (Zi yi se, 字一色)
export async function fz11ZiYiSe(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const zi = melds.filter(item => ZI.includes(item[0]))

	return (zi.length === 5) ? FZ64 : 0
}

// 12. Four concealed kezi (Si anke, 四暗刻)
export async function fz12SiAnke(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi
	const kegang = [...kezi, ...gangzi]

	const melds = struct.game.players[struct.key].melds
	const gang = melds.filter(item => item.type === 'gang')
	const peng = melds.filter(item => item.type === 'peng')

	// kezi on dianhu (and qianggang) is open
	if (struct.game.players[struct.key].hu.dianhu) {
		const tile = struct.game.players[struct.game.currentPlayer].drop
		for (const ke of kegang) {
			if (ke[0] == tile[7] && ke[1][0] == tile[1]) return 0
		}
	}

	// Save result for:
	// 33. Three concealed kezi (San anke, 三暗刻)
	// 66. Two concealed kezi (Shuang anke, 双暗刻)
	struct.concealedKezi = kegang.length - gang.length - peng.length

	return (struct.concealedKezi === 4) ? FZ64 : 0
}

// 13. Pure terminal shunzi (Yi se shuang long hui, 一色双龙会)
export async function fz13YiSeShuangLongHui(struct) {
	const pattern = '11223355778899'
	const types = Object.values(struct.types)
	struct.game.players[struct.key].hu.pairs = 1
	struct.game.players[struct.key].hu.melds = 4

	return (types.includes(pattern)) ? FZ64 : 0
}
