import { InputHTMLAttributes, PropsWithChildren } from 'react';

import styled from 'astroturf/react';

const Wrapper = styled.div`
  position: relative;
`;

const InputStyled = styled.input`
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  width: 100%;
  background: transparent;
  transition: border-bottom-color 250ms;
  
  &:global {
    &.error {
      border-color: red;
      
      + label {
        color: red !important;
      }
    }
  }
  
  &:focus + label,
  &:valid + label {
    top: -20px;
    left: 0;
    color: #999;
    font-size: 12px;
  }
`;

const LabelStyled = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: top 500ms, color 250ms;
`;

type Generic = InputHTMLAttributes<PropsWithChildren<unknown>>;

export type InputProps = Generic & {
  error?: boolean;
}

export const Input = ({ error = false, children, ...rest }: InputProps) => {
  const inputClassName = error ? 'error' : '';

  return (
    <Wrapper>
      <InputStyled className={inputClassName} {...rest} />

      <LabelStyled>
        {children}
      </LabelStyled>
    </Wrapper>
  );
};
