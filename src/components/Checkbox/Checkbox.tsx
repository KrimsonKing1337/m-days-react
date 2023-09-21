import { InputHTMLAttributes, PropsWithChildren } from 'react';

import styled from 'astroturf/react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const InputWrapper = styled.label`
  position: relative;
  width: 45px;
  height: 25px;
  cursor: pointer;
`;

const LabelStyled = styled.span`
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
`;

const InputStyled = styled.input`
  display: none;

  &:global {
    &:checked {
      & + .slider {
        background-color: #44cc66;

        .knob {
          left: calc(100% - 19px - 3px);
        }
      } 
    }
  }
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background-color: #ccc;
  transition: all 300ms ease;
  cursor: pointer;
`;

const Knob = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  width: calc(25px - 6px);
  height: calc(25px - 6px);
  border-radius: 50%;
  background-color: #fff;
  transition: all 300ms ease;
`;

type Generic = InputHTMLAttributes<PropsWithChildren<unknown>>;

export const Checkbox = ({ children }: Generic) => {
  return (
    <Wrapper>
      <LabelStyled>
        {children}
      </LabelStyled>

      <InputWrapper>
        <InputStyled type="checkbox" />

        <Slider className="slider">
          <Knob className="knob" />
        </Slider>
      </InputWrapper>
    </Wrapper>
  );
};
