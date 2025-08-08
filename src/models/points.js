#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/points
 */

const EXTRAPOINTS = 8

import { TYPES } from '../components/hu/patterns.js'
import { ALLPLAYERS } from './constants.js'
import { fz69YibanGao, fz70XiXiangfeng, fz76WuZi, fz80Zimo, fz81Huapai } from './fanzhong/fanzhong1.js'
import { fz22QingYiSe } from './fanzhong/fanzhong24.js'
import { fz54ShuangJianke } from './fanzhong/fanzhong6.js'
import { fz1DaSiXi } from './fanzhong/fanzhong88.js'

export default class Points {
	constructor(game, key, door) {
		this.struct = {
			game: game,
			key: key,
			door: door
		}

		this.struct.types = Object.assign([], TYPES)

		for (const tile of this.struct.door) {
			this.struct.types[tile[7]] += tile[1]
		}

		this.points = 0
		this.fanzhong = {
			'1': ['大四喜', 'Da si xi', 'Big four winds', fz1DaSiXi, 0, ['38', '49', '60', '61', '73']],
			'22': ['清一色', 'Qing yi se', 'Full flush', fz22QingYiSe, 0, ['76']],
			'54': ['双箭刻', 'Shuang jianke', 'Two dragons kezi', fz54ShuangJianke, 0, ['59']],
			'69': ['一般高', 'Yiban gao', 'Pure double shunzi', fz69YibanGao, 0, []],
			'70': ['喜相逢', 'Xi xiangfeng', 'Mixed double shunzi', fz70XiXiangfeng, 0, []],
			'76': ['无字', 'Wuzi', 'No honors', fz76WuZi, 0, []],
			'80': ['自摸', 'Zimo', 'Self-drawn', fz80Zimo, 0, []],
			'81': ['花牌', 'Huapai', 'Flower tiles', fz81Huapai, 0, []],
		}
	}

	sumPoints(game, key) {
		const players = ALLPLAYERS.filter(item => item !== key)

		if (this.struct.game.winner) {
			for (const index of players) {
				game.players[key].points += EXTRAPOINTS
				game.players[index].points -= EXTRAPOINTS
			}

			if (this.fanzhong[80][4] > 0) {
				for (const index of players) {
					game.players[key].points += this.points
					game.players[index].points -= this.points
				}
			} else {
				game.players[key].points += this.points
				game.players[game.currentPlayer].points -= this.points
			}
		}
	}

	async fanPoints() {
		let exclude = []
		for await (const key of Object.keys(this.fanzhong)) {
			if (exclude.includes(key)) break

			const fz = this.fanzhong[key]
			const points = await fz[3](this.struct)

			if (points) {
				fz[4] = points
				this.points += points
				if (fz[5].length) {
					exclude = [...exclude, ...fz[5]]
				}
			}
		}
	}
}
