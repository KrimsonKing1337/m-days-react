import axios from 'axios';

export function getBg() {
  const searchParams = new URLSearchParams(window.location.search);

  const topics = searchParams.get('topics');
  const imagesVariant = searchParams.get('imagesVariant');
  const preset = searchParams.get('preset');

  const reqParams = {
    topics,
    imagesVariant,
    preset,
  };

  return axios.get('/bg', {
    responseType: 'blob',
    params: reqParams,
  });
}
