module.exports = {
  plugins: [
    "import",
    "react-hooks",
    "unicorn",
    "@typescript-eslint",
  ],
  settings: {
    "react": {
      version: "18.0.0",
    },
    "import/external-module-folders": ["node_modules", ".yarn"],
    "import/parsers": {
      "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: "client/tsconfig.json",
      },
    },
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:unicorn/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [{
    files: [
      ".*rc.js",
      "*.config.js",
      "*.conf.js",
      "*.test.js",
    ],
    rules: {
      "unicorn/prefer-module": "off",
    },
  }],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  rules: {
    // Plugin Rules
    "react/prop-types": "off",
    "prefer-const": ["warn"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

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
    "@typescript-eslint/no-use-before-define": ["error"],
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
    // "import/no-unresolved": [
    //   "error",
    //   {
    //     ignore: ["^@react-types/shared$"],
    //   },
    // ],

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

    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: [/react-app-env.d.ts/],
      },
    ],
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-null": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-object-from-entries": "off",
    "unicorn/prefer-export-from": "off",
    "unicorn/no-negated-condition": "off",
  },
};