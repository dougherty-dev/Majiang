#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/game
 * @description Routines for storing game data in local storage.
 * @property {function} jsonToBase64 Convert JSON to base64.
 * @property {function} base64ToJson Convert base64 to JSON.
 * @property {function} fetchGame Retrieve game data from local storage.
 * @property {function} saveGame Save game data to local storage.
 */

import { VERSION } from '../config.js'

const MAJIANGGAME = 'Majiang_game'

/**
 * Convert JSON to base64.
 * @param {jsonObject} jsonObject Game data in JSON format.
 * @returns {string}
 */
function jsonToBase64(jsonObject) {
	const jsonString = JSON.stringify(jsonObject)
	const encoder = new TextEncoder()
	const utf8Bytes = encoder.encode(jsonString)
	const binaryString = String.fromCharCode(...utf8Bytes)
	return btoa(binaryString)
}

/**
 * Convert base64 to JSON.
 * @param {string} base64String 
 * @returns {jsonObject}
 */
function base64ToJson(base64String) {
	const binaryString = atob(base64String)
	const utf8Bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0))
	const decoder = new TextDecoder()
	const jsonString = decoder.decode(utf8Bytes)
	return JSON.parse(jsonString)
}

/**
 * Retrieve game data from local storage.
 * @returns {object}
 */
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

/**
 * Save game data to local storage.
 * @param {object} game 
 */
export async function saveGame(game) {
	localStorage.setItem(MAJIANGGAME, jsonToBase64(game))
}
