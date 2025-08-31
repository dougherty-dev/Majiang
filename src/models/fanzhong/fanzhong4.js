#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module models/fanzhong/fanzhong4
 * @description 4 番 (fan) scoring rules.
 * @property {function} fz55QuanDaiYao 55. Outside hand (Quan dai yao, 全带幺).
 * @property {function} fz56BuQiuRen 56. Fully concealed hand (Bu qiu ren, 不求人).
 * @property {function} fz57ShuangMinggang 57. Two melded gangs (Shuang minggang, 双明杠).
 * @property {function} fz58HuJuezhang 58. Last of its kind (Hu juezhang, 和绝张).
 */

import { SHU } from '../tiles.js'

const FZ4 = 4
const FZ2 = 2

/**
 * ✅ 55. Outside hand (Quan dai yao, 全带幺).
 * Terminals included in every set.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 4.
 * 19. Qi dui covered in 18. Hun yao jiu, with 55 excluded.
 */
export async function fz55QuanDaiYao(struct) {
	if (struct.derivedSets.length) {
		const sets = struct.derivedSets.filter(item => item[1] && SHU.includes(item[0]))
			.map(item => item[1]).flat().filter(item => /[19]/.test(item))

		return (sets.length === 5) ? FZ4 : 0
	}

	const patterns = [
		'11', '99', '111', '123', '789', '999', '11123', '11199', '11789', '11999', '12399',
		'78999', '111123', '111789', '111999', '112233', '123789', '123999', '778899',
		'789999', '11112233', '11112399', '11123789', '11123999', '11178999', '11223399',
		'11778899', '11789999', '12378999', '77889999', '111123789', '111123999', '111222333',
		'111778899', '111789999', '112233789', '112233999', '123778899', '123789999',
		'777888999', '11112233789', '11112233999', '11112378999', '11122233399', '11123778899',
		'11123789999', '11177889999', '11223378999', '11777888999', '12377889999', '111122223333',
		'111123778899', '111123789999', '111222333789', '111222333999', '111777888999',
		'112233778899', '112233789999', '123777888999', '777788889999', '11112222333399',
		'11112233778899', '11112233789999', '11112377889999', '11122233378999', '11123777888999',
		'11223377889999', '11777788889999'
	]

	const shuTypes = struct.shuTypes14.filter(item => item[1])
	const noYao = shuTypes.filter(item => !patterns.includes(item[1]))

	return (noYao.length) ? 0 : FZ4
}

/**
 * ✅ 56. Fully concealed hand (Bu qiu ren, 不求人).
 * Hand with no melds, must win by self-draw.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 4.
 */
export async function fz56BuQiuRen(struct) {
	return (
		struct.game.players[struct.key].melds.length === 0 &&
		struct.game.players[struct.key].zimo
	) ? FZ4 : 0
}

/**
 * ✅ 57. Two melded gangs (Shuang minggang, 双明杠).
 * Two melded open gang. Angang plus minggang gives six points.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0, 4 or 6.
 */
export async function fz57ShuangMinggang(struct) {
	if (struct.angangMelds.length === 1 && struct.gangMelds.length === 1) return FZ4 + FZ2

	return (struct.angangMelds.length === 0 && struct.gangMelds.length === 2) ? FZ4 : 0
}

/**
 * ✅ 58. Last of its kind (Hu juezhang, 和绝张).
 * Winning on the last (fourth) tile of its kind.
 * @param {object} struct Game parameters.
 * @returns {promise<number>} 0 or 4.
 */
export async function fz58HuJuezhang(struct) {
	// Hupai = discard or self-draw, 1 tile
	const hupai = struct.game.hupai

	// Same tiles on floor or in melded sets.
	const tiles = struct.game.openTiles.filter(item => item[2] === hupai[2])

	// Same tiles in door. Don’t count hupai twice for zimo.
	let door = Object.assign([], struct.game.players[struct.key].door)
	if (struct.game.players[struct.key].zimo) door.pop()

	const find = door.filter(item => item[7] === hupai[7] && item[1] === hupai[1])

	return (tiles.length + find.length === 3) ? FZ4 : 0
}
