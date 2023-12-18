import type { UniqId } from './uniqIdPresets';

export enum Themes {
  'default' = 'default',
  'vaporwave' = 'vaporwave',
}

export type Preset = UniqId;

export enum TopicKeys {
  'default' = 'default',
  'vaporwave' = 'vaporwave',
  'synthwave' = 'synthwave',
  'cyberpunk' = 'cyberpunk',
}

export type TopicVariantValue = 'static' | 'dynamic';

export type TopicAvailableVariants = Record<TopicKeys, TopicVariantValue[]>;
