#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/game
 */

import { VERSION } from '../config.js'

const MAJIANGGAME = 'Majiang_game'

function jsonToBase64(jsonObject) {
	const jsonString = JSON.stringify(jsonObject)
	const encoder = new TextEncoder()
	const utf8Bytes = encoder.encode(jsonString)
	const binaryString = String.fromCharCode(...utf8Bytes)
	return btoa(binaryString)
}

function base64ToJson(base64String) {
	const binaryString = atob(base64String)
	const utf8Bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0))
	const decoder = new TextDecoder()
	const jsonString = decoder.decode(utf8Bytes)
	return JSON.parse(jsonString)
}

export function fetchGame() {
	let game = null
	const storedGame = localStorage.getItem(MAJIANGGAME)

	if (storedGame) {
		try {
			game = base64ToJson(storedGame)
			if (game && game.version != VERSION) {
				localStorage.removeItem(MAJIANGGAME)
				game = null
			}
		} catch (e) {
			console.log(e)
			game = null
		}
	}

	return game
}

export async function saveGame(game) {
	localStorage.setItem(MAJIANGGAME, jsonToBase64(game))
}
