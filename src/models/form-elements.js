#!/usr/bin/env node

/**
 * @author Niklas Dougherty
 * @module form-elements
 * @property {Function} createElement Create a DOM element.
 * @property {Function} createInput Create an input element.
 * @property {Function} createLabel Create a label for an input element.
 */

const formElements = {
	createElement: function createElement(elem, classList = '', id = '', content = '') {
		const element = document.createElement(elem)

		if (classList.length) element.classList.add(...classList)
		if (id) element.setAttribute('id', id)
		if (content) element.textContent = content

		return element
	},

	createInput: function createInput(type, value = '', classList = '', id = '', required = '') {
		const element = document.createElement('input')
		element.setAttribute('type', type)

		if (value) element.setAttribute('value', value)
		if (classList.length) element.classList.add(...classList)
		if (id) element.setAttribute('id', id)
		if (required) element.setAttribute('required', 'required')

		return element
	},

	createLabel: function createLabel(textContent, attribute, classList = '', id = '') {
		const element = document.createElement('label')
		element.textContent = textContent
		element.setAttribute('for', attribute)

		if (classList.length) element.classList.add(...classList)
		if (id) element.setAttribute('id', id)

		return element
	},
}

export default formElements
