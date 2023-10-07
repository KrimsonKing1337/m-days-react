import { useMemo, useState } from 'react';
import Select, { SingleValue, Theme } from 'react-select';

import styled from 'astroturf/react';

import { getTzAreas, getTzItemByArea, preparedForSelect } from '../utils';

import './TimezonePicker.scss';

const SelectWrapper = styled.div`
  border-radius: 4px;
  margin-top: 15px;
  color: #fff !important;
  
  &:nth-child(1) {
    margin-top: 0;
  }

  &:global {
    &.error {
      border: 1px red solid;
    }
  }
`;

export type Option = {
  value: string;
  label: string;
};

export type Errors = {
  chosenArea: boolean;
  chosenItem: boolean;
};

export type TimezonePickerProps = {
  setTzChosenArea: (value: string) => void;
  setTzChosenItem: (value: string) => void;
  errors: Errors;
};

export const TimezonePicker = ({
  setTzChosenArea,
  setTzChosenItem,
  errors,
}: TimezonePickerProps) => {
  const areas = useMemo(() => getTzAreas(), []);
  const areasForSelect = useMemo(() => preparedForSelect(areas), [areas]);

  const [items, setItems] = useState<Option[]>([]);

  const [chosenArea, setChosenArea] = useState('');
  const [, setChosenItem] = useState('');

  const selectAreaChangeHandler = (option: SingleValue<Option>) => {
    const value = option?.value as string;

    setChosenArea(value);
    setTzChosenArea(value);

    const newItems = getTzItemByArea(value);
    const newItemsPrepared = preparedForSelect(newItems);

    setItems(newItemsPrepared);
  };

  const selectTzChangeHandler = (option: SingleValue<Option>) => {
    const value = option?.value as string;

    setChosenItem(value);
    setTzChosenItem(value);
  };

  const chosenAreaClassNames = errors.chosenArea ? 'error' : '';
  const chosenItemClassNames = errors.chosenItem ? 'error' : '';

  const themeForSelect = (theme: Theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary25: '#666',
      primary: '#666',
      neutral0: 'black',
    },
  });

  return (
    <div>
      <SelectWrapper className={chosenAreaClassNames}>
        <Select
          theme={themeForSelect}
          options={areasForSelect}
          placeholder="Choose an area"
          isSearchable
          onChange={selectAreaChangeHandler}
        />
      </SelectWrapper>

      {!!chosenArea && (
        <SelectWrapper className={chosenItemClassNames}>
          <Select
            theme={themeForSelect}
            options={items}
            placeholder="Choose an item"
            isSearchable
            onChange={selectTzChangeHandler}
          />
        </SelectWrapper>
      )}
    </div>
  );
};
