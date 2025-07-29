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
			<main class="table" id="majiang-table">
				<div class="table-grid">
					<!-- east -->
					<div class="grid-player1" id="player1">
						<div class="grid-p1-flowers tile" id="flowers1"></div>
						<div class="grid-p1-melds" id="melds1"></div>
						<div class="grid-p1-door tile" id="door1"></div>
					</div>
					<div class="grid-user1">
						<div class="grid-user1-points points" id="points1"></div>
						<div class="grid-user1-seatwind" id="seat1"></div>
					</div>

					<!-- south -->
					<div class="grid-player2" id="player2">
						<div class="grid-p2-flowers tile" id="flowers2"></div>
						<div class="grid-p2-melds" id="melds2"></div>
						<div class="grid-p2-door tile" id="door2"></div>
					</div>
					<div class="grid-user2">
						<div class="grid-user2-points points" id="points2"></div>
						<div class="grid-user2-seatwind" id="seat2"></div>
					</div>

					<!-- west -->
					<div class="grid-player3" id="player3">
						<div class="grid-p3-flowers tile" id="flowers3"></div>
						<div class="grid-p3-melds" id="melds3"></div>
						<div class="grid-p3-door tile" id="door3"></div>
					</div>
					<div class="grid-user3">
						<div class="grid-user3-points points" id="points3"></div>
						<div class="grid-user3-seatwind" id="seat3"></div>
					</div>

					<!-- north, human player -->
					<div class="grid-player4" id="player4">
						<div class="grid-p4-flowers tile" id="flowers4"></div>
						<div class="grid-p4-melds" id="melds4"></div>
						<div class="grid-p4-door tile" id="door4"></div>
					</div>
					<div class="grid-user4">
						<div class="grid-user4-points points" id="points4"></div>
						<div class="grid-user4-seatwind" id="seat4"></div>
						<img id="sort" class="sort" src="img/sort.svg" alt="↕" title="Order tiles" width="30" height="30">
					</div>

					<div class="grid-control">
						<div class="control-player1 tile" id="control-player1"></div>
						<div class="control-player2 tile" id="control-player2"></div>
						<div class="control-player3 tile" id="control-player3"></div>
						<div class="control-player4 tile" id="control-player4"></div>

						<div class="control-counter">
							<div class="control-wind1">
								<img id="prevailing1" class="wind" src="img/dong.svg" alt="东" width="1" height="1">
							</div>
							<div class="control-wind2">
								<img id="prevailing2" class="wind" src="img/nan.svg" alt="南" width="1" height="1">
							</div>
							<div class="control-wind3">
								<img id="prevailing3" class="wind" src="img/xi.svg" alt="西" width="1" height="1">
							</div>
							<div class="control-wind4">
								<img id="prevailing4" class="wind" src="img/bei.svg" alt="北" width="1" height="1">
							</div>

							<div class="control-drop1 tile" id="control-drop1"></div>
							<div class="control-drop2 tile" id="control-drop2"></div>
							<div class="control-drop3 tile" id="control-drop3"></div>
							<div class="control-drop4 tile" id="control-drop4"></div>

							<div class="control-tiles" id="tiles"></div>
						</div>
					</div>
				</div>
			</main>
    `
	}
}
