#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module home-view
 * @property {Function} connectedCallback Render view.
 */

export default class HomeView extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<header>
				<h2>Majiang</h2>
			</header>
			<main class="home middle">
				<button id="new-game">New game</button>
			</main>
    `
	}
}
