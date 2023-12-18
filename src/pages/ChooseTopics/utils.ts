import { TopicAvailableStates, Topics } from '@types';

export const topicAvailableStates: TopicAvailableStates = {
  [Topics.default]: ['static'],
  [Topics.cyberpunk]: ['static', 'dynamic'],
  [Topics.synthwave]: ['static', 'dynamic'],
  [Topics.vaporwave]: ['static', 'dynamic'],
};
