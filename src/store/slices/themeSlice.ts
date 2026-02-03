import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
}

const systemTheme = Appearance.getColorScheme();

const initialState: ThemeState = {
  mode: systemTheme === 'dark' ? 'dark' : 'light',
};


export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleTheme: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, toggleTheme } = counterSlice.actions;

export default counterSlice.reducer;
