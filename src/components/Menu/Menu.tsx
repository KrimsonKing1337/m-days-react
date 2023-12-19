import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'astroturf/react';

import { mainActions } from 'store/main';

import { links } from './utils';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  margin-bottom: 25px;

  a {
    display: block;
  }
`;

const Logo = styled.div`
  width: 150px;
  height: 150px;
  text-align: center;
  margin: 0 auto 20px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 48px;
  margin: 0 auto 30px;
`;

const Item = styled.div`
  text-align: center;
  font-size: 24px;
  line-height: 1.2;
  margin: 30px auto 0;

  &:nth-child(1) {
    margin-top: 0;
  }
`;

export const Menu = () => {
  const dispatch = useDispatch();

  const linkClickHandler = (label: string) => {
    if (label === 'Config') {
      localStorage.setItem('theme', '');
      localStorage.setItem('topics', '');
    }

    dispatch(mainActions.setPopupIsActive(false));
  };

  return (
    <Wrapper>
      <Logo>
        <img src="/img/logo.png" alt="" />
      </Logo>

      <Title>
        Monochrome days
      </Title>

      <div>
        <Item>
          Photo project for bwlovers. Our website
          <br />
          displays the percentage of days passed this year
          <br />
          accompanied with best author&apos;s photos.
        </Item>

        <Item>
          {links.map((linkCur) => {
            const { to, label } = linkCur;

            return (
              <Link key={label} to={to} onClick={() => linkClickHandler(label)}>
                {label}
              </Link>
            );
          })}
        </Item>
      </div>
    </Wrapper>
  );
};
