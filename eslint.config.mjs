import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		languageOptions: { globals: globals.browser }
	},
	pluginJs.configs.recommended,
	{
		rules: {
			'indent': ['error', 'tab'],
			'no-unused-vars': 'error',
			'no-undef': 'error',
			'quotes': ['error', 'single'],
			'strict': 'warn',
			semi: ['error', 'never'],
			'no-return-assign': ['error', 'except-parens'],
			'space-before-function-paren': ['error', 'never']
		}
	},
	{
		ignores: ['.build/']
	}
]
