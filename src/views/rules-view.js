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
				<h3>Rules</h3>
			</main>
    `
	}
}
