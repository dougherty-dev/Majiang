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
					<h4>Standard variation</h4>
					<p>Majiang (麻将) is a game played by four players. Countless variations exist throughout China, Japan, Korea and the rest of the world, but there is also a standard set of rules for competitions (国标麻将竞赛规则, <em>Guoji majiang jingsai guize</em>). This implementation follows the standard rules, with some simplifications.</p>
					<p>One such simplification is that there is no wall, due to limited screen estate. It doesn’t affect the game, but is a cosmetic limitation. Another is that the game can be won with any legitimate winning hand, while the standard rules prescribe at least 8 fan (番). This makes for a faster pace.</p>
				</section>
				<section class="columns">
					<h4>Tiles</h4>
					<p>Three categories of tiles are used in the game: suited, honors, and bonus tiles. Suited tiles (shuzipai, 数字牌) are dots (bingzi/tongzi, 饼子/筒子, 🀙🀚🀛🀜🀝🀞🀟🀠🀡), bamboo (tiaozi/suozi, 条子/索子, 🀐🀑🀒🀓🀔🀕🀖🀗🀘), and characters (wanzi, 万子, 🀇🀈🀉🀊🀋🀌🀍🀎🀏), four of each in numbers 1–9, making for a total of 108 suited tiles.</p>
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
					<p>Honors (zipai, 字牌) are winds and dragons. Winds (fengpai, 风牌) are east (dong, 东, 🀀), south (nan, 南, 🀁), west (xi, 西, 🀂), and north (bei, 北, 🀃), in that peculiar counter-clockwise order. There are four of each wind tile, making a total of 16.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
						<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
						<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
						<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
					</p>
					<p>Dragons (jianpai, 箭牌) consist of red (zhong, 中, 🀄︎), green (fa, 发, 🀅), and white (bai, 白, 🀆), with four of each, summing up to 12 dragon tiles and a total of 28 honors.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
						<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
					</p>
					<p>Bonus tiles (huapai, 花牌) come in two categories with four of each: flowers and seasons. Flowers are plum (mei, 梅, 🀢), orchid (lan, 兰, 🀣), crysanthemum (ju, 菊, 🀥), and bamboo (zhu, 竹, 🀤). Seasons are spring (chun, 春, 🀦), summer (xia, 下, 🀧), fall (qiu, 秋, 🀨), and winter (dong, 冬, 🀩). Flowers and seasons correspond one-to-one with winds, that is, plum and spring match east, and so forth.</p>
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
					<p>Bonus tiles can give extra points when they correspond to the player’s current wind, but are not used in the regular game. Bonus tiles are placed in front of the door or stack, and are replaced with fresh tiles from the deck. Note that the English names don’t always make sense or correspond to the Chinese ones, but are a convention.</p>
				</section>
				<section class="columns">
					<h4>Rounds and hands</h4>
					<p>Each game consists of four rounds with at least four hands each. In actual games, dice are used to determine wind and position for each player, but in this implementation the computer assigns a random number 1–4 to the human player, corresponding to the wind.</p>
					<p>In physical games, a wall of 4 x 18 x 2 tiles is built from which tiles are then dealt to the players in a complicated manner. Here, this procedure is reduced to the computer keeping a virtual deck of tiles, handing out tiles as needed.</p>
					<p>Each round has a prevailing wind, beginning with east. East also begins each round, and is technically the dealer (zhuangjia, 庄家). Tiles are handed out to players in order south, west, north, and lastly east, with replacement of bonus tiles (buhua, 补花). Each player will build a stack or door with thirteen tiles.</p>
					<p>East then begins the game by receiving a new tile, with bonus replacement. Unless winning instantly, east then discards a tile, placing it openly on the table. Unless another player can form a winning hand or <em>peng</em> the tile, south continues in the same fashion, then west, then north.</p>
					<p>The first hand continues until a player wins, or, if all tiles are used, there is a draw. If there is a draw, or if east wins, the hand is replayed. If another player wins, a new hand is played, with winds shifted counter-clockwise: east becomes north, south becomes east, west becomes south, north becomes west.</p>
					<p>When all players have been dealers, the first round is completed. Prevailing wind shifts to south, and the second round proceeds in the same manner. West is prevailing wind in the third round, north in the fourth and last.</p>
				</section>
				<section class="columns">
					<h4>Melds</h4>
					<p>Each player continually draws and discards a tile, possibly with bonus tile replacement, unless there is some other action. One such is defined by melds, of which there are three kinds: chi, peng and gang.</p>
					<p>Chi (吃, eat) is when the next player in turn can pick up the just discarded tile to form a sequence of three tiles (shunzi, 顺子), which are then placed openly on the table.</p>
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
					<p>Peng (碰, touch) can be done by any player who can form a set of three identical tiles (kezi, 刻子), of any kind, except bonus tiles, from the just discarded tile. The player making the chi or peng then discards a tile, and the game continues from there.</p>
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
					<p>Gang (杠, bar) is formed in the same way as a peng, but with four identical tiles (gangzi, 杠子), and is then called an open gang (minggang, 明杠). A gang can also be formed by drawing a tile, complementing a peng on hand. It is then called a concealed gang (angang, 暗杠), and the tiles are placed on the table with the backside up.</p>
					<p>Likewise, a peng that is placed on the table can be completed to an added gang (jiagang, 加杠) by drawing the fourth tile from the deck. When a gang is formed, the player must pick a new tile from the deck.</p>
					<p>A peng or gang has priority over a chi.</p>
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
					<p></p>
				</section>
				<section class="columns">
					<h4>Winning</h4>
					<p>A winning hand usually consists of a combination of shunzi, kezi, gangzi and possible a single pair (duizi, 对子), altogether 14 tiles. Points awarded to the winning hand depend on the combinations, and there are many special combinations.</p>
					<p>There is often a minimum amount of points needed to declare a winning hand, 8 in standard majiang, but in this implementation any legitimate combination will do. This is the most common option when playing with money, to speed up the pace of the game.</p>
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
					<p>If two or more players can form a winning hand simultaneously, the player with the lowest wind wins.</p>
					<p>Zimo (自摸) is winning by drawing a tile from the deck. Otherwise, a winning hand is formed by a chi, peng or kong, a so called hupai (和牌). If no player can win before the deck is used up, the hand is declared a draw and is replayed.</p>
					<p>Qianggang (抢杠) or robbing the gang is when a winning hand can be formed by a tile that just formed a jiagang after drawing from the deck.</p>
				</section>
				<section class="columns">
					<h4>Scoring</h4>
					<p>Points are referred to as fan (番). Altogether, there are 81 possible fan types for a winning hand, divided into nine groups and twelve point categories: 88, 64, 48, 32, 24, 16, 12, 8, 6, 4, 2, and 1 points. They are not mutually exclusive, but can be combined for a higher score.</p>
					<section>
						<p>88 fan:</p>
						<ol>
							<li>
								<p>Four winds meeting (si feng hui, 四风会): contains kezi (gangzi) of all winds</p>
								<p class="wrap">
									<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
									<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg" class="meld-end">
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
								<p>Big three dragons (da san yuan, 大三元): contains kezi (gangzi) of all three dragons</p>
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
								<p>Straight green (lü yi se, 绿一色): melds with tiaozi of values 2, 3, 4, 6, and 8 plus fa</p>
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
							</li>
							<li>
								<p>Nine lotus lanterns (jiu lianbaodeng, 九莲宝灯): suited tiles of the form 1112345678999 plus any additional tile in the same suit</p>
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
								<p>Four gangs (si gang, 四杠): four gangs of any kind</p>
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
								<p>Seven suited pairs (Lian qi dui, 连七对): seven pairs of the same suit, with self-draw and no open tiles (menqianqing, 门前清)</p>
								<p class="wrap">
									<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
									<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg" class="meld-end">
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
									<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								</p>
							</li>
							<li>
								<p>Thirteen orphans (shisan yao, 十三幺): one each of ones, nines, winds, dragons plus a pair of the same kind, with self-draw and no open tiles (menqianqing, 门前清)</p>
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
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						<ol>
					</section>
					<p></p>
					<p></p>
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
