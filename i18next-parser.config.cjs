module.exports = {
  defaultNamespace: 'translation',
  lexers: {
    tsx: ['JsxLexer'],
    ts: ['JavascriptLexer'],
  },
  locales: ['en', 'uk'],
  output: 'src/i18n/locales/$LOCALE.json',
  input: [
    'src/app/**/*.{js,jsx,ts,tsx}',
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/domains/**/*.{js,jsx,ts,tsx}',
  ],
  keySeparator: false,
  namespaceSeparator: false,
  createOldCatalogs: false,
  indentation: 2,
  sort: true,
  skipDefaultValues: (locale) => locale !== 'en',
  defaultValue: (locale, namespace, key) => (locale === 'en' ? key : ''),
};
