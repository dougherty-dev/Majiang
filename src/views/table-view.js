#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module table-view
 * @property {Function} connectedCallback Render view.
 */

export default class BoardView extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<header>
				<h2>麻将桌</h2>
			</header>
			<main class="table">
				<div class="table-grid">

					<div class="grid-player1" id="player1">
						<div class="grid-p1-flowers tile r0" id="flowers1"></div>
						<div class="grid-p1-melds tile r0" id="melds1"></div>
						<div class="grid-p1-tiles tile r0" id="tiles1"></div>
					</div>
					<div class="grid-points1">
						<span class="points" id="points1">0</span>
					</div>

					<div class="grid-player2" id="player2">
						<div class="grid-p2-flowers tile r270" id="flowers2"></div>
						<div class="grid-p2-melds tile r270" id="melds2"></div>
						<div class="grid-p2-tiles tile r270" id="tiles2"></div>
					</div>
					<div class="grid-points2">
						<span class="points" id="points2">0</span>
					</div>

					<div class="grid-player3" id="player3">
						<div class="grid-p3-flowers tile r180" id="flowers3"></div>
						<div class="grid-p3-melds tile r180" id="melds3"></div>
						<div class="grid-p3-tiles tile r180" id="tiles3"></div>
					</div>
					<div class="grid-points3">
						<span class="points" id="points3">0</span>
					</div>

					<div class="grid-player4" id="player4">
						<div class="grid-p4-flowers tile r90" id="flowers4"></div>
						<div class="grid-p4-melds tile r90" id="melds4"></div>
						<div class="grid-p4-tiles tile r90" id="tiles4"></div>
					</div>
					<div class="grid-points4">
						<span class="points" id="points4">0</span>
					</div>

					<div class="grid-control">
						<div class="control-player1 tile r0" id="control-player1"></div>
						<div class="control-player2 tile r270" id="control-player2"></div>
						<div class="control-player3 tile r180" id="control-player3"></div>
						<div class="control-player4 tile r90" id="control-player4"></div>
						<div class="control-counter">
							<div class="control-wind1">
								<img class="wind" src="img/dong.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="control-wind2">
								<img class="wind" src="img/nan.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="control-wind3">
								<img class="wind" src="img/xi.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="control-wind4">
								<img class="wind" src="img/bei.svg" alt="🀄︎" width="1" height="1">
							</div>
							<div class="control-tiles" id="tiles">144</div>
						</div>
					</div>
				</div>
			</main>
    `
	}
}
