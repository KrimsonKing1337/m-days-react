import { useEffect, useState } from 'react';

import styled from 'astroturf/react';
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from 'm-days-core/api';
import { getCurrentPosition, getSrcOfWeatherIcon } from 'm-days-core/utils';
import { Themes } from '@enums';

import type { WeatherResp } from 'm-days-core/@types';

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 12px;
  opacity: 0.65;
`;

const Value = styled.div`
  font-family: "Avenir LT Std 35 Light Oblique";
  font-size: 38px;
  color: #fff;
  
  &:global {
    &.themeVaporwave {
      font-family: 'Digital-Cyrillic';
    }
  }
`;

const IconWrapper = styled.div`
  height: 64px;
  width: 64px;
  
  img {
    width: 100%;
  }
`;

export type WeatherProps = {
  theme?: Themes;
};

export const Weather = ({ theme = Themes.default }: WeatherProps) => {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates | null>(null);
  const [weather, setWeather] = useState<WeatherResp | null>(null);

  useEffect(() => {
    getCurrentPosition({
      successCb: (pos) => setGeolocation(pos.coords),
      errorCb: () => setGeolocation(null),
    });
  }, []);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    const updateWeather = async () => {
      const { latitude, longitude } = geolocation;

      const weather = await getCurrentWeather({ latitude, longitude });

      await getHourlyWeather({ latitude, longitude });
      await getDailyWeather({ latitude, longitude });

      // await getYandexWeather();

      setWeather(weather);
    };

    updateWeather();

    const interval = setInterval(() => {
      updateWeather();
    }, 900000); // each 15 minutes

    return () => {
      clearInterval(interval);
    };
  }, [geolocation]);

  if (!weather || !weather.current_weather) {
    return null;
  }

  const { temperature, weathercode, is_day } = weather.current_weather;

  const temperatureIsNotSubZero = temperature > 0;
  const signNearTheTemperature = temperatureIsNotSubZero ? '+' : '-';
  const temperaturePrepared = temperatureIsNotSubZero ? temperature : temperature.toString().substring(1);

  let value = `${signNearTheTemperature} ${temperaturePrepared} °C`;

  if (theme === Themes.vaporwave) {
    value = `${signNearTheTemperature}${temperaturePrepared}°C`; // without spaces
  }

  const iconSrc = getSrcOfWeatherIcon(weathercode, is_day);
  const iconSrcReady = `icons/weather/${iconSrc}`;

  const valueClassName = theme === Themes.vaporwave ? 'themeVaporwave' : '';

  return (
    <Wrapper>
      {iconSrc && (
        <IconWrapper>
          <img src={iconSrcReady} alt="" />
        </IconWrapper>
      )}

      <Value className={valueClassName}>
        {value}
      </Value>
    </Wrapper>
  );
};
