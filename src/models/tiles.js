#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module tiles
 */

const HUAPAI = [
	[1, 'hua1', 'chun', '春', '🀦', 'huapai-sjie-1-chun'],
	[2, 'hua2', 'xia', '夏', '🀧', 'huapai-sjie-2-xia'],
	[3, 'hua3', 'qiu', '秋', '🀨', 'huapai-sjie-3-qiu'],
	[4, 'hua4', 'dong', '冬', '🀩', 'huapai-sjie-4-dong'],
	[1, 'hua5', 'mei', '梅', '🀢', 'huapai-sijunzi-1-mei'],
	[2, 'hua6', 'lan', '兰', '🀣', 'huapai-sijunzi-2-lan'],
	[3, 'hua7', 'ju', '菊', '🀥', 'huapai-sijunzi-3-ju'],
	[4, 'hua8', 'zhu', '竹', '🀤', 'huapai-sijunzi-4-zhu']
]

const ZIPAI = [
	[1, 'zi1', 'dong', '东', '🀀', 'zipai-fengpai-1-dong'],
	[2, 'zi2', 'nan', '南', '🀁', 'zipai-fengpai-2-nan'],
	[3, 'zi3', 'xi', '西', '🀂', 'zipai-fengpai-3-xi'],
	[4, 'zi4', 'bei', '北', '🀃', 'zipai-fengpai-4-bei'],
	[1, 'zi5', 'zhong', '中', '🀄︎', 'zipai-jianpai-1-zhong'],
	[2, 'zi6', 'fa', '发', '🀅', 'zipai-jianpai-2-fa'],
	[3, 'zi7', 'bai', '白', '🀅', 'zipai-jianpai-3-bai'],
]

const BINGZI = [
	[1, 'bing1', 'bingzi 1', '饼子一', '🀙', 'shupaizi-bingzi-1'],
	[2, 'bing2', 'bingzi 2', '饼子二', '🀚', 'shupaizi-bingzi-2'],
	[3, 'bing3', 'bingzi 3', '饼子三', '🀛', 'shupaizi-bingzi-3'],
	[4, 'bing4', 'bingzi 4', '饼子四', '🀜', 'shupaizi-bingzi-4'],
	[5, 'bing5', 'bingzi 5', '饼子五', '🀝', 'shupaizi-bingzi-5'],
	[6, 'bing6', 'bingzi 6', '饼子六', '🀞', 'shupaizi-bingzi-6'],
	[7, 'bing7', 'bingzi 7', '饼子七', '🀟', 'shupaizi-bingzi-7'],
	[8, 'bing8', 'bingzi 8', '饼子八', '🀠', 'shupaizi-bingzi-8'],
	[9, 'bing9', 'bingzi 9', '饼子九', '🀡', 'shupaizi-bingzi-9']
]

const TIAOZI = [
	[1, 'tiao1', 'tiaozi 1', '条子一', '🀐', 'shupaizi-tiaozi-1'],
	[2, 'tiao2', 'tiaozi 2', '条子二', '🀑', 'shupaizi-tiaozi-2'],
	[3, 'tiao3', 'tiaozi 3', '条子三', '🀒', 'shupaizi-tiaozi-3'],
	[4, 'tiao4', 'tiaozi 4', '条子四', '🀓', 'shupaizi-tiaozi-4'],
	[5, 'tiao5', 'tiaozi 5', '条子五', '🀔', 'shupaizi-tiaozi-5'],
	[6, 'tiao6', 'tiaozi 6', '条子六', '🀕', 'shupaizi-tiaozi-6'],
	[7, 'tiao7', 'tiaozi 7', '条子七', '🀖', 'shupaizi-tiaozi-7'],
	[8, 'tiao8', 'tiaozi 8', '条子八', '🀗', 'shupaizi-tiaozi-8'],
	[9, 'tiao8', 'tiaozi 9', '条子九', '🀘', 'shupaizi-tiaozi-9']
]

const WANZI = [
	[1, 'wan1', 'wanzi 1', '万子一', '🀇', 'shupaizi-wanzi-1'],
	[2, 'wan2', 'wanzi 2', '万子二', '🀈', 'shupaizi-wanzi-2'],
	[3, 'wan3', 'wanzi 3', '万子三', '🀉', 'shupaizi-wanzi-3'],
	[4, 'wan4', 'wanzi 4', '万子四', '🀊', 'shupaizi-wanzi-4'],
	[5, 'wan5', 'wanzi 5', '万子五', '🀋', 'shupaizi-wanzi-5'],
	[6, 'wan6', 'wanzi 6', '万子六', '🀌', 'shupaizi-wanzi-6'],
	[7, 'wan7', 'wanzi 7', '万子七', '🀍', 'shupaizi-wanzi-7'],
	[8, 'wan8', 'wanzi 8', '万子八', '🀎', 'shupaizi-wanzi-8'],
	[9, 'wan9', 'wanzi 9', '万子九', '🀏', 'shupaizi-wanzi-9']
]

const BEIMIAN = [
	[null,'beimian', 'beimian', '背面', '🀫', 'beimian']
]

const TILES = [
	...[...BINGZI, ...TIAOZI, ...WANZI, ...ZIPAI].flatMap(i => Array(4).fill(i)),
	...HUAPAI
]

export {BEIMIAN, HUAPAI, ZIPAI, BINGZI, TIAOZI, WANZI, TILES}
