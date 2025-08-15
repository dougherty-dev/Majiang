#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/patterns
 */

export const TYPES = {b: '', t: '', w: '', f: '', j: ''}

export const DUIZI = /(\d)\1{1}/g
export const KEZI = /(\d)\1{2}/g

export const HALFSHUNZI = /(12|23|34|45|56|67|78|89)/g
export const SHUNZI = /(123|234|345|456|567|678|789)/g

export const SHUNZIX3 =   /(111222333|222333444|333444555|444555666|555666777|666777888|777888999)/g
export const SHIFTEDAX3 = /(122333445|233444556|344555667|455666778|566777889)/g
export const SHIFTEDBX3 = /(123345567|234456678|345567789)/g

export const SHUNZIX4 =   /(111122223333|222233334444|333344445555|444455556666|555566667777|666677778888|777788889999)/g

export const LIANQIDUI = /(11223344556677|22334455667788|33445566778899)/g
