module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['lerna.json', 'tsconfig.json'],
      options: { parser: 'json-stringify' },
    },
  ],
};
