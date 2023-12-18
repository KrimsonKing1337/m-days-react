import { Preset, Themes, Topics, TopicState } from '@types';

export type T = Partial<Record<TopicState, boolean>>;

export interface State {
  popupIsActive: boolean;
  theme: Themes;
  preset: Preset;
  topics: Record<Topics, T>;
}
