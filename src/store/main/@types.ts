import { Preset, Themes } from '@types';

export interface State {
  popupIsActive: boolean;
  theme: Themes;
  preset: Preset;
  image: string;
  nextImage: string;
}
