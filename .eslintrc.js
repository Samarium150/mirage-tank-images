module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2020
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": ["warn", {
            "singleline": { "max": 2, "allowFirstLine": true},
            "multiline": {"max": 1, "allowFirstLine": false}
        }],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "space-before-function-paren": 0,
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    }
};
