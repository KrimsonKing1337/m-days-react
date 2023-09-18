import styled from 'astroturf/react';

import { Link } from '../Link';

const Wrapper = styled.div`
  width: 210px;
`;

const Img = styled.img`
  width: 100%;
  height: 302px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
  margin-top: 15px;
`;

export type MemberProps = {
  imgSrc: string;
  firstName: string;
  lastName: string;
  href: string;

  className?: string;
};

export const Member = ({
  imgSrc,
  firstName,
  lastName,
  href,
  className,
}: MemberProps) => {
  return (
    <Wrapper className={className}>
      <Link href={href}>
        <Img src={imgSrc} alt="" />
      </Link>

      <Name>
        <Link href={href}>
          {firstName}
          <br />
          {lastName}
        </Link>
      </Name>
    </Wrapper>
  );
};
