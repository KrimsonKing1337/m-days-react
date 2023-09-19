import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from './@types';

export const initialState: State = {
  popupIsActive: false,
};

const slice = createSlice({
  name: '@main',
  initialState,
  reducers: {
    setPopupIsActive(state, action: PayloadAction<boolean>) {
      state.popupIsActive = action.payload;
    },
  },
});

export const { reducer, actions } = slice;
