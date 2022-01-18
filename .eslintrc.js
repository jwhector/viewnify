/* eslint-disable linebreak-style */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node:true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		// 'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-prototype-builtins': 'off',
		'react/no-unescaped-entities': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-useless-escape': 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'react/prop-types': [0]
	}
};
