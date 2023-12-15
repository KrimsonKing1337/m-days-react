import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Preset, Themes } from '@types';

import { State } from './@types';

export const initialState: State = {
  popupIsActive: false,
  theme: Themes.default,
  preset: {
    theme: Themes.default,
    images: '',
  },
  image: '',
  nextImage: '',
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
    setPreset(state, action: PayloadAction<Preset>) {
      state.preset = action.payload;
    },
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setNextImage(state, action: PayloadAction<string>) {
      state.nextImage = action.payload;
    },
  },
});

export const { reducer, actions } = slice;
