#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module majiang
 */

import {BEIMIAN, HUAPAI, ZIPAI, BINGZI, TIAOZI, WANZI, TILES} from './tiles.js'
console.log(BEIMIAN, HUAPAI, ZIPAI, BINGZI, TIAOZI, WANZI, TILES)

const majiang = {
	playGame: function playGame() {
		let tiles = [...TILES, ...BEIMIAN]
		tiles.sort(() => Math.random() - 0.5)

		const main = document.getElementsByTagName('main')[0]

		tiles.forEach(element => {
			const img = document.createElement('img')
			img.src = `img/tiles/${element[5]}.svg`
			img.alt = element[4]
			img.width = 50
			main.appendChild(img)
		})

	}
}

export default majiang
