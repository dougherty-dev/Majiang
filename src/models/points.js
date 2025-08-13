#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/points
 */

const EXTRAPOINTS = 8

import { TYPES } from '../components/hu/patterns.js'
import { ALLPLAYERS } from './constants.js'
import { fz69YibanGao, fz70XiXiangfeng, fz71LianLiu, fz72LaoshaoFu, fz73YaoJiuKe, fz74Minggang, fz75QueYiMen, fz76WuZi, fz80Zimo, fz81Huapai } from './fanzhong/fanzhong1.js'
import { fz30YiSeSanBuGao, fz31QuanDaiWu, fz32SanTongKe, fz33SanAnke } from './fanzhong/fanzhong16.js'
import { fz59Jianke, fz60Quanfengke, fz61Menfengke, fz62MenqianQing, fz63Pinghu, fz64SiGuiYi, fz65ShuangTongke, fz66ShuangAnke, fz67Angang, fz68Duanyao } from './fanzhong/fanzhong2.js'
import { fz22QingYiSe } from './fanzhong/fanzhong24.js'
import { fz17SanGang } from './fanzhong/fanzhong32.js'
import { fz55QuanDaiYao, fz56BuQiuRen, fz57ShuangMinggang, fz58HuJuezhang } from './fanzhong/fanzhong4.js'
import { fz49PengpengHu, fz50HunYiSe, fz51SanSeSanBuGao, fz52WuMenJi, fz53QuanQiuRen, fz54ShuangJianke } from './fanzhong/fanzhong6.js'
import { fz11ZiYiSe, fz12SiAnke } from './fanzhong/fanzhong64.js'
import { fz39Hualong, fz43WuFanHu, fz48ShuangAngang } from './fanzhong/fanzhong8.js'
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
			// 64 fan
			'11': ['字一色', 'Zi yi se', 'All honors', fz11ZiYiSe, 0, ['49', '55', '73']],
			'12': ['四暗刻', 'Si anke', 'Four concealed kezi', fz12SiAnke, 0, ['49']],
			// 32 fan
			'17': ['三杠', 'San gang', 'Three gangs', fz17SanGang, 0, ['48', '57', '67', '74', '76']],
			// 24 fan
			'22': ['清一色', 'Qing yi se', 'Full flush', fz22QingYiSe, 0, ['76']],
			// 16 fan
			'30': ['一色三步高', 'Yi se san bu gao', 'Pure shifted shunzi', fz30YiSeSanBuGao, 0, []],
			'31': ['全带五', 'Quan dai wu', 'All fives', fz31QuanDaiWu, 0, []],
			'32': ['三同刻', 'San tong ke', 'Triple kezi', fz32SanTongKe, 0, []],
			'33': ['三暗刻', 'San anke', 'Three concealed kezi', fz33SanAnke, 0, []],
			// 8 fan
			'39': ['花龙', 'Hualong', 'Mixed straight', fz39Hualong, 0, []],
			'43': ['无番和', 'Wu fan hu', 'Chicken hand', fz43WuFanHu, 0, []],
			'48': ['双暗杠', 'Shuang angang', 'Two concealed gangzi', fz48ShuangAngang, 0, []],
			// 6 fan
			'49': ['碰碰和', 'Pengpeng hu', 'All kezi', fz49PengpengHu, 0, []],
			'50': ['混一色', 'Hun yi se', 'Half flush', fz50HunYiSe, 0, []],
			'51': ['三色三步高', 'San se san bu gao', 'Mixed shifted shunzi', fz51SanSeSanBuGao, 0, []],
			'52': ['五门齐', 'Wu men ji', 'All types', fz52WuMenJi, 0, []],
			'53': ['全求人', 'Quan qiu ren', 'Melded hand', fz53QuanQiuRen, 0, ['79']],
			'54': ['双箭刻', 'Shuang jianke', 'Two dragons kezi', fz54ShuangJianke, 0, ['59']],
			// 4 fan
			'55': ['全带幺', 'Quan dai yao', 'Outside hand', fz55QuanDaiYao, 0, []],
			'56': ['不求人', 'Bu qiu ren', 'Fully concealed hand', fz56BuQiuRen, 0, []],
			'57': ['双明杠', 'Shuang minggang', 'Two melded gangs', fz57ShuangMinggang, 0, []],
			'58': ['和绝张', 'Hu juezhang', 'Last tile', fz58HuJuezhang, 0, []],
			// 2 fan
			'59': ['箭刻', 'Jianke', 'Dragon kezi', fz59Jianke, 0, []],
			'60': ['圈风刻', 'Quanfengke', 'Prevalent wind', fz60Quanfengke, 0, []],
			'61': ['门风刻', 'Menfengke', 'Seat wind', fz61Menfengke, 0, []],
			'62': ['门前清', 'Menqian qing', 'Concealed hand', fz62MenqianQing, 0, []],
			'63': ['平和', 'Pinghu', 'All shunzi', fz63Pinghu, 0, ['76']],
			'64': ['四归一', 'Si gui yi', 'Tile hog', fz64SiGuiYi, 0, []],
			'65': ['双同刻', 'Shuang tongke', 'Double kezi', fz65ShuangTongke, 0, []],
			'66': ['双暗刻', 'Shuang anke', 'Two concealed kezi', fz66ShuangAnke, 0, []],
			'67': ['暗杠', 'Angang', 'Concealed gang', fz67Angang, 0, []],
			'68': ['断幺', 'Duanyao', 'All simples', fz68Duanyao, 0, []],
			// 1 fan
			'69': ['一般高', 'Yiban gao', 'Pure double shunzi', fz69YibanGao, 0, []],
			'70': ['喜相逢', 'Xi xiangfeng', 'Mixed double shunzi', fz70XiXiangfeng, 0, []],
			'71': ['连六', 'Lian liu', 'Short straight', fz71LianLiu, 0, []],
			'72': ['老少副', 'Laoshao fu', 'Two terminal shunzi', fz72LaoshaoFu, 0, []],
			'73': ['幺九刻', 'Yao jiu ke', 'Terminal kezi', fz73YaoJiuKe, 0, []],
			'74': ['明杠', 'Minggang', 'Melded gang', fz74Minggang, 0, []],
			'75': ['缺一门', 'Que yi men', 'One voided suit', fz75QueYiMen, 0, []],
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
			if (key === '43' || exclude.includes(key)) continue
			await this.applyRule(key, exclude)
		}

		// 43. Chicken hand (Wu fan hu, 无番和)
		if (this.points === 0) await this.applyRule('43', exclude)
	}

	async applyRule(key, exclude) {
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
