import { RootState } from '../store';

export const selectors = {
  popupIsActive: (state: RootState) => state.main.popupIsActive,
  theme: (state: RootState) => state.main.theme,
};
