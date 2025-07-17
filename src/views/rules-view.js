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
			<main id="rules">
				<h3 class="center">Majiang rules</h3>
				<section class="columns">
					<h4>Standard Majiang</h4>
					<p>Majiang (麻将) is a board game played by four players. Countless variations exist throughout China, Japan, Korea and the rest of the world, but there are also <span class="term">standard rules for competitions</span> (国标麻将竞赛规则, <em>Guoji Majiang jingsai guize</em>). This implementation follows the standard, with some cosmetic simplifications.</p>
					<p>Notably, there is no tile wall due to limited screen estate, although it does not affect the game proper. As a consequence, there is also no need for dice. Furthermore, no time limits are imposed on players.</p>
					<p>According to the standard, the Chinese definition always takes precedence over translations whenever there is disagreement in interpretation of the rules. Chinese terms are given in parallel, using pinyin rather than legacy renderings, although they are by no means necessary to play the game.</p>
				</section>
				<section class="columns">
					<h4>Tiles</h4>
					<p>Three categories of unranked <span class="term">tiles</span> (<em>paizhang</em>, 牌张) are used in the game: suited tiles, honor tiles, and bonus tiles.</p>
					<hr>
					<p><span class="term">Suited tiles</span> (<em>shuzipai</em>, 数字牌, «number tiles») in numbers 1–9 form four sets each, making for a total of 3·4·9 = 108 suited tiles:</p>
					<ul>
						<li><span class="term">dots</span> (<em>bingzi / tongzi</em>, 饼子 / 筒子, 🀙🀚🀛🀜🀝🀞🀟🀠🀡)</li>
						<li><span class="term">bamboo</span> (<em>tiaozi / suozi</em>, 条子 / 索子, 🀐🀑🀒🀓🀔🀕🀖🀗🀘)</li>
						<li><span class="term">characters</span> (<em>wanzi</em>, 万子, 🀇🀈🀉🀊🀋🀌🀍🀎🀏)</li>
					</ul>
					<p>一二三四五六七八九 are the numbers 1–9 using Chinese characters. Western Majiang sets often add small Hindu-Arabic numerals to tiles to facilitate reading.</p>
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
					<hr>
					<p><span class="term">Honors</span> (<em>zipai</em>, 字牌, «character tiles») are winds and dragons. <span class="term">Winds</span> (<em>fengpai</em>, 风牌) are <span class="term">east</span> (<em>dong</em>, 东, 🀀), <span class="term">south</span> (<em>nan</em>, 南, 🀁), <span class="term">west</span> (<em>xi</em>, 西, 🀂), and <span class="term">north</span> (<em>bei</em>, 北, 🀃), in that particular order. There are four of each wind tile, making a total of 16.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
						<img width="30" height="41" alt="🀁" src="img/tiles/zipai-fengpai-2-nan.svg">
						<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
						<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
					</p>
					<p><span class="term">Dragons</span> (<em>jianpai</em>, 箭牌, «arrow tiles») consist of <span class="term">red</span> (<em>zhong</em>, 中, 🀄︎), <span class="term">green</span> (<em>fa</em>, 发, 🀅), and <span class="term">white</span> (<em>bai</em>, 白, 🀆), with four of each, summing up to 12 dragons and a total of 28 honors.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
						<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
					</p>
					<p>Honors plus suited 1s and 9s are collectively called <span class="term">terminals</span> (<em>yaojiupai</em>, 幺九牌).</p>
					<hr>
					<p><span class="term">Bonus tiles</span> or more commonly <span class="term">flower tiles</span> (<em>huapai</em>, 花牌) come in two categories with four of each: flowers and seasons. <span class="term">Flowers</span> are <span class="term">plum</span> (<em>mei</em>, 梅, 🀢), <span class="term">orchid</span> (<em>lan</em>, 兰, 🀣), <span class="term">crysanthemum</span> (<em>ju</em>, 菊, 🀥), and <span class="term">bamboo</span> (<em>zhu</em>, 竹, 🀤).</p>
					<p><span class="term">Seasons</span> are <span class="term">spring</span> (<em>chun</em>, 春, 🀦), <span class="term">summer</span> (<em>xia</em>, 夏, 🀧), <span class="term">fall</span> (<em>qiu</em>, 秋, 🀨), and <span class="term">winter</span> (<em>dong</em>, 冬, 🀩). Flowers and seasons correspond one-to-one with winds, that is, plum and spring match east, and so forth, although this has no specific relevance in standard Majiang.</p>
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
					<p>Bonus tiles give one <em>fan</em> (番) each in the scoring, but are not used in the regular game. Bonus tiles are placed in front of the hand (<em>men qian</em>, 门前), and are replaced with fresh tiles from the wall. If the wall is used up, a flower tile may be discarded, guaranteeing a draw.</p>
					<p>Altogether suited tiles, honor tiles, and bonus tiles sum up to 108 + 28 + 8 = 144 pieces.</p>
				</section>
				<section class="columns">
					<h4>Games, rounds and hands</h4>
					<p>Each <span class="term">game</span> (<em>ju</em>, 局) consists of four <span class="term">rounds</span> (<em>quan</em>, 圈) with at least four <span class="term">hands</span> (<em>pan</em>, 盘) each. In actual games, <span class="term">dice</span> (<em>shaizi</em>, 骰子) are used to determine wind and position for each player, but in this implementation the the human player is seated in the north position, starting with the north seat wind.</p>
					<p>In physical games, a <span class="term">wall</span> (<em>paiqiang</em>, 牌墙) of 4 x 18 x 2 tiles is built from which tiles are then dealt to the players in a complicated manner to maximize randomization. Here, this procedure is reduced to the computer program keeping a virtual wall of tiles, handing out tiles as needed.</p>
					<p>Each round has a <span class="term">prevailing wind</span> (<em>quanfeng</em>, 圈风), beginning with east, then shifting to south, west, and finally north. Each player has a <span class="term">seat wind</span> (<em>menfeng</em>, 门风), also beginning with east, and rotating after each hand in a more complicated manner; see next section. The physical wind positions are stationary, and are as follows:</p>
					<div class="winds">
						<div class="wind1 east">东 E</div>
						<div class="wind2 south">南 S</div>
						<div class="wind3 west">西 W</div>
						<div class="wind4 north">北 N</div>
					</div>
					<p>The human player is seated at north in this implementation, but in competitions the physical seating order is determined by drawing lots. Players do not move around, but are continuously assigned a seat wind after each hand. Melds with wind tiles can give extra points when the seat wind corresponds to the prevailing wind.</p>
					<p>East is always the <span class="term">banker</span> (<em>zhuangjia</em>, 庄家). Tiles are first picked by east, then by <span class="term">other players</span> (<em>pangjia</em>, 旁家) in counter-clockwise physical order south, west, and north, possibly with <span class="term">replacement</span> of bonus tiles (<em>buhua</em>, 补花). Each player will build a <span class="term">hand</span> (<em>shou</em>, 手) or <span class="term">door</span> (<em>men</em>, 门) with thirteen <span class="term">standing tiles</span> (<em>lipai</em>, 立牌), all concealed.</p>
					<p>East then begins the game by taking a new tile, possibly with bonus replacement. Unless winning instantly or making a concealed gang, east then discards a tile, placing it openly on the table. Unless another player can form a winning hand or make a meld from the discarded tile, south continues in the same fashion, then west, then north, after which a full <span class="term">rotation</span> (<em>lun</em>, 轮) is completed.</p>
					<p>The first hand continues in the same fashion until a player wins, or, if all tiles are used, there is a <span class="term">draw</span> (<em>huangpai</em>, 荒牌). If there is a draw, or if east wins, the hand is replayed with the same winds. If another player wins, a new hand is played, with seat winds shifted. When all players have been east, the first round is completed.</p>
				</section>
				<section class="columns">
					<h4>Seat winds</h4>
					<p>The seat winds (the designations, not the physical positions) are shifted in the following fashion after each hand to accomodate for upper/left and lower/right positions of players. As a matter of convenience, the human player is initially assigned north, to match the physical position.</p>
					<p><em>Round 2, 4</em><br>
					W ↔︎ N | E ↔︎ S</p>
					<p><em>Round 3</em><br>
					W → S | S → N | N → E | E → W</p>
					<div class="winds">
						<div class="wind1 east">东 E</div>
						<div class="wind2 south">南 S</div>
						<div class="wind3 west">西 W</div>
						<div class="wind4 north">北 N</div>
					</div>
					<div class="winds">
						<div class="wind1 south">南 S</div>
						<div class="wind2 east">东 E</div>
						<div class="wind3 north">北 N</div>
						<div class="wind4 west">西 W</div>
					</div>
					<div class="winds">
						<div class="wind1 west">西 W</div>
						<div class="wind2 north">北 N</div>
						<div class="wind3 south">南 S</div>
						<div class="wind4 east">东 E</div>
					</div>
					<div class="winds">
						<div class="wind1 north">北 N</div>
						<div class="wind2 west">西 W</div>
						<div class="wind3 east">东 E</div>
						<div class="wind4 south">南 S</div>
					</div>
				</section>
				<section class="columns">
					<h4>Melds</h4>
					<p>Each player continually draws and discards a tile, possibly with bonus tile replacement, unless there is some other action. One such is defined by <span class="term">melds</span> (<em>baipai</em>, 摆牌), of which there are three kinds: <em>chi</em>, <em>peng</em> and <em>gang</em>.</p>
					<p><em>Chi</em> (吃, «eat») is when the next player in turn can pick up the just discarded tile to form a <span class="term">sequence</span> of three tiles (<em>shunzi</em>, 顺子), which are then placed openly on the table. Chi is the verb, <span class="term">shunzi</span> is the result of the action.</p>
					<p class="wrap">
						<img width="41" height="30" alt="🀟" src="img/tiles/shuzipai-bingzi-7-o.svg">
						<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
						<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
						<img width="41" height="30" alt="🀊" src="img/tiles/shuzipai-wanzi-4-o.svg">
						<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
					</p>
					<p><em>Peng</em> (碰, «knock») can be done by any player who can form a <span class="term">set</span> of three identical tiles (<em>kezi</em>, 刻子), of any kind, except bonus tiles, from the just discarded tile. The player making the chi or peng then discards a tile, and the game continues from there. Peng is the verb, <span class="term">kezi</span> is the result of the action.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
						<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1-o.svg">
						<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
						<img width="30" height="41" alt="🀃" src="img/tiles/zipai-fengpai-4-bei.svg">
						<img width="41" height="30" alt="🀃" src="img/tiles/zipai-fengpai-4-bei-o.svg">
					</p>
					<p><em>Gang</em> (杠, «make a bar») is similar to peng, but with four identical tiles forming a <span class="term">bar</span> (<em>gangzi</em>, 杠子), and is then called an <span class="term">open gang</span> (<em>minggang</em>, 明杠). A gang can also be formed by drawing a tile, complementing a peng on hand. It is then called a <span class="term">concealed gang</span> (<em>angang</em>, 暗杠), and the tiles are placed on the table with the backside up.</p>
					<p>Likewise, a kezi that is placed on the table after a peng can be <span class="term">completed</span> (<em>jiagang</em>, 加杠) to a gangzi by drawing the fourth tile from the wall. When a gang is formed, the player must pick a new tile from the wall.</p>
					<p>A gang has priority over a peng, and a peng over a chi. A player may not make a gang immediately after making a chi or peng, that is, announcing a concealed gang in the same turn. However, making a consecutive gang after taking a tile is allowed. Gang is the verb, <span class="term">gangzi</span> is the result of the action. A taken tile is rotated 90&nbsp;° and indicating position whence it came.</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="41" height="30" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong-o.svg">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
						<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
					</p>
					<p class="wrap">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
						<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
						<img width="41" height="60" alt="🀔" src="img/tiles/shuzipai-tiaozi-5-d.svg">
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
					<p>A <span class="term">winning hand</span> (<em>hupai</em>, 和牌) usually consists of a combination of shunzi, kezi, gangzi and a single <span class="term">pair</span> (<em>duizi</em>, 对子, or <em>jiangpai</em>, 将牌), altogether 14–18 tiles. Points awarded to the winning hand depend on the combinations, and there are many special ones. A winning hand must amount to at least 8 <em>fan</em> (番) in standard Majiang, not counting bonus tiles.</p>
					<p>The following basic types of winning hands exist, where 1111 (gangzi) can replace any 111 (kezi):</p>
					<ul>
						<li>11, 123, 123, 123, 123</li>
						<li>11, 123, 123, 123, 111</li>
						<li>11, 123, 123, 111, 111</li>
						<li>11, 123, 111, 111, 111</li>
						<li>11, 111, 111, 111, 111</li>
					</ul>
					<p>11 indicates a duizi, 123 a shunzi, 111 (1111) a kezi (gangzi). There are also some special hands, a few of which are of the types:</p>
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
					<p>If two or more players can form a winning hand simultaneously, the player earliest in order after the player discarding the tile wins.</p>
					<p><span class="term">Self-draw</span> (<em>Zimohu</em>, 自摸和) is winning by drawing a tile from the wall. Otherwise, a winning hand is formed by <span class="term">taking a discarded tile</span> (<em>dianhu</em>, 点和), either by chi, peng or gang. If no player can win before the wall is used up, the hand is declared a draw and is replayed.</p>
					<p><em>Qianggang</em> (抢杠) or <span class="term">robbing the gang</span> is when a winning hand can be formed by a tile that just formed a jiagang (gangzi from kezi) after drawing a tile from the wall.</p>
					<p>Waiting for a last tile to form a winning hand is called <span class="term">listening</span> (<em>tingpai</em>, 听牌).</p>
				</section>
				<section class="columns">
					<h4>Scoring</h4>
					<p>Winning units are referred to as <em>fan</em> (番). Altogether, there are 81 possible <span class="term">fan types</span> (<em>fanzhong</em>, 番种) for a winning hand, divided into nine groups and twelve fan categories: 88, 64, 48, 32, 24, 16, 12, 8, 6, 4, 2, and 1 fan. They are not mutually exclusive, but can be combined for a higher score.</p>
					<p><span class="term">Basic points</span> (<em>jibenfen</em>, 基本分): the sum of the combined fan score.</p>
					<p><span class="term">Extra points</span> (<em>difen</em>, 底分): the winner receives 8 points each from losing parties.</p>
					<p>Winning by self-draw: each player pays the winner basic plus extra points: 3·(E + B)</p>
					<p>Winning by discarded tile: discarding player pays winner basic plus extra points, other players only pay extra points: B + 3·E.</p>
					<p>There are also negative <span class="term">penalty points</span> (<em>fafen</em>, 罚分) for foul play, that is, declaring a faulty Majiang and similar, but they do not apply in this implementation.</p>
				</section>
				<section class="columns">
					<h4>Fan types</h4>
					<p>Fan scores are calculated according to the following type chart, from highest to lowest. The arrangement of tiles (kezi or shunzi) makes a difference in calculating the fan, and there can only be one such arrangement.</p>
					<p>Some fan types can be achieved only by taking a discarded tile, others only by having a concealed hand. Fan types implied in others are usually prohibited, and are explicitly marked as such in the listing.</p>
					<p>In this implementation, the computer program will automatically select the highest possible score.</p>
					<h4>88 fan:</h4>
					<ol>
						<li>
							<p><strong>Big four winds</strong> (<em>Da si xi</em>, <span class="fanzhong" data-src="1">大四喜</span>): contains kezi (gangzi) of all winds, plus an arbitrary pair.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
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
							<p class="exclude">➖ Does not combine with: 38 Big three winds; 49 All kezi; 60 Prevalent wind; 61 Seat wind; 73 Terminal kezi.</p>
						</li>
						<li>
							<p><strong>Big three dragons</strong> (<em>Da san yuan</em>, <span class="fanzhong" data-src="2">大三元</span>): contains kezi (gangzi) of all three dragons</p>
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
							<p class="exclude">➖ 54 Two dragons; 59 Dragon kezi.</p>
						</li>
						<li>
							<p><strong>All green</strong> (<em>Lü yise</em>, <span class="fanzhong" data-src="3">绿一色</span>): melds with tiaozi of values 2, 3, 4, 6, and 8, optionally plus fa. (Bamboo tiles 1, 5, 7 and 9 are not purely green.)</p>
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
						</li>
						<li>
							<p><strong>Nine gates</strong> (<em>Jiu lian baodeng</em>, <span class="fanzhong" data-src="4">九莲宝灯</span>): suited tiles of the form 1112345678999 plus any additional tile in the same suit.</p>
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
							<p class="exclude">➖ 22 Full flush; 73 Terminal kezi.</p>
						</li>
						<li>
							<p><strong>Four gangs</strong> (<em>Si gang</em>, <span class="fanzhong" data-src="5">四杠</span>): four gangs of any kind.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg" class="meld-end">
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
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg" class="meld-end">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
							</p>
							<p class="exclude">➖ 79 Single wait.</p>
						</li>
						<li>
							<p><strong>Seven shifted pairs</strong> (<em>Lian qi dui</em>, <span class="fanzhong" data-src="6">连七对</span>): seven pairs of the same suit, each shifted up in value.</p>
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
							<p class="exclude">➖ 22 Full flush; 79 Single wait.</p>
						</li>
						<li>
							<p><strong>Thirteen orphans</strong> (<em>Shisan yao</em>, <span class="fanzhong" data-src="7">十三幺</span>): one each of ones, nines, and honor tiles plus a pair of the same kind.</p>
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
							<p class="exclude">➖ 52 All types; 79 Single wait.</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>64 fan:</h4>
					<ol>
						<li value="8">
							<p><strong>Pure terminals</strong> (<em>Qing yao jiu</em>, <span class="fanzhong" data-src="8">清幺九</span>): kezi (gangzi) and a single duizi of ones and nines, and no honor tiles.</p>
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
							<p>In the example, there are also two <em>65. Double kezi</em> worth 4 fan each.</p>
							<p class="exclude">➖ 49 All kezi; 55 Outside hand; 73 Terminal kezi; 76 No honors.</p>
						</li>
						<li>
							<p><strong>Little four winds</strong> (<em>Xiao si xi</em>, <span class="fanzhong" data-src="9">小四喜</span>), contains three kezi (gangzi) and a pair of winds, and any additional meld.</p>
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
							<p class="exclude">➖ 38 Big three winds; 73 Terminal kezi.</p>
						</li>
						<li>
							<p><strong>Little three dragons</strong> (<em>Xiao san yuan</em>, <span class="fanzhong" data-src="10">小三元</span>): contains two kezi (gangzi) and a duizi of dragons, and any two additional melds.</p>
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
							<p class="exclude">➖ 54 Two dragons; 59 Dragon kezi.</p>
						</li>
						<li>
							<p><strong>All honors</strong> (<em>Zi yi se</em>, <span class="fanzhong" data-src="11">字一色</span>): kezi (gangzi) and a duizi of honor tiles.</p>
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
							<p class="exclude">➖ 49 All kezi; 55 Outside hand; 73 Terminal kezi.</p>
						</li>
						<li>
							<p><strong>Four concealed kezi</strong> (<em>Si an ke</em>, <span class="fanzhong" data-src="12">四暗刻</span>): four kezi (gangzi), all concealed (no open melds).</p>
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
							<p class="exclude">➖ 49 All kezi.</p>
						</li>
						<li>
							<p><strong>Pure terminal shunzi</strong> (<em>Yi se shuang long hui</em>, <span class="fanzhong" data-src="13">一色双龙会</span>): two suited terminal shunzi (72) plus a duizi of fives, all in the same suit.</p>
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
							<p>In another arrangement, this would be a <em>19. Seven pairs</em> with a much lower value (24 fan). A player could choose either, but not both.</p>
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
							<p class="exclude">➖ 19 Seven pairs; 22 Full flush; 63 All shunzi; 69 Pure double shunzi; 72 Two terminal shunzi; 76 No honors.</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>48 fan:</h4>
					<ol>
						<li value="14">
							<p><strong>Quadruple shunzi</strong> (<em>Yi se si tong shun</em>, <span class="fanzhong" data-src="14">一色四同顺</span>): four identical shunzi, plus an arbitrary pair.</p>
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
							<p class="exclude">➖ 24 Pure shifted kezi; 64 Tile hog; 69 Pure double shunzi.</p>
						</li>
						<li>
							<p><strong>Four pure shifted kezi</strong> (<em>Yi se si jie gao</em>, <span class="fanzhong" data-src="15">一色四节高</span>): four suited kezi (gangzi) shifted upwards in value, and any additional pair.</p>
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
							<p class="exclude">➖ 23 Pure triple shunzi; 49 All kezi.</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>32 fan:</h4>
					<ol>
						<li value="16">
							<p><strong>Four shifted shunzi</strong> (<em>Yi se si bu gao</em>, <span class="fanzhong" data-src="16">一色四步高</span>): four suited shunzi shifted up either 1 or 2 in value, but not both.</p>
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
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
							<p class="exclude">➖ 71 Short straight; 72 Two terminal shunzi.</p>
						</li>
						<li>
							<p><strong>Three gangs</strong> (<em>San gang</em>, <span class="fanzhong" data-src="17">三杠</span>): three gangs.</p>
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
							<p><strong>Non-pure terminals</strong> (<em>Hun yao jiu</em>, <span class="fanzhong" data-src="18">混幺九</span>): kezi (gangzi) and a single duizi of ones and nines and honor tiles.</p>
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
							<p class="exclude">➖ 49 All kezi; 55 Outside hand; 73 Terminal kezi.</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>24 fan:</h4>
					<ol>
						<li value="19">
							<p><strong>Seven pairs</strong> (<em>Qi dui</em>, <span class="fanzhong" data-src="19">七对</span>): seven pairs of any kind.</p>
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
							<p class="exclude">➖ 79 Single wait.</p>
						</li>
						<li>
							<p><strong>Greater honors and knitted tiles</strong> (<em>Qi xing bu kao</em>, <span class="fanzhong" data-src="20">七星不靠</span>): one each of the seven honors, plus single suited tiles partially or fully covering the special shunzi 1-4-7, 2-5-8, and 3-6-9.</p>
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
							<p class="exclude">➖ 52 All types.</p>
						</li>
						<li>
							<p><strong>All even kezi</strong> (<em>Quan shuang ke</em>, <span class="fanzhong" data-src="21">全双刻</span>): kezi (gangzi) and a duizi, all of even numbered suit tiles.</p>
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
							<p class="exclude">➖ 49 All kezi; 68 All simples.</p>
						</li>
						<li>
							<p><strong>Full flush</strong> (<em>Qing yi se</em>, <span class="fanzhong" data-src="22">清一色</span>): all tiles in the same suit.</p>
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
							<p class="exclude">➖ 76 No honors.</p>
						</li>
						<li>
							<p><strong>Pure triple shunzi</strong> (<em>Yi se san tong shun</em>, <span class="fanzhong" data-src="23">一色三同顺</span>): three identical shunzi.</p>
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
							<p class="exclude">➖ 24 Pure shifted kezi; 69 Pure double shunzi.</p>
						</li>
						<li>
							<p><strong>Pure shifted kezi</strong> (<em>Yi se san jie gao</em>, <span class="fanzhong" data-src="24">一色三节高</span>): three consecutive kezi (gangzi) in the same suit.</p>
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
							<p class="exclude">➖ 23 Pure triple shunzi.</p>
						</li>
						<li>
							<p><strong>Upper tiles</strong> (<em>Quan da</em>, <span class="fanzhong" data-src="25">全大</span>): all tiles of values 7, 8, and 9.</p>
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
							<p class="exclude">➖ 76 No honors.</p>
						</li>
						<li>
							<p><strong>Middle tiles</strong> (<em>Quan zhong</em>, <span class="fanzhong" data-src="26">全中</span>): all tiles of values 4, 5, and 6.</p>
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
							<p class="exclude">➖ 68 All simples.</p>
						</li>
						<li>
							<p><strong>Lower tiles</strong> (<em>Quan xiao</em>, <span class="fanzhong" data-src="27">全小</span>): all tiles of values 1, 2, and 3.</p>
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
							<p class="exclude">➖ 76 No honors.</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>16 fan:</h4>
					<ol>
						<li value="28">
							<p><strong>Pure straight</strong> (<em>Qing long</em>, <span class="fanzhong" data-src="28">清龙</span>): shunzi 1-2-3, 4-5-6, and 7-8-9 in the same suit.</p>
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
							<p><strong>Three-suited terminal shunzi</strong> (<em>San se shuang long hui</em>, <span class="fanzhong" data-src="29">三色双龙会</span>): two suited shunzi each of 1-2-3 and 7-8-9, and a pair of fives in the third suit.</p>
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
							<p class="exclude">➖ 63 All shunzi, 70 Mixed double shunzi, 72 Two terminal shunzi, 76 No honors.</p>
						</li>
						<li>
							<p><strong>Pure shifted shunzi</strong> (<em>Yi se san bu gao</em>, <span class="fanzhong" data-src="30">一色三步高</span>): three suited shunzi shifted up either 1 or 2 in value, but not both.</p>
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
							<p><strong>All fives</strong> (<em>Quan dai wu</em>, <span class="fanzhong" data-src="31">全带五</span>): all shunzi, kezi (gangzi) and duizi containing a five.</p>
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
							<p class="exclude">➖ 68 All simples.</p>
						</li>
						<li>
							<p><strong>Triple kezi</strong> (<em>San tong ke</em>, <span class="fanzhong" data-src="32">三同刻</span>): three kezi (gangzi) of the same value.</p>
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
							<p><strong>Three concealed kezi</strong> (<em>San an ke</em>, <span class="fanzhong" data-src="33">三暗刻</span>): three kezi (gangzi), all concealed in hand.</p>
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
							<p><strong>Lesser honors and knitted tiles</strong> (<em>Quan bu kao</em>, <span class="fanzhong" data-src="34">全不靠</span>): any single honor, plus single suited tiles partially or fully covering the special shunzi 1-4-7, 2-5-8, and 3-6-9.</p>
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
							<p class="exclude">➖ 52 All types.</p>
						</li>
						<li>
							<p><strong>Knitted straight</strong> (<em>Zuhe long</em>, <span class="fanzhong" data-src="35">组合龙</span>): three special shunzi 1-4-7, 2-5-8, and 3-6-9 in different suits.</p>
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
							<p><strong>Upper four</strong> (<em>Da yu wu</em>, <span class="fanzhong" data-src="36">大于五</span>): all tiles valued 6–9.</p>
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
							<p class="exclude">➖ 76 No honors.</p>
						</li>
						<li>
							<p><strong>Lower four</strong> (<em>Xiao yu wu</em>, <span class="fanzhong" data-src="37">小于五</span>): all tiles valued 1–4.</p>
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
							<p>Combined with <em>19. Seven pairs:</em> (24 fan)</p>
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
							<p class="exclude">➖ 76 No honors.</p>
						</li>
						<li>
							<p><strong>Big three winds</strong> (<em>San feng ke</em>, <span class="fanzhong" data-src="38">三风刻</span>): gangzi (kongzi) of three winds.</p>
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
							<p><strong>Mixed straight</strong> (<em>Hualong</em>, <span class="fanzhong" data-src="39">花龙</span>): three shunzi in different suits spanning 1–9.</p>
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
							<p><strong>Reversible tiles</strong> (<em>Tuibudao</em>, <span class="fanzhong" data-src="40">推不倒</span>): shunzi, kezi (gangzi) and duizi consisting of vertically symmetrical tiles only: dots 1234589; bamboo 245689, and white dragon.</p>
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
							<p class="exclude">➖ 75 One voided suit.</p>
						</li>
						<li>
							<p><strong>Mixed triple shunzi</strong> (<em>San se san tong shun</em>, <span class="fanzhong" data-src="41">三色三同顺</span>): three equal shunzi in each suit.</p>
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
							<p><strong>Mixed shifted kezi</strong> (<em>San se san jie gao</em>, <span class="fanzhong" data-src="42">三色三节高</span>): three kezi (gangzi) in each suit, shifted upwards in value.</p>
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
							<p><strong>Chicken hand</strong> (<em>Wu fan hu</em>, <span class="fanzhong" data-src="43">无番和</span>): hand with no regular fan value, excluding bonus tiles.</p>
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
							<p><strong>Last tile draw</strong> (<em>Miaoshou-huichun</em>, <span class="fanzhong" data-src="44">妙手回春</span>): self-draw win on the last tile in the wall.</p>
							<p class="exclude">➖ 80 Self-drawn.</p>
						</li>
						<li>
							<p><strong>Last tile claim</strong> (<em>Haidi-laoyue</em>, <span class="fanzhong" data-src="45">海底捞月</span>): winning on the last (discarded) tile in the game.</p>
						</li>
						<li>
							<p><strong>Out with replacement tile</strong> (<em>Gangshang kaihua</em>, <span class="fanzhong" data-src="46">杠上开花</span>): self-draw win after taking a tile when replacing for a gang. Does not permit intermediary flower tiles.</p>
							<p class="exclude">➖ 80 Self-drawn.</p>
						</li>
						<li>
							<p><strong>Robbing the gang</strong> (<em>Qiang gangpai</em>, <span class="fanzhong" data-src="47">抢杠和</span>): winning by taking a tile that a player uses to form a gangzi from a kezi.</p>
							<p class="exclude">➖ 58 Last tile.</p>
						</li>
						<li>
							<p><strong>Two concealed gangzi</strong> (<em>Shuang angang</em>, <span class="fanzhong" data-src="48">双暗杠</span>): having two concealed gangzi laid out. On the table:</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg" class="meld-end">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg" class="meld-end">
							</p>
							<p>On hand, waiting for character tiles 6 or 9:</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg"><br>
							</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>6 fan:</h4>
					<ol>
						<li value="49">
							<p><strong>All kezi</strong> (<em>Pengpeng hu</em>, <span class="fanzhong" data-src="49">碰碰和</span>): four kezi (gangzi) and a pair.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Half flush</strong> (<em>Hun yi se</em>, <span class="fanzhong" data-src="50">混一色</span>): tiles in one single suit and honors.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
							</p>
						</li>
						<li>
							<p><strong>Mixed shifted shunzi</strong> (<em>San se san bu gao</em>, <span class="fanzhong" data-src="51">三色三步高</span>): three shunzi in each suit, consecutively shifted up in value.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
							</p>
						</li>
						<li>
							<p><strong>All types</strong> (<em>Wu men ji</em>, <span class="fanzhong" data-src="52">五门齐</span>): each of the five sets consisting of a different type.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg" class="meld-end">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
								<img width="30" height="41" alt="🀆" src="img/tiles/zipai-jianpai-3-bai.svg">
							</p>
						</li>
						<li>
							<p><strong>Melded hand</strong> (<em>Quan qiu ren</em>, <span class="fanzhong" data-src="53">全求人</span>): every set, including the last pair, completed by melding from discarded tiles. On the table:</p>
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
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
							</p>
							<p>On hand, waiting for wanzi 8:</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
							</p>
							<p class="exclude">➖ 79 Single wait.</p>
						</li>
						<li>
							<p><strong>Two dragons kezi</strong> (<em>Shuang jianke</em>, <span class="fanzhong" data-src="54">双箭刻</span>): two kezi (gangzi) of dragon tiles.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
							</p>
							<p class="exclude">➖ 59 Dragon kezi.</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>4 fan:</h4>
					<ol>
						<li value="55">
							<p><strong>Outside hand</strong> (<em>Quan dai yao</em>, <span class="fanzhong" data-src="55">全带幺</span>): terminals included in every set.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg">
								<img width="30" height="41" alt="🀂" src="img/tiles/zipai-fengpai-3-xi.svg" class="meld-end">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
								<img width="30" height="41" alt="🀅" src="img/tiles/zipai-jianpai-2-fa.svg">
							</p>
						</li>
						<li>
							<p><strong>Fully concealed hand</strong> (<em>Bu qiu ren</em>, <span class="fanzhong" data-src="56">不求人</span>): hand with no melds, must win by self-draw.</p>
						</li>
						<li>
							<p><strong>Two melded gangs</strong> (<em>Shuang minggang</em>, <span class="fanzhong" data-src="57">双明杠</span>): two melded open gang. Angang plus minggang gives six points.</p>
						</li>
						<li>
							<p><strong>Last tile</strong> (<em>Hu juezhang</em>, <span class="fanzhong" data-src="58">和绝张</span>): winning on the last tile, discarded or in the wall.</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>2 fan:</h4>
					<ol>
						<li value="59">
							<p><strong>Dragon kezi</strong> (<em>Jianke</em>, <span class="fanzhong" data-src="59">箭刻</span>): kezi (gangzi) of dragon tiles.</p>
						</li>
						<li>
							<p><strong>Prevalent wind</strong> (<em>Quanfengke</em>, <span class="fanzhong" data-src="60">圈风刻</span>): kezi (gangzi) of wind tile corresponding to the prevalent wind.</p>
						</li>
						<li>
							<p><strong>Seat wind</strong> (<em>Menfengke</em>, <span class="fanzhong" data-src="61">门风刻</span>): kezi (gangzi) of wind tile corresponding to the seat wind.</p>
						</li>
						<li>
							<p><strong>Concealed hand</strong> (<em>Menqian qing</em>, <span class="fanzhong" data-src="62">门前清</span>): all tiles are concelaed, on table or on hand, winning by a discarded tile.</p>
						</li>
						<li>
							<p><strong>All shunzi</strong> (<em>Pinghu</em>, <span class="fanzhong" data-src="63">平和</span>): four shunzi and a suited pair.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
							</p>
							<p class="exclude">➖ 76 No honors.</p>
						</li>
						<li>
							<p><strong>Tile hog</strong> (<em>Si gui yi</em>, <span class="fanzhong" data-src="64">四归一</span>): using all four suited tiles with the same single value, excluding gangzi.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Double kezi</strong> (<em>Shuang tongke</em>, <span class="fanzhong" data-src="65">双同刻</span>): two kezi (gangzi) of the same value in different suits.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
								<img width="30" height="41" alt="🀇" src="img/tiles/shuzipai-wanzi-1.svg">
							</p>
						</li>
						<li>
							<p><strong>Two concealed kezi</strong> (<em>Shuang anke</em>, <span class="fanzhong" data-src="66">双暗刻</span>): two concealed kezi (gangzi) on hand, not melded.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
							</p>
						</li>
						<li>
							<p><strong>Concealed gang</strong> (<em>Angang</em>, <span class="fanzhong" data-src="67">暗杠</span>): self-drawn gang concealed on table.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
								<img width="30" height="41" alt="🀫" src="img/tiles/beimian.svg">
							</p>
						</li>
						<li>
							<p><strong>All simples</strong> (<em>Duanyao</em>, <span class="fanzhong" data-src="68">断幺</span>): hand without terminals.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg">
								<img width="30" height="41" alt="🀜" src="img/tiles/shuzipai-bingzi-4.svg" class="meld-end">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀈" src="img/tiles/shuzipai-wanzi-2.svg">
								<img width="30" height="41" alt="🀈" src="img/tiles/shuzipai-wanzi-2.svg">
								<img width="30" height="41" alt="🀈" src="img/tiles/shuzipai-wanzi-2.svg">
							</p>
						</li>
					</ol>
				</section>
				<section class="columns">
					<h4>1 fan:</h4>
					<ol>
						<li value="69">
							<p><strong>Pure double shunzi</strong> (<em>Yiban gao</em>, <span class="fanzhong" data-src="69">一般高</span>): containing two identical shunzi.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Mixed double shunzi</strong> (<em>Xi xiangfeng</em>, <span class="fanzhong" data-src="70">喜相逢</span>): containing two shunzi with same values but in different suits.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀟" src="img/tiles/shuzipai-bingzi-7.svg">
								<img width="30" height="41" alt="🀠" src="img/tiles/shuzipai-bingzi-8.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Short straight</strong> (<em>Lian liu</em>, <span class="fanzhong" data-src="71">连六</span>): two shunzi in the same suit making six consecutive values.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Two terminal shunzi</strong> (<em>Laoshao fu</em>, <span class="fanzhong" data-src="72">老少副</span>): two shunzi 1-2-3 and 6-7-8 in the same suit.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg">
							</p>
						</li>
						<li>
							<p><strong>Terminal kezi</strong> (<em>Yao jiu ke</em>, <span class="fanzhong" data-src="73">幺九刻</span>): kezi (gangzi) of ones, nines, or winds (dragon kezi is worth 2 points).</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
							</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
							</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
								<img width="30" height="41" alt="🀀" src="img/tiles/zipai-fengpai-1-dong.svg">
							</p>
						</li>
						<li>
							<p><strong>Melded gang</strong> (<em>Minggang</em>, <span class="fanzhong" data-src="74">明杠</span>): open gang.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
							</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="41" height="60" alt="🀒" src="img/tiles/shuzipai-tiaozi-3-d.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
							</p>
						</li>
						<li>
							<p><strong>One voided suit</strong> (<em>Que yi men</em>, <span class="fanzhong" data-src="75">缺一门</span>): hand lacking one of the three suits.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg" class="meld-end">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
							</p>
						</li>
						<li>
							<p><strong>No honors</strong> (<em>Wu zi</em>, <span class="fanzhong" data-src="76">无字</span>): hand with only suited tiles.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg">
								<img width="30" height="41" alt="🀝" src="img/tiles/shuzipai-bingzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg">
								<img width="30" height="41" alt="🀞" src="img/tiles/shuzipai-bingzi-6.svg" class="meld-end">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg">
								<img width="30" height="41" alt="🀡" src="img/tiles/shuzipai-bingzi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀌" src="img/tiles/shuzipai-wanzi-6.svg">
								<img width="30" height="41" alt="🀍" src="img/tiles/shuzipai-wanzi-7.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
							</p>
						</li>
						<li>
							<p><strong>Edge wait</strong> (<em>Bianzhang</em>, <span class="fanzhong" data-src="77">边张</span>): waiting for a 3 to form a shunzi 1-2-3, or for a 7 to form a shunzi 7-8-9. Not valid if any other tile can form a winning hand. Not valid if combined with other waits.</p>
							<p>Valid: waiting for tiaozi 7, the only tile that can form a winning hand.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀗" src="img/tiles/shuzipai-tiaozi-8.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
							</p>
							<p>Not valid: both tiaozi 3 and tiaozi 6 can make a winning hand.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg">
							</p>
							<p>Not valid: both wanzi 7 and wanzi 9 can make a winning hand.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀎" src="img/tiles/shuzipai-wanzi-8.svg">
								<img width="30" height="41" alt="🀏" src="img/tiles/shuzipai-wanzi-9.svg">
							</p>
							<p class="exclude">➖ 78 Closed wait, 79 Single wait.</p>
						</li>
						<li>
							<p><strong>Closed wait</strong> (<em>Kanzhang</em>, <span class="fanzhong" data-src="78">坎张</span>): waiting to form a shunzi from the middle value. Not valid if any other tile can form a winning hand. Not valid if combined with other waits.</p>
							<p>Valid: waiting for tiaozi 8, the only tile that can form a winning hand.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀙" src="img/tiles/shuzipai-bingzi-1.svg">
								<img width="30" height="41" alt="🀚" src="img/tiles/shuzipai-bingzi-2.svg">
								<img width="30" height="41" alt="🀛" src="img/tiles/shuzipai-bingzi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀐" src="img/tiles/shuzipai-tiaozi-1.svg">
								<img width="30" height="41" alt="🀑" src="img/tiles/shuzipai-tiaozi-2.svg">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg" class="meld-end">
								<img width="30" height="41" alt="🀖" src="img/tiles/shuzipai-tiaozi-7.svg">
								<img width="30" height="41" alt="🀘" src="img/tiles/shuzipai-tiaozi-9.svg" class="meld-end">
								<img width="30" height="41" alt="🀉" src="img/tiles/shuzipai-wanzi-3.svg">
								<img width="30" height="41" alt="🀊" src="img/tiles/shuzipai-wanzi-4.svg">
								<img width="30" height="41" alt="🀋" src="img/tiles/shuzipai-wanzi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
								<img width="30" height="41" alt="🀄︎" src="img/tiles/zipai-jianpai-1-zhong.svg">
							</p>
							<p>Not valid: both tiaozi 5 and tiaozi 2 can make a winning hand.</p>
							<p class="wrap">
								<img width="30" height="41" alt="🀒" src="img/tiles/shuzipai-tiaozi-3.svg">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀔" src="img/tiles/shuzipai-tiaozi-5.svg" class="meld-end">
								<img width="30" height="41" alt="🀓" src="img/tiles/shuzipai-tiaozi-4.svg">
								<img width="30" height="41" alt="🀕" src="img/tiles/shuzipai-tiaozi-6.svg">
							</p>
							<p class="exclude">➖ 77 Edge wait, 79 Single wait.</p>
						</li>
						<li>
							<p><strong>Single wait</strong> (<em>Dandiao jiang</em>, <span class="fanzhong" data-src="79">单调将</span>): waiting for winning tile to form a pair. Not valid if any other tile can form a winning hand. Not valid if combined with other waits.</p>
							<p class="exclude">➖ 77 Edge wait, 78 Closed wait.</p>
						</li>
						<li>
							<p><strong>Self-drawn</strong> (<em>Zimo</em>, <span class="fanzhong" data-src="80">自摸</span>): winning by tile drawn from wall.</p>
						</li>
						<li>
							<p><strong>Flower tiles</strong> (<em>Huapai</em>, <span class="fanzhong" data-src="81">花牌</span>): each bonus tile amounts to one fan when winning, counted after the hand is made. Discarded flowers do not add to the score, for instance when picking the last tile.</p>
						</li>
					</ol>
				</section>
			</main>
    `

		const fanzhong = document.getElementById('rules')
		fanzhong.addEventListener('click', (e) => {
			const target = e.target
			if (target && target.classList.contains('fanzhong')) {
				const src = target.getAttribute('data-src')
				new Audio(`snd/fanzhong/${src}.m4a`).play()
			}
		})
	}
}
