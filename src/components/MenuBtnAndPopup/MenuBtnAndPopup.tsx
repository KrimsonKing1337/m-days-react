import { useLocation } from 'react-router';

import { MenuBtn } from 'components/MenuBtn';
import { Popup } from 'components/Popup';

export const MenuBtnAndPopup = () => {
  const { pathname } = useLocation();

  if (pathname === '/standalone') {
    return null;
  }

  return (
    <>
      <MenuBtn />
      <Popup />
    </>
  );
};
