#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module views/home-view
 * @property {Function} connectedCallback Render view.
 */

export default class HomeView extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<header>
				<h2>Majiang</h2>
			</header>
			<main class="home middle">
				<button class="new-game" id="play">Play</button>
			</main>
    `
	}
}
