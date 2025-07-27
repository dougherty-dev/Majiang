#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module tiles
 */

export const ALLPLAYERS = [1, 2, 3, 4]
export const AIPLAYERS = [1, 2, 3]

function quadruple(set, start) {
	let newSet = []
	for (const [key, item] of Object.entries(set)) {
		for (const index of ALLPLAYERS) {
			newSet.push([start + 4 * key + index, ...item])
		}
	}

	return newSet
}

export const BINGZI = quadruple([
	[1, 'bing1', 'bingzi 1', '饼子一', '🀙', 'shuzipai-bingzi-1'],
	[2, 'bing2', 'bingzi 2', '饼子二', '🀚', 'shuzipai-bingzi-2'],
	[3, 'bing3', 'bingzi 3', '饼子三', '🀛', 'shuzipai-bingzi-3'],
	[4, 'bing4', 'bingzi 4', '饼子四', '🀜', 'shuzipai-bingzi-4'],
	[5, 'bing5', 'bingzi 5', '饼子五', '🀝', 'shuzipai-bingzi-5'],
	[6, 'bing6', 'bingzi 6', '饼子六', '🀞', 'shuzipai-bingzi-6'],
	[7, 'bing7', 'bingzi 7', '饼子七', '🀟', 'shuzipai-bingzi-7'],
	[8, 'bing8', 'bingzi 8', '饼子八', '🀠', 'shuzipai-bingzi-8'],
	[9, 'bing9', 'bingzi 9', '饼子九', '🀡', 'shuzipai-bingzi-9']
], 0)

export const TIAOZI = quadruple([
	[1, 'tiao1', 'tiaozi 1', '条子一', '🀐', 'shuzipai-tiaozi-1'],
	[2, 'tiao2', 'tiaozi 2', '条子二', '🀑', 'shuzipai-tiaozi-2'],
	[3, 'tiao3', 'tiaozi 3', '条子三', '🀒', 'shuzipai-tiaozi-3'],
	[4, 'tiao4', 'tiaozi 4', '条子四', '🀓', 'shuzipai-tiaozi-4'],
	[5, 'tiao5', 'tiaozi 5', '条子五', '🀔', 'shuzipai-tiaozi-5'],
	[6, 'tiao6', 'tiaozi 6', '条子六', '🀕', 'shuzipai-tiaozi-6'],
	[7, 'tiao7', 'tiaozi 7', '条子七', '🀖', 'shuzipai-tiaozi-7'],
	[8, 'tiao8', 'tiaozi 8', '条子八', '🀗', 'shuzipai-tiaozi-8'],
	[9, 'tiao8', 'tiaozi 9', '条子九', '🀘', 'shuzipai-tiaozi-9']
], 36)

export const WANZI = quadruple([
	[1, 'wan1', 'wanzi 1', '万子一', '🀇', 'shuzipai-wanzi-1'],
	[2, 'wan2', 'wanzi 2', '万子二', '🀈', 'shuzipai-wanzi-2'],
	[3, 'wan3', 'wanzi 3', '万子三', '🀉', 'shuzipai-wanzi-3'],
	[4, 'wan4', 'wanzi 4', '万子四', '🀊', 'shuzipai-wanzi-4'],
	[5, 'wan5', 'wanzi 5', '万子五', '🀋', 'shuzipai-wanzi-5'],
	[6, 'wan6', 'wanzi 6', '万子六', '🀌', 'shuzipai-wanzi-6'],
	[7, 'wan7', 'wanzi 7', '万子七', '🀍', 'shuzipai-wanzi-7'],
	[8, 'wan8', 'wanzi 8', '万子八', '🀎', 'shuzipai-wanzi-8'],
	[9, 'wan9', 'wanzi 9', '万子九', '🀏', 'shuzipai-wanzi-9']
], 72)

export const ZIPAI = quadruple([
	[1, 'zi1', 'dong', '东', '🀀', 'zipai-fengpai-1-dong'],
	[2, 'zi2', 'nan', '南', '🀁', 'zipai-fengpai-2-nan'],
	[3, 'zi3', 'xi', '西', '🀂', 'zipai-fengpai-3-xi'],
	[4, 'zi4', 'bei', '北', '🀃', 'zipai-fengpai-4-bei'],
	[1, 'zi5', 'zhong', '中', '🀄︎', 'zipai-jianpai-1-zhong'],
	[2, 'zi6', 'fa', '发', '🀅', 'zipai-jianpai-2-fa'],
	[3, 'zi7', 'bai', '白', '🀆', 'zipai-jianpai-3-bai'],
], 108)

export const HUAPAI = [
	[137, 1, 'hua1', 'chun', '春', '🀦', 'huapai-sjie-1-chun'],
	[138, 2, 'hua2', 'xia', '夏', '🀧', 'huapai-sjie-2-xia'],
	[139, 3, 'hua3', 'qiu', '秋', '🀨', 'huapai-sjie-3-qiu'],
	[140, 4, 'hua4', 'dong', '冬', '🀩', 'huapai-sjie-4-dong'],
	[141, 1, 'hua5', 'mei', '梅', '🀢', 'huapai-sijunzi-1-mei'],
	[142, 2, 'hua6', 'lan', '兰', '🀣', 'huapai-sijunzi-2-lan'],
	[143, 3, 'hua7', 'ju', '菊', '🀥', 'huapai-sijunzi-3-ju'],
	[144, 4, 'hua8', 'zhu', '竹', '🀤', 'huapai-sijunzi-4-zhu']
]

export const BEIMIAN = [
	[null, null,'beimian', 'beimian', '背面', '🀫', 'beimian']
]

export const TILES = [...BINGZI, ...TIAOZI, ...WANZI, ...ZIPAI, ...HUAPAI]

export const WINDS = {
	1: ['dong', '东'],
	2: ['nan', '南'],
	3: ['xi', '西'],
	4: ['bei', '北']
}

export function createTile(tile) {
	if (!tile) return
	const img = document.createElement('img')

	img.width = 19
	img.height = 26

	img.classList.add('t')
	img.dataset.id = tile[0]
	img.alt = tile[5]
	img.src = 'img/tiles/' + tile[6] + '.svg'

	return img
}
