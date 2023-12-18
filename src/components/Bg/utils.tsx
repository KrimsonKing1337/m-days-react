import { getBg } from 'api';
import { Themes } from '@enums';

import { ProgressBarVaporwave } from '../ProgressBarVaporwave';
import { ProgressBar } from '../ProgressBar';

export const fetchImage = async () => {
  const image = await getBg();

  return URL.createObjectURL(image.data);
};

export const getProgressBarComponent = (theme: Themes) => {
  if (theme === Themes.vaporwave) {
    return (
      <ProgressBarVaporwave />
    );
  }

  return (
    <ProgressBar />
  );
};
