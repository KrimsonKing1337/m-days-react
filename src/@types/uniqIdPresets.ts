import { Themes } from './@types';

export type UniqId = {
  theme?: Themes;
  images?: string;
}

export type UniqIds = Record<string, UniqId>;

export const uniqIds: UniqIds = {
  'default': {
    theme: Themes.default,
    images: '',
  },
  'gordey-7711355ed': {
    theme: Themes.vaporwave,
    images: '',
  },
};

export function getPreset(uniqIdURLSearchParam = '') {
  const uniqIdValue = JSON.parse(uniqIdURLSearchParam);

  if (!uniqIdValue) {
    return uniqIds.default;
  }

  const preset = uniqIds[uniqIdValue];

  if (preset) {
    return preset;
  }

  return uniqIds.default;
}
