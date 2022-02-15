module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        'eslint:recommended',
//        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "indent": ["off", 4],
        "semi": [
            "off"
        ],
        "vue/no-multiple-template-root": ["off"],
        "vue/no-unused-components": ["warn"],
        // vetur.validation.template: off (disable VSCode editor error)
        "vue/valid-v-for": "off",
        "vue/require-v-for-key": "off",
        // "vue/no-invalid-v-for": "off",
        "no-empty": "warn",
        "no-unused-vars": "warn"
    }
};
