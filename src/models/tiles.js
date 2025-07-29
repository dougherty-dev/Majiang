#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module tiles
 */

export const ALLPLAYERS = [1, 2, 3, 4]
export const AIPLAYERS = [1, 2, 3]
export const SHUZIPAI = ['b', 't', 'w']
export const PAIZI = ['z', 't', 'w', 'z']

function quadruple(set, start) {
	let newSet = []
	for (const [key, item] of Object.entries(set)) {
		for (const index of ALLPLAYERS) {
			newSet.push([start + 4 * key + index, ...item])
		}
	}

	return newSet
}

const BINGZI = quadruple([
	[1, 'bing1', 'bingzi 1', '饼子一', '🀙', 'shuzipai-bingzi-1', 'b'],
	[2, 'bing2', 'bingzi 2', '饼子二', '🀚', 'shuzipai-bingzi-2', 'b'],
	[3, 'bing3', 'bingzi 3', '饼子三', '🀛', 'shuzipai-bingzi-3', 'b'],
	[4, 'bing4', 'bingzi 4', '饼子四', '🀜', 'shuzipai-bingzi-4', 'b'],
	[5, 'bing5', 'bingzi 5', '饼子五', '🀝', 'shuzipai-bingzi-5', 'b'],
	[6, 'bing6', 'bingzi 6', '饼子六', '🀞', 'shuzipai-bingzi-6', 'b'],
	[7, 'bing7', 'bingzi 7', '饼子七', '🀟', 'shuzipai-bingzi-7', 'b'],
	[8, 'bing8', 'bingzi 8', '饼子八', '🀠', 'shuzipai-bingzi-8', 'b'],
	[9, 'bing9', 'bingzi 9', '饼子九', '🀡', 'shuzipai-bingzi-9', 'b']
], 0)

const TIAOZI = quadruple([
	[1, 'tiao1', 'tiaozi 1', '条子一', '🀐', 'shuzipai-tiaozi-1', 't'],
	[2, 'tiao2', 'tiaozi 2', '条子二', '🀑', 'shuzipai-tiaozi-2', 't'],
	[3, 'tiao3', 'tiaozi 3', '条子三', '🀒', 'shuzipai-tiaozi-3', 't'],
	[4, 'tiao4', 'tiaozi 4', '条子四', '🀓', 'shuzipai-tiaozi-4', 't'],
	[5, 'tiao5', 'tiaozi 5', '条子五', '🀔', 'shuzipai-tiaozi-5', 't'],
	[6, 'tiao6', 'tiaozi 6', '条子六', '🀕', 'shuzipai-tiaozi-6', 't'],
	[7, 'tiao7', 'tiaozi 7', '条子七', '🀖', 'shuzipai-tiaozi-7', 't'],
	[8, 'tiao8', 'tiaozi 8', '条子八', '🀗', 'shuzipai-tiaozi-8', 't'],
	[9, 'tiao8', 'tiaozi 9', '条子九', '🀘', 'shuzipai-tiaozi-9', 't']
], 36)

const WANZI = quadruple([
	[1, 'wan1', 'wanzi 1', '万子一', '🀇', 'shuzipai-wanzi-1', 'w'],
	[2, 'wan2', 'wanzi 2', '万子二', '🀈', 'shuzipai-wanzi-2', 'w'],
	[3, 'wan3', 'wanzi 3', '万子三', '🀉', 'shuzipai-wanzi-3', 'w'],
	[4, 'wan4', 'wanzi 4', '万子四', '🀊', 'shuzipai-wanzi-4', 'w'],
	[5, 'wan5', 'wanzi 5', '万子五', '🀋', 'shuzipai-wanzi-5', 'w'],
	[6, 'wan6', 'wanzi 6', '万子六', '🀌', 'shuzipai-wanzi-6', 'w'],
	[7, 'wan7', 'wanzi 7', '万子七', '🀍', 'shuzipai-wanzi-7', 'w'],
	[8, 'wan8', 'wanzi 8', '万子八', '🀎', 'shuzipai-wanzi-8', 'w'],
	[9, 'wan9', 'wanzi 9', '万子九', '🀏', 'shuzipai-wanzi-9', 'w']
], 72)

const ZIPAI = quadruple([
	[1, 'zi1', 'dong', '东', '🀀', 'zipai-fengpai-1-dong', 'f'],
	[2, 'zi2', 'nan', '南', '🀁', 'zipai-fengpai-2-nan', 'f'],
	[3, 'zi3', 'xi', '西', '🀂', 'zipai-fengpai-3-xi', 'f'],
	[4, 'zi4', 'bei', '北', '🀃', 'zipai-fengpai-4-bei', 'f'],
	[1, 'zi5', 'zhong', '中', '🀄︎', 'zipai-jianpai-1-zhong', 'j'],
	[2, 'zi6', 'fa', '发', '🀅', 'zipai-jianpai-2-fa', 'j'],
	[3, 'zi7', 'bai', '白', '🀆', 'zipai-jianpai-3-bai', 'j'],
], 108)

export const HUAPAI = [
	[137, 1, 'hua1', 'chun', '春', '🀦', 'huapai-sijie-1-chun', 'sijie'],
	[138, 2, 'hua2', 'xia', '夏', '🀧', 'huapai-sijie-2-xia', 'sijie'],
	[139, 3, 'hua3', 'qiu', '秋', '🀨', 'huapai-sijie-3-qiu', 'sijie'],
	[140, 4, 'hua4', 'dong', '冬', '🀩', 'huapai-sijie-4-dong', 'sijie'],
	[141, 1, 'hua5', 'mei', '梅', '🀢', 'huapai-sijunzi-1-mei', 'sijunzi'],
	[142, 2, 'hua6', 'lan', '兰', '🀣', 'huapai-sijunzi-2-lan', 'sijunzi'],
	[143, 3, 'hua7', 'ju', '菊', '🀥', 'huapai-sijunzi-3-ju', 'sijunzi'],
	[144, 4, 'hua8', 'zhu', '竹', '🀤', 'huapai-sijunzi-4-zhu', 'sijunzi']
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
