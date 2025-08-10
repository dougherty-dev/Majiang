#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong32
 */

const FZ32 = 32

// 17. Three gangs (San gang, 三杠)
export async function fz17SanGang(struct) {
	return (struct.game.players[struct.key].hu.gangzi.length === 3) ? FZ32 : 0
}
