import imgs from 'img_bg.json';
import { randomInt } from 'm-days-core/utils/randomInt';

export function getRandomImgPath() {
  const random = randomInt(0, imgs.length);

  return `img_bg/1920/${imgs[random]}`;
}
