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
import { fz55QuanDaiYao, fz56BuQiuRen, fz57ShuangMinggang, fz58HuJuezhang } from './fanzhong/fanzhong4.js'
import { fz49PengpengHu, fz50HunYiSe, fz51SanSeSanBuGao, fz52WuMenJi, fz53QuanQiuRen, fz54ShuangJianke } from './fanzhong/fanzhong6.js'
import { fz1DaSiXi, fz2DaSanYuan, fz3LyYise, fz4JiuLianBaodeng, fz5SiGang, fz6LianQiDui, fz7ShisanYao } from './fanzhong/fanzhong88.js'

export default class Points {
	constructor(game, key, tiles) {
		this.struct = {
			game: game,
			key: key,
			tiles: tiles
		}

		this.struct.types = Object.assign([], TYPES)

		for (const tile of this.struct.tiles) {
			this.struct.types[tile[7]] += tile[1]
		}

		const hu = this.struct.game.players[this.struct.key].hu
		hu.values = Object.values(this.struct.types).filter(item => item !== '')

		hu.allMelds = Object.assign([], [
			...hu.duizi,
			...hu.shunzi,
			...hu.kezi,
			...hu.gangzi
		])

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
			'49': ['碰碰和', 'Pengpeng hu', 'All kezi', fz49PengpengHu, 0, []],
			'50': ['混一色', 'Hun yi se', 'Half flush', fz50HunYiSe, 0, []],
			'51': ['三色三步高', 'San se san bu gao', 'Mixed shifted shunzi', fz51SanSeSanBuGao, 0, []],
			'52': ['五门齐', 'Wu men ji', 'All types', fz52WuMenJi, 0, []],
			'53': ['全求人', 'Quan qiu ren', 'Melded hand', fz53QuanQiuRen, 0, []],
			'54': ['双箭刻', 'Shuang jianke', 'Two dragons kezi', fz54ShuangJianke, 0, ['59']],
			// 4 fan
			'55': ['全带幺', 'Quan dai yao', 'Outside hand', fz55QuanDaiYao, 0, []],
			'56': ['不求人', 'Bu qiu ren', 'Fully concealed hand', fz56BuQiuRen, 0, []],
			'57': ['双明杠', 'Shuang minggang', 'Two melded gangs', fz57ShuangMinggang, 0, []],
			'58': ['和绝张', 'Hu juezhang', 'Last tile', fz58HuJuezhang, 0, []],
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
