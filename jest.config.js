module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./testSetup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
