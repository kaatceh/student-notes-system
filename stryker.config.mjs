export default {
  testRunner: 'jest',
  packageManager: 'npm',
  reporters: ['clear-text', 'progress'],
  coverageAnalysis: 'off',
  mutate: ['src/services/**/*.js', 'src/repositories/**/*.js'],

  jest: {
    projectType: 'custom',
  },
};
