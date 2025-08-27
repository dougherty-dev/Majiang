#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module navigation
 * @property {Function} connectedCallback Render view.
 * @property {Function} resolveRoute Determine route by hash.
 * @property {Function} render Render view.
 */

import Router from './router.js'

export default class Navigation extends HTMLElement {
	constructor() {
		super()

		this.router = new Router()
	}

	async connectedCallback() {
		window.addEventListener('hashchange', () => {
			this.resolveRoute()
		})

		this.resolveRoute()
	}

	resolveRoute() {
		const cleanHash = location.hash.replace('#', '')
		this.currentRoute = cleanHash

		this.render()
	}

	render() {
		const routes = this.router.routes

		let navigationLinks = ''
		let active
		let hash

		for (let path in routes) {
			if (routes[path].hidden) {
				continue
			}

			active = path === this.currentRoute ? 'active' : 'inactive'
			hash = '#'

			navigationLinks += `
				<span class="${active} center">
				<a class="navtext" href="${hash}${path}">
					<img src="img/${routes[path].icon}" width="22" height="22" alt="${routes[path].alt}"><br>
					<span class="small">${routes[path].name}</span>
				</a>
				<a class="navicon" href="${hash}${path}" title="${routes[path].name}">
					<img src="img/${routes[path].icon}" width="35" height="35" alt="${routes[path].alt}">
				</a>
				</span>
			`
		}

		this.innerHTML = `<nav>${navigationLinks}</nav>`
	}
}
