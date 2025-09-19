export default {
    testEnvironment: "jsdom",
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest'
    },
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/test/__mocks__/fileMock.js'
    },
    testMatch: [
      '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/src/**/__test__/**/*.{js,jsx,ts,tsx}'
    ]
  };
  