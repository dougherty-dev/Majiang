#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong8
 */

const FZ8 = 8

// 48. Two concealed gangzi (Shuang angang, 双暗杠)
export async function fz48ShuangAngang(struct) {
	const melds = struct.game.players[struct.key].melds
	const angang = melds.filter(item => item.type === 'angang')

	return (angang.length === 2) ? FZ8 : 0
}
