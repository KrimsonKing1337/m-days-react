import { configureStore } from '@reduxjs/toolkit';

import { mainReducer } from './main';

const reducer = {
  main: mainReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
