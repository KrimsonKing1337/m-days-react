import { Themes, TopicKeys } from '@enums';

import { TopicVariantValue } from '@types';

export type TopicVariant = Record<TopicVariantValue, boolean>;

export type Topic = Partial<TopicVariant>;

export interface State {
  popupIsActive: boolean;
  theme: Themes;
  preset?: string;
  topics: Record<TopicKeys, Topic>;
}

export type TopicValue = {
  key: TopicKeys;
  variant: TopicVariantValue;
  value: boolean;
}
