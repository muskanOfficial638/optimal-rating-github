module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    // Your custom rules here
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Disable TS rules if needed
      },
    },
  ],
};
