import { TopicKeys } from '../@enums/@enums';

export type TopicVariantValue = 'static' | 'dynamic';

export type TopicAvailableVariants = Record<TopicKeys, TopicVariantValue[]>;
