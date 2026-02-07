import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../store/slices/authSlice';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['accessToken',"isExistingUser"], // persist
};

export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authReducer,
);
