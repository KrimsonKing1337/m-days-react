import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Themes, TopicKeys } from '@enums';

import { State, Topic, TopicValue } from './@types';

export const initialState: State = {
  popupIsActive: false,
  theme: Themes.default,
  topics: {
    [TopicKeys.default]: {},
    [TopicKeys.cyberpunk]: {},
    [TopicKeys.synthwave]: {},
    [TopicKeys.vaporwave]: {},
  },
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
    setTopic(state, action: PayloadAction<TopicValue>) {
      const { key, value, variant } = action.payload;

      const topic = state.topics[key] as Topic;

      topic[variant] = value;
    },
    setPreset(state, action: PayloadAction<string>) {
      state.preset = action.payload;
    },
  },
});

export const { reducer, actions } = slice;
