#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module tiles
 */

const HUAPAI = [
	[1, 'hua', 'chun', '春', '🀦', 'huapai-sjie-1-chun'],
	[2, 'hua', 'xia', '夏', '🀧', 'huapai-sjie-2-xia'],
	[3, 'hua', 'qiu', '秋', '🀨', 'huapai-sjie-3-qiu'],
	[4, 'hua', 'dong', '冬', '🀩', 'huapai-sjie-4-dong'],
	[1, 'hua', 'mei', '梅', '🀢', 'huapai-sijunzi-1-mei'],
	[2, 'hua', 'lan', '兰', '🀣', 'huapai-sijunzi-2-lan'],
	[3, 'hua', 'ju', '菊', '🀥', 'huapai-sijunzi-3-ju'],
	[4, 'hua', 'zhu', '竹', '🀤', 'huapai-sijunzi-4-zhu']
]

const ZIPAI = [
	[1, 'zi', 'dong', '东', '🀀', 'zipai-fengpai-1-dong'],
	[2, 'zi', 'nan', '南', '🀁', 'zipai-fengpai-2-nan'],
	[3, 'zi', 'xi', '西', '🀂', 'zipai-fengpai-3-xi'],
	[4, 'zi', 'bei', '北', '🀃', 'zipai-fengpai-4-bei'],
	[1, 'zi', 'zhong', '中', '🀄︎', 'zipai-jianpai-1-zhong'],
	[2, 'zi', 'fa', '发', '🀅', 'zipai-jianpai-2-fa'],
	[3, 'zi', 'bai', '白', '🀅', 'zipai-jianpai-3-bai'],
]

const BINGZI = [
	[1, 'bing', 'bingzi 1', '饼子一', '🀙', 'shupaizi-bingzi-1'],
	[2, 'bing', 'bingzi 2', '饼子二', '🀚', 'shupaizi-bingzi-2'],
	[3, 'bing', 'bingzi 3', '饼子三', '🀛', 'shupaizi-bingzi-3'],
	[4, 'bing', 'bingzi 4', '饼子四', '🀜', 'shupaizi-bingzi-4'],
	[5, 'bing', 'bingzi 5', '饼子五', '🀝', 'shupaizi-bingzi-5'],
	[6, 'bing', 'bingzi 6', '饼子六', '🀞', 'shupaizi-bingzi-6'],
	[7, 'bing', 'bingzi 7', '饼子七', '🀟', 'shupaizi-bingzi-7'],
	[8, 'bing', 'bingzi 8', '饼子八', '🀠', 'shupaizi-bingzi-8'],
	[9, 'bing', 'bingzi 9', '饼子九', '🀡', 'shupaizi-bingzi-9']
]

const TIAOZI = [
	[1, 'tiao', 'tiaozi 1', '条子一', '🀐', 'shupaizi-tiaozi-1'],
	[2, 'tiao', 'tiaozi 2', '条子二', '🀑', 'shupaizi-tiaozi-2'],
	[3, 'tiao', 'tiaozi 3', '条子三', '🀒', 'shupaizi-tiaozi-3'],
	[4, 'tiao', 'tiaozi 4', '条子四', '🀓', 'shupaizi-tiaozi-4'],
	[5, 'tiao', 'tiaozi 5', '条子五', '🀔', 'shupaizi-tiaozi-5'],
	[6, 'tiao', 'tiaozi 6', '条子六', '🀕', 'shupaizi-tiaozi-6'],
	[7, 'tiao', 'tiaozi 7', '条子七', '🀖', 'shupaizi-tiaozi-7'],
	[8, 'tiao', 'tiaozi 8', '条子八', '🀗', 'shupaizi-tiaozi-8'],
	[9, 'tiao', 'tiaozi 9', '条子九', '🀘', 'shupaizi-tiaozi-9']
]

const WANZI = [
	[1, 'wan', 'wanzi 1', '万子一', '🀇', 'shupaizi-wanzi-1'],
	[2, 'wan', 'wanzi 2', '万子二', '🀈', 'shupaizi-wanzi-2'],
	[3, 'wan', 'wanzi 3', '万子三', '🀉', 'shupaizi-wanzi-3'],
	[4, 'wan', 'wanzi 4', '万子四', '🀊', 'shupaizi-wanzi-4'],
	[5, 'wan', 'wanzi 5', '万子五', '🀋', 'shupaizi-wanzi-5'],
	[6, 'wan', 'wanzi 6', '万子六', '🀌', 'shupaizi-wanzi-6'],
	[7, 'wan', 'wanzi 7', '万子七', '🀍', 'shupaizi-wanzi-7'],
	[8, 'wan', 'wanzi 8', '万子八', '🀎', 'shupaizi-wanzi-8'],
	[9, 'wan', 'wanzi 9', '万子九', '🀏', 'shupaizi-wanzi-9']
]

const BEIMIAN = [
	[null,'beimian', 'beimian', '背面', '🀫', 'beimian']
]

const TILES = [
	...HUAPAI,
	...[...ZIPAI, ...BINGZI, ...TIAOZI, ...WANZI].flatMap(i => Array(4).fill(i))
]

export {BEIMIAN, HUAPAI, ZIPAI, BINGZI, TIAOZI, WANZI, TILES}
