import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"
import eslintPluginPrettier from "eslint-plugin-prettier"
import globals from "globals"

export default [
  {
    ignores: ["node_modules/**", "dist/**", ".next/**"]
  },
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      prettier: eslintPluginPrettier
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "avoid",
          trailingComma: "none",
          semi: false,
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          singleQuote: false,
          bracketSpacing: true,
          jsxBracketSameLine: true,
          jsxSingleQuote: false,
          endOfLine: "auto"
        }
      ],
      "no-undef": "error",
      "no-unused-vars": "warn",
      "no-console": "error"
      // Thêm các rule khác nếu muốn
    }
  }
]
