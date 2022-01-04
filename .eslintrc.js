module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:vue/essential',
		'standard'
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'vue'
	],
	rules: {
		'no-mixed-spaces-and-tabs': 0, // disable rule
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0
	}
}
