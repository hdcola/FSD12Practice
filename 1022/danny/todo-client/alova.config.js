module.exports = {
  generator: [
    {
      input: './openapi.yaml',
      output: './src/api',
      type: 'ts',
    },
  ],
};
