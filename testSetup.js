import dotenv from 'dotenv';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

dotenv.config({ path: './.env.test' });
