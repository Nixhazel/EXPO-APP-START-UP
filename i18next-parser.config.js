/**
 * Options for the i18next package.
 * All options found https://github.com/i18next/i18next-parser#options
 */
module.exports = {
  createOldCatalogs: false,
  defaultNamespace: 'common',
  defaultValue: (_, __, key) => {
    return key;
  },
  input: ['./src/**/*.{js,jsx,ts,tsx}'],
  keySeparator: false,
  lexers: {
    js: [{ lexer: 'JavascriptLexer', functions: ['t', 'trans'] }],
    jsx: [{ lexer: 'JsxLexer', functions: ['t', 'trans'] }],
    ts: [{ lexer: 'JavascriptLexer', functions: ['t', 'trans'] }],
    tsx: [{ lexer: 'JsxLexer', functions: ['t', 'trans'] }],
    default: [{ lexer: 'JavascriptLexer', functions: ['t', 'trans'] }],
  },
  locales: ['en'],
  namespaceSeparator: false,
  output: 'src/locales/$LOCALE-$NAMESPACE.json',
  sort: true,
  verbose: true,
  i18nextOptions: {
    compatibilityJSON: 'v3',
  },
};
