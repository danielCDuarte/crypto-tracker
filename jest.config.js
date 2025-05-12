module.exports = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|react-native-reanimated|react-native-gesture-handler))'
    ],
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      '<rootDir>/jest.setup.js'
    ],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^react-native$': 'react-native-web',
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    }
  };