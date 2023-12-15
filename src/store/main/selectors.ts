import { RootState } from '../store';

export const selectors = {
  popupIsActive: (state: RootState) => state.main.popupIsActive,
  theme: (state: RootState) => state.main.theme,
  preset: (state: RootState) => state.main.preset,
  image: (state: RootState) => state.main.image,
  nextImage: (state: RootState) => state.main.nextImage,
};
