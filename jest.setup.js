// Mocks esenciales
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => {};
    return Reanimated;
  });
  
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
  jest.mock('expo-font');
  jest.mock('expo-asset');
  
  // Polyfills para React 19
  global.window = {};
  global.self = global.window;