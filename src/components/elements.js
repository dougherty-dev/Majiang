#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module components/elements
 * @property {Function} createElement Create a DOM element.
 */

export function createElement(elem, classList = '', content = '', id = '') {
	const element = document.createElement(elem)

	if (classList.length) element.classList.add(...classList)
	if (id) element.setAttribute('id', id)
	if (content) element.textContent = content

	return element
}
