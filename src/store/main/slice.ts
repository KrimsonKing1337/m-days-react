import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Themes } from '@types';

import { State } from './@types';

export const initialState: State = {
  popupIsActive: false,
  theme: Themes.default,
};

const slice = createSlice({
  name: '@main',
  initialState,
  reducers: {
    setPopupIsActive(state, action: PayloadAction<boolean>) {
      state.popupIsActive = action.payload;
    },
    setTheme(state, action: PayloadAction<Themes>) {
      state.theme = action.payload;
    },
  },
});

export const { reducer, actions } = slice;
