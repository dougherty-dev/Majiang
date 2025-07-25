#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module router
 * @property {Function} connectedCallback Render view.
 * @property {Function} resolveRoute Determine route by hash.
 * @property {Function} render Render view.
 */

export default class Router extends HTMLElement {
	constructor() {
		super()

		this.currentRoute = ''

		this.allRoutes = {
			'': {
				view: '<home-view></home-view>',
				name: 'Home',
				icon: 'home.avif',
				alt: 'Majiang home page'
			},
			'table': {
				view: '<table-view></table-view>',
				name: 'Table',
				icon: 'table.avif',
				alt: 'Majiang table'
			},
			'rules': {
				view: '<rules-view></rules-view>',
				name: 'Rules',
				icon: 'rules.avif',
				alt: 'Majiang rules'
			},
		}
	}

	get routes() {
		return this.allRoutes
	}

	connectedCallback() {
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
		let html = '<not-found-view></not-found-view>'

		if (this.routes[this.currentRoute]) {
			html = this.routes[this.currentRoute].view
		}

		this.innerHTML = html
	}
}
