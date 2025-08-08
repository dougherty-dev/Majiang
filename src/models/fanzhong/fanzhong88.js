#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong88
 */

const FZ64 = 64

// Big four winds (Da si xi, 大四喜)
export async function fz1DaSiXi(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi

	if (kezi.length === 4 && kezi.every((type) => type[0] === 'f')) {
		return FZ64
	}

	return 0
}
