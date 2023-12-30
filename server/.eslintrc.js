module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // Plugin Rules
    "@typescript-eslint/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
    "@typescript-eslint/consistent-type-imports": ["warn"],
    "@typescript-eslint/indent": [
      "warn", 2, {
        SwitchCase: 1,
        ignoredNodes: [
          // Ignore multi-line generics in function calls.
          "CallExpression > TSTypeParameterInstantiation.typeParameters",
          // Ignore multi-line union types
          "TSUnionType",
        ],
      },
    ],
    "@typescript-eslint/member-delimiter-style": ["warn"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-multiple-empty-lines": ["warn", { max: 3, maxEOF: 0 }],

    // Import Rules
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/first": ["error"],
    "import/newline-after-import": ["warn", { count: 3 }],
    "import/no-absolute-path": ["error"],
    "import/no-mutable-exports": ["error"],
    // "import/no-relative-parent-imports": ["error"],
    "import/no-useless-path-segments": ["error"],
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external",
      ],
      "newlines-between": "always",
      "alphabetize": {
        order: "asc",
        orderImportKind: "asc",
        caseInsensitive: true,
      },
    }],

    // Default auto-fix rules
    "arrow-parens": ["warn", "always"],
    "block-spacing": ["warn", "always"],
    "comma-dangle": ["warn", "always-multiline"],
    "curly": ["warn", "all"],
    "jsx-quotes": ["warn", "prefer-double"],
    "no-multi-spaces": ["off"],
    "object-curly-spacing": ["warn", "always", { objectsInObjects: true, arraysInObjects: true }],
    "padded-blocks": ["warn", "never"],
    "padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "function", next: "*" },
    ],
    "quote-props": ["warn", "consistent-as-needed"],
    "quotes": ["warn", "double"],
    "space-before-blocks": ["warn", "always"],
    "semi": ["warn", "always"],

    // Default non-auto-fix rules
    "max-len": ["error", { code: 120, ignoreStrings: true, ignoreComments: true }],
    "no-tabs": "error",
  },
};