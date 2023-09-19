import { useDispatch, useSelector } from 'react-redux';

import styled from 'astroturf/react';

import { mainActions, mainSelectors } from 'store/main';

//#region styles
const Button = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  cursor: pointer;
  display: block;
  overflow: hidden;
  width: 44px;
  height: 32px;
`;

const Helper = styled.span`
  display: block;
  position: absolute;
  top: 15px;
  left: 6px;
  right: 6px;
  height: 1px;
  background: rgba(#fff, 1);
  transition: background ease 0.3s 0s;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    width: 100%;
    height: 1px;
    background: #fff;
    transition: all ease 0.3s 0s;
  }

  &:before {
    top: -9px;
  }

  &:after {
    bottom: -9px;
  }

  &:global {
    &.isActive {
      background: rgba(#fff, 0);

      &:before {
        top: 0;
        transform: rotate(45deg);
      }

      &:after {
        bottom: 0;
        transform: rotate(-45deg);
      }
    }
  }
`;
//#endregion styles

export const MenuBtn = () => {
  const dispatch = useDispatch();

  const popupIsActive = useSelector(mainSelectors.popupIsActive);

  const buttonClickHandler = () => {
    dispatch(mainActions.setPopupIsActive(!popupIsActive));
  };

  const className = popupIsActive ? 'isActive' : '';

  return (
    <Button type="button" onClick={buttonClickHandler}>
      <Helper className={className} />
    </Button>
  );
};
