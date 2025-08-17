#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong32
 */

const FZ32 = 32

// 16. Four shifted shunzi (Yi se si bu gao, 一色四步高)
export async function fz16YiSeSiBuGao(struct) {
	const shifted1 = /(122333444556|233444555667|344555666778|455666777889)/g
	const shifted2 = /(123345567789)/g
	const reduced = Object.values(struct.meldTypes).filter(item => item.length === 12)

	if (reduced.length) {
		const sorted = reduced[0].split('').sort().join('')
		return (sorted.match(shifted1) || sorted.match(shifted2)) ? FZ32 : 0
	}

	return 0
}

// 17. Three gangs (San gang, 三杠)
export async function fz17SanGang(struct) {
	return (struct.game.players[struct.key].hu.gangzi.length === 3) ? FZ32 : 0
}

// 18. Non-pure terminals (Hun yao jiu, 混幺九)
// From : 8. Pure terminals (Qing yao jiu, 清幺九)
// From : 11. All honors (Zi yi se, 字一色)
export async function fz18HunYaoJiu(struct) {
	return (
		struct.ziMelds.length &&
		struct.yaojiu.length &&
		struct.yaojiu.length + struct.ziMelds.length === 5
	) ? FZ32 : 0
}
