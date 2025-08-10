#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/points
 */

const EXTRAPOINTS = 8

import { TYPES } from '../components/hu/patterns.js'
import { ALLPLAYERS } from './constants.js'
import { fz69YibanGao, fz70XiXiangfeng, fz74Minggang, fz76WuZi, fz80Zimo, fz81Huapai } from './fanzhong/fanzhong1.js'
import { fz30YiSeSanBuGao } from './fanzhong/fanzhong16.js'
import { fz63Pinghu, fz68Duanyao } from './fanzhong/fanzhong2.js'
import { fz22QingYiSe } from './fanzhong/fanzhong24.js'
import { fz17SanGang } from './fanzhong/fanzhong32.js'
import { fz54ShuangJianke } from './fanzhong/fanzhong6.js'
import { fz1DaSiXi, fz2DaSanYuan, fz3LyYise, fz4JiuLianBaodeng, fz5SiGang, fz6LianQiDui, fz7ShisanYao } from './fanzhong/fanzhong88.js'

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
			// 88 fan
			'1': ['大四喜', 'Da si xi', 'Big four winds', fz1DaSiXi, 0, ['38', '49', '60', '61', '73']],
			'2': ['大三元', 'Da san yuan', 'Big three dragons', fz2DaSanYuan, 0, ['54', '59']],
			'3': ['绿一色', 'Lü yise', 'All green', fz3LyYise, 0, []],
			'4': ['九莲宝灯', 'Jiu lian baodeng', 'Nine gates', fz4JiuLianBaodeng, 0, ['22', '73']],
			'5': ['四杠', 'Si gang', 'Four gangs', fz5SiGang, 0, ['17', '48', '57', '67', '74', '79']],
			'6': ['连七对', 'Lian qi dui', 'Seven shifted pairs', fz6LianQiDui, 0, ['22', '79']],
			'7': ['十三幺', 'Shisan yao', 'Thirteen orphans', fz7ShisanYao, 0, ['52', '79']],
			// 32 fan
			'17': ['三杠', 'San gang', 'Three gangs', fz17SanGang, 0, ['48', '57', '67', '74', '76']],
			// 24 fan
			'22': ['清一色', 'Qing yi se', 'Full flush', fz22QingYiSe, 0, ['76']],
			// 16 fan
			'30': ['一色三步高', 'Yi se san bu gao', 'Pure shifted shunzi', fz30YiSeSanBuGao, 0, []],
			// 6 fan
			'54': ['双箭刻', 'Shuang jianke', 'Two dragons kezi', fz54ShuangJianke, 0, ['59']],
			// 2 fan
			'63': ['平和', 'Pinghu', 'All shunzi', fz63Pinghu, 0, []],
			'68': ['断幺', 'Duanyao', 'All simples', fz68Duanyao, 0, []],
			// 1 fan
			'69': ['一般高', 'Yiban gao', 'Pure double shunzi', fz69YibanGao, 0, []],
			'70': ['喜相逢', 'Xi xiangfeng', 'Mixed double shunzi', fz70XiXiangfeng, 0, []],
			'74': ['明杠', 'Minggang', 'Melded gang', fz74Minggang, 0, []],
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
			if (exclude.includes(key)) continue

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
