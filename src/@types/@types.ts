import type { UniqId } from './uniqIdPresets';

export enum Themes {
  'default' = 'default',
  'vaporwave' = 'vaporwave',
}

export type Preset = UniqId;

export enum Topics {
  'default' = 'default',
  'vaporwave' = 'vaporwave',
  'synthwave' = 'synthwave',
  'cyberpunk' = 'cyberpunk',
}

export type TopicState = 'static' | 'dynamic';

export type TopicAvailableStates = Record<Topics, TopicState[]>;
