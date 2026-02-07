import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  hasSeenOnboarding: boolean;
};

const initialState: AppState = {
  hasSeenOnboarding: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHasSeenOnboarding(state, action: PayloadAction<boolean>) {
      state.hasSeenOnboarding = action.payload;
    },
  },
});

export const { setHasSeenOnboarding } = appSlice.actions;
export default appSlice.reducer;
