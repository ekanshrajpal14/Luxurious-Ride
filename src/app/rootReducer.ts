import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../store/slices/themeSlice';
// import authReducer from './authPersist';
import appReducer from '../store/slices/appSlice';
import { persistedAuthReducer } from './authPersist';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: persistedAuthReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
