import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../store/slices/themeSlice';
import authReducer from '../store/slices/authSlice';
import appReducer from '../store/slices/appSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
