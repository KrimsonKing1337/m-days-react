import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Preset, Themes, Topics, TopicState } from '@types';

import { State, T } from './@types';

export const initialState: State = {
  popupIsActive: false,
  theme: Themes.default,
  topics: {
    [Topics.default]: {},
    [Topics.cyberpunk]: {},
    [Topics.synthwave]: {},
    [Topics.vaporwave]: {},
  },
  preset: {
    theme: Themes.default,
    images: '',
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
    setTopic(state, action: PayloadAction<{ key: Topics, state: TopicState, value: boolean}>) {
      const { key, value, state: topicState } = action.payload;

      const topicCur = state.topics[key] as T;

      topicCur[topicState] = value;
    },
    setPreset(state, action: PayloadAction<Preset>) {
      state.preset = action.payload;
    },
  },
});

export const { reducer, actions } = slice;
