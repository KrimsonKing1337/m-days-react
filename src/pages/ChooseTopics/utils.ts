import { TopicKeys } from '@enums';

import { TopicAvailableVariants } from '@types';

export const topicAvailableVariants: TopicAvailableVariants = {
  [TopicKeys.default]: ['static'],
  [TopicKeys.cyberpunk]: ['static', 'dynamic'],
  [TopicKeys.synthwave]: ['static', 'dynamic'],
  [TopicKeys.vaporwave]: ['static', 'dynamic'],
};
