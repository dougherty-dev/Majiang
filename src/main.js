#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module main
 * @description Import custom modules, routing, navigation.
 * Instantiate the Majiang class.
 */

import Majiang from './models/majiang.js'

import Router from './router.js'
import Navigation from './navigation.js'

import HomeView from './views/home-view.js'
import NotFoundView from './views/not-found-view.js'
import BoardView from './views/board-view.js'
import RulesView from './views/rules-view.js'

customElements.define('router-outlet', Router)
customElements.define('navigation-outlet', Navigation)

customElements.define('home-view', HomeView)
customElements.define('not-found-view', NotFoundView)
customElements.define('board-view', BoardView)
customElements.define('rules-view', RulesView)

new Majiang()
