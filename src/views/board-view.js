#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module board-view
 * @property {Function} connectedCallback Render view.
 */

export default class BoardView extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<header>
				<h2>戆嘟麻将</h2>
			</header>
			<main class="board">
				<div class="board-grid">

					<div class="grid-player1">
						<div class="player1-grid">
							<div class="grid-p1-flowers tile r0">
								<img src="img/tiles/huapai-sjie-1-chun.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/huapai-sijunzi-3-ju.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="grid-p1-melds tile r0">
								<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="grid-p1-tiles tile r0">
								<img src="img/tiles/zipai-jianpai-1-zhong.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/zipai-jianpai-1-zhong.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/zipai-jianpai-1-zhong.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/zipai-jianpai-2-fa.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/zipai-jianpai-2-fa.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/zipai-jianpai-2-fa.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-bingzi-2.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-bingzi-4.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-bingzi-8.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-bingzi-9.svg" alt="🀄︎" width="1" height="1">
							</div>
						</div>
					</div>
					<div class="grid-points1">
						<span class="points" id="points1">130</span>
					</div>

					<div class="grid-player2">
						<div class="player2-grid">
							<div class="grid-p2-flowers tile r90">
								<img src="img/tiles/huapai-sijunzi-2-lan.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/huapai-sjie-4-dong.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="grid-p2-tiles tile r90">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="grid-p2-melds tile r90">
								<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-tiaozi-6.svg" alt="🀄︎" width="1" height="1" class="meld-end">
								<img src="img/tiles/shupaizi-wanzi-9.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-wanzi-9.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-wanzi-9.svg" alt="🀄︎" width="1" height="1">
							</div>
						</div>
					</div>
					<div class="grid-points2">
						<span class="points" id="points2">-50</span>
					</div>

					<div class="grid-player3">
						<div class="player3-grid">
							<div class="grid-p3-tiles tile r180">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="grid-p3-melds tile r180">
							</div>
							<div class="grid-p3-flowers tile r180">
								<img src="img/tiles/huapai-sijunzi-3-ju.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/huapai-sjie-1-chun.svg" alt="🀄︎" width="1" height="1">
							</div>
						</div>
					</div>
					<div class="grid-points3">
						<span class="points" id="points3">110</span>
					</div>

					<div class="grid-player4">
						<div class="player4-grid">
							<div class="grid-p4-flowers tile r270">
								<img src="img/tiles/huapai-sijunzi-4-zhu.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/huapai-sjie-2-xia.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="grid-p4-melds tile r270">
								<img src="img/tiles/shupaizi-bingzi-1.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-bingzi-2.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/shupaizi-bingzi-3.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="grid-p4-tiles tile r270">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
								<img src="img/tiles/beimian.svg" alt="🀄︎" width="1" height="1">
							</div>
						</div>
					</div>
					<div class="grid-points4">
						<span class="points" id="points4">20</span>
					</div>

					<div class="grid-control">
						<div class="control-player1 tile r0">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-5.svg" alt="🀄︎" width="1" height="1">
						</div>
						<div class="control-player2 tile r90">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-6.svg" alt="🀄︎" width="1" height="1">
						</div>
						<div class="control-player3 tile r180">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-6.svg" alt="🀄︎" width="1" height="1">
						</div>
						<div class="control-player4 tile r270">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-tiaozi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-5.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-6.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-bingzi-4.svg" alt="🀄︎" width="1" height="1">
							<img src="img/tiles/shupaizi-wanzi-5.svg" alt="🀄︎" width="1" height="1">
						</div>
						<div class="control-counter">
							<div class="control-wind1">
								<img class="wind" src="img/dong.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="control-wind2">
								<img class="wind" src="img/bei.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="control-wind3">
								<img class="wind" src="img/xi.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="control-wind4">
								<img class="wind" src="img/nan.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="control-tiles">112</div>
						</div>
					</div>
				</div>
			</main>
    `
	}
}
