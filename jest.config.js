/** @type {import("jest").Config} */
const config = {
  testEnvironment: 'jsdom',
  //   globalSetup: './jest-setup.js',
  //   globalTeardown: './jest-teardown.js',
  //   testEnvironment: 'node',
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  // },
  //   setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  verbose: true,
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  //   collectCoverageFrom: [
  //     '**/*.{js,jsx}',
  //     '!**/node_modules/**',
  //     '!**/vendor/**',
  //   ],
  //   moduleNameMapper: {
  //     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //       '<rootDir>/__tests__/fileTest.js',
  //     '\\.(css|scss)$': '<rootDir>/__tests__/styleTest.js',
  //   },
};

export default config;
