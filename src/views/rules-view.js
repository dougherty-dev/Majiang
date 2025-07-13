#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module rules-view
 * @property {Function} connectedCallback Render view.
 */

export default class RulesView extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<header>
				<h2>Rules</h2>
			</header>
			<main>
				<h3 class="center">Majiang rules</h3>
				<section class="columns">
					<h4>Standard majiang</h4>
					<p>Majiang (麻将) is a board game played by four players. Countless variations exist throughout China, Japan, Korea and the rest of the world, but there is also a standard set of rules for competitions (国标麻将竞赛规则, <em>Guoji majiang jingsai guize</em>). This implementation follows the standard rules, with some simplifications.</p>
					<p>One such simplification is that there is no tile wall, due to limited screen estate. It doesn’t affect the game, but is a cosmetic limitation. Another is that the game can be won with any legitimate winning hand, while the standard rules prescribe at least 8 <em>fan</em> (番). This makes for a faster pace.</p>
				</section>
				<section class="columns">
					<h4>Tiles</h4>
					<p>Three categories of tiles (<em>paizi</em>, 牌子) are used in the game: suited, honors, and bonus tiles. <strong>Suited tiles</strong> (<em>shuzipai</em>, 数字牌) have four of each in numbers 1–9, making for a total of 108 suited tiles:</p>
					<ul>
						<li>dots (<em>bingzi / tongzi</em>, 饼子 / 筒子, 🀙🀚🀛🀜🀝🀞🀟🀠🀡)</li>
						<li>bamboo (<em>tiaozi / suozi</em>, 条子 / 索子, 🀐🀑🀒🀓🀔🀕🀖🀗🀘)</li>
						<li>characters (<em>wanzi</em>, 万子, 🀇🀈🀉🀊🀋🀌🀍🀎🀏)</li>
					</ul>
					<p class="wrap">
						<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
						<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
						<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg">
						<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
						<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
						<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg">
						<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
						<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
						<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
						<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
						<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
						<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
						<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
						<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
						<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
						<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
						<img width="30" height="41" alt="🀈" src="img/tiles/shuzipai-wanzi-2.svg">
						<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
						<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
						<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
						<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
						<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
						<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
						<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
					</p>
					<p><strong>Honors</strong> (<em>zipai</em>, 字牌) are winds and dragons. Winds (<em>fengpai</em>, 风牌) are east (<em>dong</em>, 东, 🀀), south (<em>nan</em>, 南, 🀁), west (<em>xi</em>, 西, 🀂), and north (<em>bei</em>, 北, 🀃), in that particular order. There are four of each wind tile, making a total of 16.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
						<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
						<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
						<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
					</p>
					<p>Dragons (<em>jianpai</em>, 箭牌) consist of red (<em>zhong</em>, 中, 🀄︎), green (<em>fa</em>, 发, 🀅), and white (<em>bai</em>, 白, 🀆), with four of each, summing up to 12 dragon tiles and a total of 28 honors.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
						<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
					</p>
					<p>Honors tiles plus suited ones and nines are collectively called terminal tiles (<em>yaojiupai</em>, 幺九牌).</p>
					<p><strong>Bonus tiles</strong> or more commonly <strong>flower tiles</strong> (<em>huapai</em>, 花牌) come in two categories with four of each: flowers and seasons. Flowers are plum (<em>mei</em>, 梅, 🀢), orchid (<em>lan</em>, 兰, 🀣), crysanthemum (<em>ju</em>, 菊, 🀥), and bamboo (<em>zhu</em>, 竹, 🀤).</p>
					<p>Seasons are spring (<em>chun</em>, 春, 🀦), summer (<em>xia</em>, 下, 🀧), fall (<em>qiu</em>, 秋, 🀨), and winter (<em>dong</em>, 冬, 🀩). Flowers and seasons correspond one-to-one with winds, that is, plum and spring match east, and so forth, although this has no specific relevance in standard majiang.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀦" src="img/tiles/huapai-sjie-1-chun.svg">
						<img width="30" height="41" alt="🀧" src="img/tiles/huapai-sjie-2-xia.svg">
						<img width="30" height="41" alt="🀨" src="img/tiles/huapai-sjie-3-qiu.svg">
						<img width="30" height="41" alt="🀩" src="img/tiles/huapai-sjie-4-dong.svg">
						<img width="30" height="41" alt="🀢" src="img/tiles/huapai-sijunzi-1-mei.svg">
						<img width="30" height="41" alt="🀣" src="img/tiles/huapai-sijunzi-2-lan.svg">
						<img width="30" height="41" alt="🀥" src="img/tiles/huapai-sijunzi-3-ju.svg">
						<img width="30" height="41" alt="🀤" src="img/tiles/huapai-sijunzi-4-zhu.svg">
					</p>
					<p>Bonus tiles give one <em>fan</em> (番) each in the scoring, but are not used in the regular game. Bonus tiles are placed in front of the door or stack, and are replaced with fresh tiles from the deck.</p>
				</section>
				<section class="columns">
					<h4>Games, rounds and hands</h4>
					<p>Each game (<em>ju</em>, 局) consists of four rounds (<em>quan</em>, 圈) with at least four hands (<em>pan</em>, 盘) each. In actual games, dice (<em>shaizi</em>, 骰子) are used to determine wind and position for each player, but in this implementation the computer assigns a random number 1–4 to the human player, corresponding to the wind.</p>
					<p>In physical games, a wall (<em>paiqiang</em>, 牌墙) of 4 x 18 x 2 tiles is built from which tiles are then dealt to the players in a complicated manner. Here, this procedure is reduced to the computer keeping a virtual deck of tiles, handing out tiles as needed.</p>
					<p>Each round has a prevailing wind (<em>quanfeng</em>, 圈风), beginning with east. Each player has a seat wind (<em>menfeng</em>, 门风), also beginning with east. East is always the banker (<em>zhuangjia</em>, 庄家). Tiles are handed out to players in order south, west, north, and lastly east, with replacement of bonus tiles (<em>buhua</em>, 补花). Each player will build a stack (<em>shoupai</em>, 手牌) or door (<em>men</em>, 门) with thirteen tiles.</p>
					<p>East then begins the game by receiving a new tile, possibly with bonus replacement. Unless winning instantly, east then discards a tile, placing it openly on the table. Unless another player can form a winning hand or <em>peng</em> the tile, south continues in the same fashion, then west, then north, after which a full rotation (<em>lun</em>, 轮) is completed.</p>
					<p>The first hand continues until a player wins, or, if all tiles are used, there is a draw. If there is a draw (<em>huangpai</em>, 荒牌), or if east wins, the hand is replayed. If another player wins, a new hand is played, with winds shifted counter-clockwise: east becomes north, south becomes east, west becomes south, north becomes west.</p>
					<p>When all players have been dealers, the first round is completed. Prevailing wind shifts to south, and the second round proceeds in the same manner. West is prevailing wind in the third round, north in the fourth and last.</p>
				</section>
				<section class="columns">
					<h4>Melds</h4>
					<p>Each player continually draws and discards a tile, possibly with bonus tile replacement, unless there is some other action. One such is defined by melds, of which there are three kinds: <em>chi</em>, <em>peng</em> and <em>gang</em>.</p>
					<p><em>Chi</em> (吃, eat) is when the next player in turn can pick up the just discarded tile to form a sequence of three tiles (<em>shunzi</em>, 顺子), which are then placed openly on the table. Chi is the verb, shunzi is the result of the action.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
						<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
						<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
						<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
						<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
					</p>
					<p><em>Peng</em> (碰, touch) can be done by any player who can form a set of three identical tiles (<em>kezi</em>, 刻子), of any kind, except bonus tiles, from the just discarded tile. The player making the chi or peng then discards a tile, and the game continues from there. Peng is the verb, kezi is the result of the action.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
						<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
						<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
						<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
						<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
					</p>
					<p><em>Gang</em> (杠, bar) is formed in the same way as a peng, but with four identical tiles (<em>gangzi</em>, 杠子), and is then called an open gang (<em>minggang</em>, 明杠). A gang can also be formed by drawing a tile, complementing a peng on hand. It is then called a concealed gang (<em>angang</em>, 暗杠), and the tiles are placed on the table with the backside up.</p>
					<p>Likewise, a peng that is placed on the table can be completed to an added gang (<em>jiagang</em>, 加杠) by drawing the fourth tile from the deck. When a gang is formed, the player must pick a new tile from the deck.</p>
					<p>A gang has priority over a peng, and a peng over a chi. It is not permitted to make a peng if the player has already made a chi or peng in the current rotation. Gang is the verb, gangzi is the result of the action.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
						<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
						<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
						<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
					</p>
				</section>
				<section class="columns">
					<h4>Winning</h4>
					<p>A winning hand (<em>hupai</em>, 和牌) usually consists of a combination of shunzi, kezi, gangzi and possible a single pair (<em>duizi</em>, 对子, or <em>jiangpai</em>, 将牌), altogether 14–18 tiles. Points awarded to the winning hand depend on the combinations, and there are many special combinations.</p>
					<p>There is often a minimum amount of points needed to declare a winning hand, 8 in standard majiang, but in this implementation any legitimate combination will do. This is the most common option when playing with money, to speed up the pace of the game.</p>
					<p>The following basic types of winning hands exist, where 1111 (gangzi) can replace any 111 (kezi):</p>
					<ul>
						<li>11, 123, 123, 123, 123</li>
						<li>11, 123, 123, 123, 111</li>
						<li>11, 123, 123, 111, 111</li>
						<li>11, 123, 111, 111, 111</li>
						<li>11, 111, 111, 111, 111</li>
					</ul>
					<p>11 indicates a pair, 123 a chi, 111 (1111) a peng (gang). There are also special hands, a few of which are of the types:</p>
					<ul>
						<li>11, 11, 11, 11, 11, 11, 11</li>
						<li>1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11</li>
						<li>1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1</li>
					</ul>
					<p class="wrap">
						<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
						<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
						<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg" class="meld-end">
						<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
						<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
						<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg" class="meld-end">
						<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
						<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
					</p>
					<p>If two or more players can form a winning hand simultaneously, the player earliest in order of the player discarding the tile wins.</p>
					<p><em>Zimohu</em> (自摸和) is winning by drawing a tile from the deck. Otherwise, a winning hand is formed by taking a discarded tile (<em>dianhu</em>, 点和), either a chi, peng or kong. If no player can win before the deck is used up, the hand is declared a draw and is replayed.</p>
					<p><em>Qianggang</em> (抢杠) or robbing the gang is when a winning hand can be formed by a tile that just formed a jiagang after drawing from the deck.</p>
				</section>
				<section class="columns">
					<h4>Scoring</h4>
					<p>Winning units are referred to as <em>fan</em> (番). Altogether, there are 81 possible fan types for a winning hand, divided into nine groups and twelve fan categories: 88, 64, 48, 32, 24, 16, 12, 8, 6, 4, 2, and 1 fan. They are not mutually exclusive, but can occasionally be combined for a higher score.</p>
					<p>Basic points: the sum of the combined fan score.</p>
					<p>Extra points: the winner receives 8 points each from losing parties.</p>
					<p>Winning by zimohu: each player pays the winner basic plus extra points.</p>
					<p>Winning by dianhu: discarding player pays winner basic plus extra points, other players only pay extra points.</p>
				</section>
				<section class="columns">
					<h4>Fan types</h4>
					<p>Fans are calculated from the following type chart, from highest to lowest. The arrangement of tiles (kezi or shunzi) makes a difference in calculating the fan, and there can only be one such arrangement. Some fan types can be achieved only by taking a discarded tile, others only by having a concealed hand.</p>
					<h4>88 fan:</h4>
					<ol>
						<li>
							<p><strong>Big four winds</strong> (<em>Da si xi</em>, 大四喜, or <em>si feng hui</em>, 四风会): contains kezi (gangzi) of all winds, plus an arbitrary pair.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg" class="meld-end">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg" class="meld-end">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
							</p>
						</li>
						<li>
							<p><strong>Big three dragons</strong> (<em>Da san yuan</em>, 大三元): contains kezi (gangzi) of all three dragons</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg" class="meld-end">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>All green</strong> (<em>Lü yise</em>, 绿一色): melds with tiaozi of values 2, 3, 4, 6, and 8, optionally plus fa.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
							</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
							</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
							</p>
						</li>
						<li>
							<p><strong>Nine gates</strong> (<em>Jiu lianbaodeng</em>, 九莲宝灯): suited tiles of the form 1112345678999 plus any additional tile in the same suit.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Four gangs</strong> (<em>Si gang</em>, 四杠): four gangs of any kind.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
							</p>
						</li>
						<li>
							<p><strong>Seven shifted pairs</strong> (<em>Lian qi dui</em>, 连七对): seven pairs of the same suit, each shifted up in value.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Thirteen orphans</strong> (<em>Shisan yao</em>, 十三幺): one each of ones, nines, and honors tiles plus a pair of the same kind.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>64 fan:</h4>
					<ol>
						<li value="8">
							<p><strong>All terminals</strong> (<em>Qing yao jiu</em>, 清幺九): kezi (gangzi) and a single duizi of ones and nines, and no honor tiles.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Little four winds</strong> (<em>Xiao si xi</em>, 小四喜), contains three kezi (gangzi) and a pair of winds, and any additional meld.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg" class="meld-end">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg" class="meld-end">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
							</p>
						</li>
						<li>
							<p><strong>Little three dragons</strong> (<em>Xiao san yuan</em>, 小三元): contains two kezi (gangzi) and a duizi of dragons, and any additional meld.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg" class="meld-end">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>All honors dragons</strong> (<em>Zi yise</em>, 字一色): kezi (gangzi) and a duizi of honors tiles.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg" class="meld-end">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg" class="meld-end">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>Four concealed kezi</strong> (<em>Si an ke</em>, 四暗刻): four kezi (gangzi), all comncealed.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
							</p>
						</li>
						<li>
							<p><strong>Pure terminal shunzi</strong> (<em>Yise shuang long hui</em>, 一色双龙会): suited terminal shunzi plus a duizi of fives in the same suit. But this is also a seven pairs with higher value, in another arrangement.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
							</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
							</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>48 fan:</h4>
					<ol>
						<li value="14">
							<p><strong>Quadruple shunzi</strong> (<em>Yise si tong shun</em>, 一色四同顺): four identical shunzi, plus an arbitrary pair.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
							</p>
						</li>
						<li>
							<p><strong>Four pure shifted kezi</strong> (<em>Yise si jie gao</em>, 一色四节高): four suited kezi (gangzi) shifted upwards in value, and any additional pair.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
							</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>32 fan:</h4>
					<ol>
						<li value="16">
							<p><strong>Four shifted shunzi</strong> (<em>Yise si bu gao</em>, 一色四步高): four suited shunzi shifted up either 1 or 2 in value, but not both.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Three gangs</strong> (<em>San gang</em>, 三杠): three gangs.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
							</p>
						</li>
						<li>
							<p><strong>All terminals and honors</strong> (<em>Hun yao jiu</em>, 混幺九): kezi (gangzi) and a single duizi of ones and nines and honor tiles.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
							</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>24 fan:</h4>
					<ol>
						<li value="19">
							<p><strong>Seven pairs</strong> (<em>Qi dui</em>, 七对): seven pairs of any kind.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
							</p>
						</li>
						<li>
							<p><strong>Greater honors and knitted tiles</strong> (<em>Qi xing bu kao</em>, 七星不靠): one each of the seven honors, plus single suited tiles partially or fully covering the special shunzi 1-4-7, 2-5-8, and 3-6-9.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>All even pungs</strong> (<em>Quan shuang ke</em>, 全双刻): kezi (gangzi) and a duizi of even numbered suit tiles.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
							</p>
						</li>
						<li>
							<p><strong>Full flush</strong> (<em>Qing yise</em>, 清一色): all tiles in the same suit.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg"">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Pure triple shunzi</strong> (<em>Yise san tong shun</em>, 一色三同顺): three identical shunzi.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
							</p>
						</li>
						<li>
							<p><strong>Pure shifted kezi</strong> (<em>Yise san jie gao</em>, 一色三节高): three consecutive kezi in the same suit.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
							</p>
						</li>
						<li>
							<p><strong>Upper tiles</strong> (<em>Quan da</em>, 全大): all tiles of values 7, 8, and 9.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Middle tiles</strong> (<em>Quan zhong</em>, 全中): all tiles of values 4, 5, and 6.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
							</p>
						</li>
						<li>
							<p><strong>Lower tiles</strong> (<em>Quan xiao</em>, 全小): all tiles of values 1, 2, and 3.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
							</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>16 fan:</h4>
					<ol>
						<li value="28">
							<p><strong>Pure straight</strong> (<em>Qing long</em>, 清龙): suited shunzi 1-2-3, 4-5-6, and 7-8-9.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
							</p>
						</li>
						<li>
							<p><strong>Three-suited terminal shunzi</strong> (<em>San se shuang long hui</em>, 三色双龙会): two suited shunzi each of 1-2-3 and 7-8-9, and a pair of fives in the third suit.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
							</p>
						</li>
						<li>
							<p><strong>Three shifted shunzi</strong> (<em>Yise san bu gao</em>, 一色三步高): three suited shunzi shifted up either 1 or 2 in value, but not both.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
							</p>
						</li>
						<li>
							<p><strong>All fives</strong> (<em>Quan dai wu</em>, 全带五): all shunzi, kezi (gangzi) and duizi containing a five.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
							</p>
						</li>
						<li>
							<p><strong>Triple kezi</strong> (<em>San tong ke</em>, 三同刻): three kezi (gangzi) of the same value.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀈" src="img/tiles/shuzipai-wanzi-2.svg">
								<img width="30" height="41" alt="🀈" src="img/tiles/shuzipai-wanzi-2.svg">
								<img width="30" height="41" alt="🀈" src="img/tiles/shuzipai-wanzi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg" class="meld-end">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>Three concealed kezi</strong> (<em>San an ke</em>, 三暗刻): three kezi (gangzi), all concealed.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
							</p>
							<p class="wrap"></p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>12 fan:</h4>
					<ol>
						<li value="34">
							<p><strong>Lesser honors and knitted tiles</strong> (<em>Quan bu kao</em>, 全不靠): any single honor, plus single suited tiles partially or fully covering the special shunzi 1-4-7, 2-5-8, and 3-6-9.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>Knitted straight</strong> (<em>Zuhe long</em>, 组合龙): three special shunzi 1-4-7, 2-5-8, and 3-6-9 in different suits.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Upper four</strong> (<em>Da yu wu</em>, 大于五): all tiles valued 6–9.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
							</p>
						</li>
						<li>
							<p><strong>Lower four</strong> (<em>Xiao yu wu</em>, 小于五): all tiles valued 1–4.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg" class="meld-end">
							</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
							</p>
						</li>
						<li>
							<p><strong>Big three winds</strong> (<em>San feng ke</em>, 三风刻): gangzi (kongzi) of three winds.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
								<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg" class="meld-end">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
							</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>8 fan:</h4>
					<ol>
						<li value="39">
							<p><strong>Mixed straight</strong> (<em>Hualong</em>, 花龙): three shunzi in different suits spanning 1–9.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>Reversible tiles</strong> (<em>Tuibudao</em>, 推不倒): shunzi, kezi (gangzi) and duizi consisting of vertically symmetrical tiles only: dots 1234589; bamboo 245689, and white dragon.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>Mixed triple shunzi</strong> (<em>Sanse san tong shun</em>, 三色三同顺): three equal shunzi in each suit.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Mixed shifted kezi</strong> (<em>Sanse san tong jiegao</em>, 三色三节高): three kezi (gangzi) shifted upwards in value.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Chicken hand</strong> (<em>Wu fan hu</em>, 无番和): hand with no regular fan value, excluding bonus tiles.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
								<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
							</p>
							<p>Waiting for (<em>tingpai</em>, 听牌) discarded bamboo 4, when not last tile.</p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>6 fan:</h4>
					<ol>
						<li value="49"></li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>4 fan:</h4>
					<ol>
						<li value="55"></li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>2 fan:</h4>
					<ol>
						<li value="59"></li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>1 fan:</h4>
					<ol>
						<li value="69"></li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
						<li>
							<p></p>
							<p class="wrap"></p>
						</li>
					</ol>
				</section>
				</section>
				<section class="columns">
					<h4></h4>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
				</section>
			</main>
    `
	}
}
