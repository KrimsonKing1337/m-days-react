import { useState } from 'react';

import { saveAs } from 'file-saver';
import styled from 'astroturf/react';

import { getValuesForConfigFile } from './utils';

const Button = styled.button`
  margin-top: 20px;
  background: #fff;
`;

type InputErrors = {
  wiFiLogin: boolean;
  wiFiPass: boolean;
  tz: boolean;
};

const inputErrorsDefault = {
  wiFiLogin: false,
  wiFiPass: false,
  tz: false,
};

export const Config = () => {
  const [wiFiLogin, setWiFiLogin] = useState('');
  const [wiFiPass, setWiFiPass] = useState('');
  // const [tz, setTz] = useState('Moscow');
  const [tz] = useState('Moscow');
  const [tzAuto, setTzAuto] = useState(true);
  const [gps, setGps] = useState(true);

  const [inputErrors, setInputErrors] = useState<InputErrors>(inputErrorsDefault);

  const wiFiLoginInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setWiFiLogin(value);
  };

  const wiFiPassInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setWiFiPass(value);
  };

  const setInputErrorByKey = (key: keyof InputErrors, value: boolean) => {
    setInputErrors({
      ...inputErrors,
      [key]: value,
    });
  };

  const onGpsSwitchChange = () => {
    setGps((prevState) => !prevState);
  };

  const onTzSwitchChange = () => {
    setTzAuto((prevState) => !prevState);
  };

  const buttonClickHandler = async () => {
    setInputErrors(inputErrorsDefault);

    const tzHasError = !tzAuto && !tz;

    const errors = {
      wiFiLogin: !wiFiLogin,
      wiFiPass: !wiFiPass,
      tz: tzHasError,
    };

    setInputErrors(errors);

    if (Object.values(errors).includes(true)) {
      return;
    }

    const configFileValues = getValuesForConfigFile({
      wiFiLogin,
      wiFiPass,
      gps,
      tz,
      tzAuto,
    });

    const blob = new Blob(configFileValues, { type: 'text/plain;charset=utf-8' });

    saveAs(blob, 'md-config.txt');
  };

  return (
    <div>
      <div>
        Insert here wi-fi, gps and timezone config
      </div>

      <div>
        Warning: without GPS I can't show your current weather (for now)
      </div>

      <div>
        <div>
          Wi-Fi login
        </div>

        <input
          placeholder="Wi-Fi login"
          onChange={wiFiLoginInputChangeHandler}
          onKeyDown={() => setInputErrorByKey('wiFiLogin', false)}
        />
      </div>

      <div>
        <div>
          Wi-Fi pass
        </div>

        <input
          placeholder="Wi-Fi pass"
          onChange={wiFiPassInputChangeHandler}
          onKeyDown={() => setInputErrorByKey('wiFiPass', false)}
        />
      </div>

      <div>
        <div>
          GPS?
        </div>

        <input
          type="checkbox"
          onChange={onGpsSwitchChange}
        />
      </div>

      <div>
        <div>
          Auto Timezone? (Recommended)?
        </div>

        <input
          type="checkbox"
          onChange={onTzSwitchChange}
        />
      </div>

      <Button onClick={buttonClickHandler}>
        Generate config file
      </Button>
    </div>
  );
};
