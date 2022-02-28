import React from 'react';
import styled from 'styled-components';
import { IBtn } from '../Store/Type/Interfaces';

export const Btn_Primary = ({ onClick, label }: IBtn) => {
  return <Primary onClick={onClick}>{label}</Primary>;
};

export const Btn_Primary_FontBlack = ({ onClick, label }: IBtn) => {
  return <Primary_FontBlack onClick={onClick}>{label}</Primary_FontBlack>;
};

export const Btn_White = ({ onClick, label }: IBtn) => {
  return <White onClick={onClick}>{label}</White>;
};

export const Btn_Black = ({ onClick, label }: IBtn) => {
  return <Black onClick={onClick}>{label}</Black>;
};

export const Btn_Gray = ({ onClick, label }: IBtn) => {
  return <Gray onClick={onClick}>{label}</Gray>;
};

export const Btn_Gradient = ({ onClick, label }: IBtn) => {
  return <Gradient onClick={onClick}>{label}</Gradient>;
};

const Common = styled.button`
  ${({ theme }) => theme.mixin.flexCenter}
  ${({ theme }) => theme.mixin.textStyle.M_16}
  border-radius: 6px;
  width: 100%;
  height: 38px;
`;

const Primary = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.highlight_color};
  color: ${({ theme }) => theme.variable.colors.A_FFF};
`;

const Primary_FontBlack = styled(Primary)`
  color: ${({ theme }) => theme.variable.colors.black_color};
`;

const White = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.A_FFF};
  color: ${({ theme }) => theme.variable.colors.black_color};
`;

const Black = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.black_color};
  color: ${({ theme }) => theme.variable.colors.A_FFF};
`;

const Gray = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.btngray_color};
  color: ${({ theme }) => theme.variable.colors.A_FFF};
`;

const Gradient = styled(Common)`
  background: linear-gradient(
    90deg,
    #2844cf -10%,
    #4678d0 24%,
    #44e09c 85%,
    #41a485 126%,
    #41a384 127%,
    #3a0848 155%,
    #3a0848 155%,
    #9963cf 156%,
    #81088a 156%
  );
  color: ${({ theme }) => theme.variable.colors.A_FFF};
  ${({ theme }) => theme.mixin.textStyle.M_18}
  height: 48px;
`;
