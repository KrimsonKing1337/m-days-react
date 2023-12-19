import { useDispatch, useSelector } from 'react-redux';

import { Themes } from '@enums';

import { selectors } from 'store/main/selectors';
import { actions } from 'store/main/slice';

import { LinkButton } from 'components/LinkButton';

export type ThemeProps = {
  label: Themes;
};

export const Theme = ({ label }: ThemeProps) => {
  const dispatch = useDispatch();

  const currentTheme = useSelector(selectors.theme);

  const clickHandler = () => {
    dispatch(actions.setTheme(label));
  };

  const isChecked = currentTheme === label;

  return (
    <LinkButton isChecked={isChecked} onClick={clickHandler}>
      {label}
    </LinkButton>
  );
};
