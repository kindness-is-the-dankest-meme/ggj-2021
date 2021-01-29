module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['lerna.json'],
      options: { parser: 'json-stringify' },
    },
  ],
};
