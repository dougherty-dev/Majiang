#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/elements
 * @property {function} createElement Create a DOM element.
 */

/**
 * Create a DOM element.
 * @param {string} elem The HTML element to create.
 * @param {object} classList Array of classes to apply to the element.
 * @param {string} content Text content of element.
 * @param {string} id ID to apply to the element.
 * @returns {HTMLElement}
 */
export function createElement(elem, classList = '', content = '', id = '') {
	const element = document.createElement(elem)

	if (classList.length) element.classList.add(...classList)
	if (id) element.setAttribute('id', id)
	if (content) element.textContent = content

	return element
}
