import { type Config } from "prettier";

const config: Config = {
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  jsxSingleQuote: false,
  printWidth: 120,
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrder: [
    "<TYPES>^(react|react-router)$",
    "^(react/(.*)$)|^(react$)",
    "<TYPES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>^@?types",
    "<TYPES>^[./]",
    "",
    "^.*lib/(.*)$",
    "^.*hooks/(.*)$",
    "^.*data/(.*)$",
    "",
    "^.*components/ui/(.*)$",
    "^.*components/(.*)$",
    "",
    "\\.(css|scss|less)$",
    "",
    "^.*app/(.*)$",
    "",
    "^[./]",
  ],
};

export default config;
