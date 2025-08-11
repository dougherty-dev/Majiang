#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong6
 */

import { SHIFTEDAX3, SHUNZI } from '../../components/hu/patterns.js'
import { JIAN, SHU } from '../tiles.js'

const FZ6 = 6

// 49. All kezi (Pengpeng hu, 碰碰和)
export async function fz49PengpengHu(struct) {
	const hu = struct.game.players[struct.key].hu
	if (hu.kezi.length + hu.gangzi.length === 4) return FZ6

	return 0
}

// 50. Half flush (Hun yi se, 混一色)
export async function fz50HunYiSe(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const types = [...new Set(melds.map(item => item[0]))].sort().join('')

	if (['bf', 'bj', 'bfj', 'ft', 'jt', 'fjt', 'fw', 'jw', 'fjw'].includes(types)) {
		return FZ6
	}

	return 0
}

// 51. Mixed shifted shunzi (San se san bu gao, 三色三步高)
export async function fz51SanSeSanBuGao(struct) {
	const allMelds = struct.game.players[struct.key].hu.allMelds

	// extract suited shunzi
	const melds = allMelds.filter(
		item => item[1].length === 3 &&
		SHU.includes(item[0]) &&
		item[1].match(SHUNZI)
	)

	// suited shunzi must be at least 3
	if (melds.length < 3) return 0

	// ensure all three types b, t, w are present
	const types = [...new Set(melds.map(item => item[0]))].sort().join('')
	if (types !== 'btw') return 0

	// sort melds by shunzi value
	melds.sort((a, b) => a[1].localeCompare(b[1]))

	// make pattern and sort
	let pattern = `${melds[0][1]}${melds[1][1]}${melds[2][1]}`
	pattern = [...pattern].sort().join('')

	// compare with predefined pattern for shifted shunzi
	if (pattern.match(SHIFTEDAX3)) return FZ6

	if (melds.length > 3) {
		pattern = `${melds[1][1]}${melds[2][1]}${melds[3][1]}`
		pattern = [...pattern].sort().join('')
		if (pattern.match(SHIFTEDAX3)) return FZ6
	}

	return 0
}

// 52. All types (Wu men ji, 五门齐)
export async function fz52WuMenJi(struct) {
	const melds = struct.game.players[struct.key].hu.allMelds
	const types = [...new Set(melds.map(item => item[0]))].sort().join('')

	return (types === 'bfjtw') ? FZ6 : 0
}

// 53. Melded hand (Quan qiu ren, 全求人)
export async function fz53QuanQiuRen(struct) {
	const melds = struct.game.players[struct.key].melds.length

	return (melds === 4 && struct.game.players[struct.key].hu.dianhu) ? FZ6 : 0
}

// 54. Two dragons kezi (Shuang jianke, 双箭刻)
export async function fz54ShuangJianke(struct) {
	const kezi = struct.game.players[struct.key].hu.kezi
	const gangzi = struct.game.players[struct.key].hu.gangzi

	const types = [...kezi.map(item => item[0]), ...gangzi.map(item => item[0])]
	const count = types.filter(item => item === JIAN).length

	if (count === 2) return FZ6

	return 0
}
