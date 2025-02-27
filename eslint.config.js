import antfu from "@antfu/eslint-config";

export default antfu({
  // Or customize the stylistic rules
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },

  // TypeScript and Vue are autodetected, you can also explicitly enable them:
  typescript: {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  react: true,
  yaml: false,
  markdown: false,
  jsonc: false,

  lessOpinionated: true,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    "**/fixtures",
    "patches/**",
  ],
});
