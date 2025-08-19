#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @class models/points
 */

const EXTRAPOINTS = 8

import { TYPES } from '../components/hu/patterns.js'
import { ALLPLAYERS } from './constants.js'
import { fz69YibanGao, fz70XiXiangfeng, fz71LianLiu, fz72LaoshaoFu, fz73YaoJiuKe, fz74Minggang, fz75QueYiMen, fz76WuZi, fz77Bianzhang, fz78Kanzhang, fz79DandiaoJiang, fz80Zimo, fz81Huapai } from './fanzhong/fanzhong1.js'
import { fz34QuanBuKao, fz35ZuheLong, fz36DaYuWu, fz37XiaoYuWu, fz38SanFengKe } from './fanzhong/fanzhong12.js'
import { fz28QingLong, fz29SanSeShuangLongHui, fz30YiSeSanBuGao, fz31QuanDaiWu, fz32SanTongke, fz33SanAnke } from './fanzhong/fanzhong16.js'
import { fz59Jianke, fz60Quanfengke, fz61Menfengke, fz62MenqianQing, fz63Pinghu, fz64SiGuiYi, fz65ShuangTongke, fz66ShuangAnke, fz67Angang, fz68Duanyao } from './fanzhong/fanzhong2.js'
import { fz19QiDui, fz20QiXingBuKao, fz21QuanShuangKe, fz22QingYiSe, fz23YiSeSanTongshun, fz24YiSeSanJieGao, fz25QuanDa, fz26QuanZhong, fz27QuanXiao } from './fanzhong/fanzhong24.js'
import { fz16YiSeSiBuGao, fz17SanGang, fz18HunYaoJiu } from './fanzhong/fanzhong32.js'
import { fz55QuanDaiYao, fz56BuQiuRen, fz57ShuangMinggang, fz58HuJuezhang } from './fanzhong/fanzhong4.js'
import { fz14YiSeSiTongshun, fz15YiSeSiJieGao } from './fanzhong/fanzhong48.js'
import { fz49PengpengHu, fz50HunYiSe, fz51SanSeSanBuGao, fz52WuMenJi, fz53QuanQiuRen, fz54ShuangJianke } from './fanzhong/fanzhong6.js'
import { fz10XiaoSanYuan, fz11ZiYiSe, fz12SiAnke, fz13YiSeShuangLongHui, fz8QingYaoJiu, fz9XiaoSiXi } from './fanzhong/fanzhong64.js'
import { fz39Hualong, fz40Tuibudao, fz41SanSeSanTongshun, fz42SanSeSanJieGao, fz43WuFanHu, fz44MiaoshouHuichun, fz45HaidiLaoyue, fz46GangshangKaihua, fz47Qiangganghu, fz48ShuangAngang } from './fanzhong/fanzhong8.js'
import { fz1DaSiXi, fz2DaSanYuan, fz3LyYise, fz4JiuLianBaodeng, fz5SiGang, fz6LianQiDui, fz7ShisanYao } from './fanzhong/fanzhong88.js'

/**
 * The Points class. Calculate points according to the 81 standard rules.
 */
export default class Points {
	constructor(game, key, tiles) {
		this.struct = {
			game: game,
			key: key,
			tiles: tiles
		}

		this.struct.types = Object.assign({}, TYPES)

		for (const tile of this.struct.tiles) {
			this.struct.types[tile[7]] += tile[1]
		}

		for (let [key, type] of Object.entries(this.struct.types)) {
			if (type) {
				type = type.split('').sort().join('')
				this.struct.types[key] = type
			}
		}

		const hu = this.struct.game.players[this.struct.key].hu
		hu.values = Object.values(this.struct.types).filter(item => item !== '')

		hu.allMelds = Object.assign([], [
			...hu.duizi,
			...hu.shunzi,
			...hu.kezi,
			...hu.gangzi
		])

		this.exclude = []
		this.points = 0
		this.exit = 0

		// ['fanzhong name', 'pinyin', 'English', function, points, [rule exclusion list]]
		this.fanzhong = {
			// 88 fan
			'1': ['大四喜', 'Da si xi', 'Big four winds', fz1DaSiXi, 0, ['9', '38', '49', '60', '61', '73']],
			'2': ['大三元', 'Da san yuan', 'Big three dragons', fz2DaSanYuan, 0, ['10', '54', '59']],
			'3': ['绿一色', 'Lü yise', 'All green', fz3LyYise, 0, ['50']],
			'4': ['九莲宝灯', 'Jiu lian baodeng', 'Nine gates', fz4JiuLianBaodeng, 0, ['22', '62', '73']],
			'5': ['四杠', 'Si gang', 'Four gangs', fz5SiGang, 0, ['17', '49', '57', '74', '79']],
			'6': ['连七对', 'Lian qi dui', 'Seven shifted pairs', fz6LianQiDui, 0, ['19', '22', '63', '79']],
			'7': ['十三幺', 'Shisan yao', 'Thirteen orphans', fz7ShisanYao, 0, ['52', '56', '62', '79']],
			// 64 fan
			'8': ['清幺九', 'Qing yao jiu', 'Pure terminals', fz8QingYaoJiu, 0, ['18', '32', '49', '55', '65', '73', '76']],
			'9': ['小四喜', 'Xiao si xi', 'Little four winds', fz9XiaoSiXi, 0, ['38', '73']],
			'10': ['小三元', 'Xiao san yuan', 'Little three dragons', fz10XiaoSanYuan, 0, ['54', '59', '75']],
			'11': ['字一色', 'Zi yi se', 'All honors', fz11ZiYiSe, 0, ['49', '55', '73']],
			'12': ['四暗刻', 'Si anke', 'Four concealed kezi', fz12SiAnke, 0, ['49', '56', '62']],
			'13': ['一色双龙会', 'Yi se shuang long hui', 'Pure terminal shunzi', fz13YiSeShuangLongHui, 0, ['19', '22', '63', '69', '72', '76']],
			// 48 fan
			'14': ['一色四同顺', 'Yi se si tongshun', 'Quadruple shunzi', fz14YiSeSiTongshun, 0, ['24', '64', '69']],
			'15': ['一色四节高', 'Yi se si jie gao', 'Four pure shifted kezi', fz15YiSeSiJieGao, 0, ['23', '49']],
			// 32 fan
			'16': ['一色四步高', 'Yi se si bu gao', 'Four shifted shunzi', fz16YiSeSiBuGao, 0, ['71', '72']],
			'17': ['三杠', 'San gang', 'Three gangs', fz17SanGang, 0, ['57', '74', '76']],
			'18': ['混幺九', 'Hun yao jiu', 'Non-pure terminals', fz18HunYaoJiu, 0, ['49', '55', '73']],
			// 24 fan
			'19': ['七对', 'Qi dui', 'Seven pairs', fz19QiDui, 0, ['79']],
			'20': ['七星不靠', 'Qi xing bu kao', 'Greater honors and knitted tiles', fz20QiXingBuKao, 0, ['52']],
			'21': ['全双刻', 'Quan shuang ke', 'All even kezi', fz21QuanShuangKe, 0, ['49', '68']],
			'22': ['清一色', 'Qing yi se', 'Full flush', fz22QingYiSe, 0, ['76']],
			'23': ['一色三同顺', 'Yi se san tongshun', 'Pure triple shunzi', fz23YiSeSanTongshun, 0, ['24', '69']],
			'24': ['一色三节高', 'Yi se san jie gao', 'Pure shifted kezi', fz24YiSeSanJieGao, 0, ['23']],
			'25': ['全大', 'Quan da', 'Upper tiles', fz25QuanDa, 0, ['36', '76']],
			'26': ['全中', 'Quan zhong', 'Middle tiles', fz26QuanZhong, 0, ['68']],
			'27': ['全小', 'Quan xiao', 'Lower tiles', fz27QuanXiao, 0, ['37', '76']],
			// 16 fan
			'28': ['清龙', 'Qing long', 'Pure straight', fz28QingLong, 0, ['71', '72']],
			'29': ['三色双龙会', 'San se shuang long hui', 'Three-suited terminal shunzi', fz29SanSeShuangLongHui, 0, ['63', '70', '72', '76']],
			'30': ['一色三步高', 'Yi se san bu gao', 'Pure shifted shunzi', fz30YiSeSanBuGao, 0, []],
			'31': ['全带五', 'Quan dai wu', 'All fives', fz31QuanDaiWu, 0, ['68']],
			'32': ['三同刻', 'San tongke', 'Triple kezi', fz32SanTongke, 0, []],
			'33': ['三暗刻', 'San anke', 'Three concealed kezi', fz33SanAnke, 0, []],
			// 12 fan
			'34': ['全不靠', 'Quan bu kao', 'Lesser honors and knitted tiles', fz34QuanBuKao, 0, ['52']],
			'35': ['组合龙', 'Zuhe long', 'Knitted straight', fz35ZuheLong, 0, []],
			'36': ['大于五', 'Da yu wu', 'Upper four', fz36DaYuWu, 0, ['76']],
			'37': ['小于五', 'Xiao yu wu', 'Lower four', fz37XiaoYuWu, 0, ['76']],
			'38': ['三风刻', 'San feng ke', 'Big three winds', fz38SanFengKe, 0, []],
			// 8 fan
			'39': ['花龙', 'Hualong', 'Mixed straight', fz39Hualong, 0, []],
			'40': ['推不倒', 'Tuibudao', 'Reversible tiles', fz40Tuibudao, 0, ['75']],
			'41': ['三色三同顺', 'San se san tongshun', 'Mixed triple shunzi', fz41SanSeSanTongshun, 0, ['70']],
			'42': ['三色三节高', 'San se san jie gao', 'Mixed shifted kezi', fz42SanSeSanJieGao, 0, []],
			'43': ['无番和', 'Wu fan hu', 'Chicken hand', fz43WuFanHu, 0, []],
			'44': ['妙手回春', 'Miaoshou-huichun', 'Last tile draw', fz44MiaoshouHuichun, 0, ['80']],
			'45': ['海底捞月', 'Haidi-laoyue', 'Last tile claim', fz45HaidiLaoyue, 0, []],
			'46': ['杠上开花', 'Gangshang kaihua', 'Out with replacement tile', fz46GangshangKaihua, 0, ['80']],
			'47': ['抢杠和', 'Qiangganghu', 'Robbing the gang', fz47Qiangganghu, 0, ['58']],
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
			'57': ['双明杠', 'Shuang minggang', 'Two melded gangs', fz57ShuangMinggang, 0, ['67', '74']],
			'58': ['和绝张', 'Hu juezhang', 'Last of its kind', fz58HuJuezhang, 0, []],
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
			'77': ['边张', 'Bianzhang', 'Edge wait', fz77Bianzhang, 0, ['78', '79']],
			'78': ['坎张', 'Kanzhang', 'Closed wait', fz78Kanzhang, 0, ['79']],
			'79': ['单调将', 'Dandiao jiang', 'Single wait', fz79DandiaoJiang, 0, []],
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
		for await (const key of Object.keys(this.fanzhong)) {
			if (key === '43' || key === '81' || this.exclude.includes(key)) continue
			await this.applyRule(key)
		}

		// 43. Chicken hand (Wu fan hu, 无番和)
		if (this.points === 0) await this.applyRule('43')

		this.exit = this.points
		// 81. Flower tiles (Huapai, 花牌)
		await this.applyRule('81')
	}

	async applyRule(key) {
		const fz = this.fanzhong[key]
		const points = await fz[3](this.struct)

		if (points) {
			fz[4] = points
			this.points += points
			if (fz[5].length) {
				this.exclude = [...this.exclude, ...fz[5]]
			}
		}
	}
}
