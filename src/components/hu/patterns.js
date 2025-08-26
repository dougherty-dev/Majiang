#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/hu/patterns
 */

export const TYPES = {b: '', t: '', w: '', f: '', j: ''}

export const DUIZI = /(\d)\1{1}/g
export const KEZI = /(\d)\1{2}/g
export const GANGZI = /(\d)\1{3}/g

export const HALFSHUNZI = /(12|23|34|45|56|67|78|89)/g
export const SHUNZI = /(123|234|345|456|567|678|789)/g

export const LIANQIDUI = /(11223344556677|22334455667788|33445566778899)/g
