import { TopicAvailableVariants, TopicKeys } from '@types';

export const topicAvailableStates: TopicAvailableVariants = {
  [TopicKeys.default]: ['static'],
  [TopicKeys.cyberpunk]: ['static', 'dynamic'],
  [TopicKeys.synthwave]: ['static', 'dynamic'],
  [TopicKeys.vaporwave]: ['static', 'dynamic'],
};
