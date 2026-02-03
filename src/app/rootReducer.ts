import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '../store/slices/themeSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
