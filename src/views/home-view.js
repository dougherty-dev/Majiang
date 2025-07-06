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
				<h2>Hem</h2>
			</header>
			<main class="center">
				<h3>Hem</h3>
			</main>
    `
	}
}
