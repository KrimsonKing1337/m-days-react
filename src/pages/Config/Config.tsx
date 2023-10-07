import { useEffect, useState } from 'react';

import { saveAs } from 'file-saver';
import styled from 'astroturf/react';

import { Input } from 'components/Input';
import { Checkbox } from 'components/Checkbox';

import { Errors, TimezonePicker } from './TimezonePicker';
import { getValuesForConfigFile } from './utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Button = styled.button`
  margin: 35px auto 0;
  border: 1px #fff solid;
  color: #fff;
  border-radius: 28px;
  display: block;
  font-size: 16px;
  height: 56px;
  max-width: 300px;
  width: 100%;
  transition: box-shadow 250ms;

  &:hover {
    box-shadow: 0 0 12px 4px rgba(255, 255, 255, 0.3);
  }
`;

const Label = styled.div`
  font-family: 'Avenir LT Std 35 Light Oblique';
  font-size: 24px;
  margin-top: 15px;
  color: #fff;
  line-height: 1.3;
`;

const Desc = styled.div`
  font-family: 'Avenir LT Std 35 Light Oblique';
  font-size: 15px;
  font-style: italic;
  margin-top: 8px;
  color: #fff;
`;

const FormWrapper = styled.div`
  margin-top: 32px;
`;

type InputErrors = {
  wiFiLogin: boolean;
  wiFiPass: boolean;
  tz: Errors;
};

const inputErrorsDefault = {
  wiFiLogin: false,
  wiFiPass: false,
  tz: {
    chosenArea: false,
    chosenItem: false,
  },
};

export const Config = () => {
  const [wiFiLogin, setWiFiLogin] = useState('');
  const [wiFiPass, setWiFiPass] = useState('');

  const [tzChosenArea, setTzChosenArea] = useState('');
  const [tzChosenItem, setTzChosenItem] = useState('');

  const [tzAuto, setTzAuto] = useState(true);
  const [gps, setGps] = useState(true);

  const [inputErrors, setInputErrors] = useState<InputErrors>(inputErrorsDefault);

  const setInputErrorByKey = (key: keyof InputErrors, value: boolean | Errors) => {
    setInputErrors({
      ...inputErrors,
      [key]: value,
    });
  };

  useEffect(() => {
    setInputErrorByKey('tz', {
      chosenArea: false,
      chosenItem: false,
    });
  }, [tzAuto]);

  const wiFiLoginInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setWiFiLogin(value);
  };

  const wiFiPassInputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setWiFiPass(value);
  };

  const onGpsSwitchChange = () => {
    setGps((prevState) => !prevState);
  };

  const onTzSwitchChange = () => {
    setTzAuto((prevState) => !prevState);
  };

  const buttonClickHandler = async () => {
    setInputErrors(inputErrorsDefault);

    const tzErrors: Errors = {
      chosenArea: !tzChosenArea,
      chosenItem: !tzChosenItem,
    };

    const errors = {
      wiFiLogin: !wiFiLogin,
      wiFiPass: !wiFiPass,
      tz: tzErrors,
    };

    setInputErrors(errors);

    const includesErrorsFlat = Object.values(errors).includes(true);
    const tzHasError = !tzAuto && (errors.tz.chosenArea || errors.tz.chosenItem);

    if (includesErrorsFlat || tzHasError) {
      return;
    }

    const configFileValues = getValuesForConfigFile({
      wiFiLogin,
      wiFiPass,
      gps,
      tzAuto,
      tz: tzChosenItem,
    });

    const blob = new Blob(configFileValues, { type: 'text/plain;charset=utf-8' });

    saveAs(blob, 'md-config.txt');
  };

  return (
    <Wrapper>
      <div>
        <Label>
          It's a page for generate configuration file for your md-device.
          <br />
          Please, insert here wi-fi, gps and timezone config
        </Label>

        <Desc>
          (Don't worry: We don't submit any info from this form.
          You can even generate the file with disabled Internet).
        </Desc>

        <Desc style={{ marginTop: '15px' }}>
          Warning: without GPS I can't show your current weather (for now)
        </Desc>

        <FormWrapper>
          <Input
            required
            error={inputErrors.wiFiLogin}
            onChange={wiFiLoginInputChangeHandler}
            onKeyDown={() => setInputErrorByKey('wiFiLogin', false)}
          >
            Wi-Fi login
          </Input>

          <Input
            required
            error={inputErrors.wiFiPass}
            onChange={wiFiPassInputChangeHandler}
            onKeyDown={() => setInputErrorByKey('wiFiPass', false)}
          >
            Wi-Fi pass
          </Input>

          <Checkbox defaultChecked={gps} onChange={onGpsSwitchChange}>
            GPS?
          </Checkbox>

          <Checkbox defaultChecked={tzAuto} onChange={onTzSwitchChange}>
            Auto Timezone? (Recommended)
          </Checkbox>

          {!tzAuto && (
            <div style={{ marginTop: '50px' }}>
              <TimezonePicker
                errors={inputErrors.tz}
                setTzChosenArea={setTzChosenArea}
                setTzChosenItem={setTzChosenItem}
              />
            </div>
          )}

          <Button onClick={buttonClickHandler}>
            Generate config file
          </Button>
        </FormWrapper>
      </div>
    </Wrapper>
  );
};
