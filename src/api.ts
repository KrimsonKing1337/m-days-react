import axios from 'axios';

export type getCurrentWeatherParams = {
  latitude: number;
  longitude: number;
};

export async function getCurrentWeather({ latitude, longitude }: getCurrentWeatherParams) {
  const params = {
    latitude,
    longitude,
    current_weather: true,
  };

  const result = await axios.get('https://api.open-meteo.com/v1/forecast', { params });

  return result.data;
}
