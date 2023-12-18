import { RootState } from '../store';

export const selectors = {
  popupIsActive: (state: RootState) => state.main.popupIsActive,
  theme: (state: RootState) => state.main.theme,
  preset: (state: RootState) => state.main.preset,
  topics: (state: RootState) => state.main.topics,
};
