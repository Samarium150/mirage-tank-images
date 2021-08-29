module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        "@vue/standard",
        "@vue/typescript/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        indent: ["error", 4, { SwitchCase: 1 }],
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": ["warn", {
            singleline: { max: 2, allowFirstLine: true },
            multiline: { max: 1, allowFirstLine: false }
        }],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "space-before-function-paren": 0
    }
};
