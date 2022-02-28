import React from 'react';
import styled from 'styled-components';
import { IBtn } from '../Store/Type/Interfaces';

export const Btn_Modal_Primary = ({ onClick, label }: IBtn) => {
  return <Primary onClick={onClick}>{label}</Primary>;
};

export const Btn_Modal_White = ({ onClick, label }: IBtn) => {
  return <White onClick={onClick}>{label}</White>;
};

export const Btn_Modal_Black = ({ onClick, label }: IBtn) => {
  return <Black onClick={onClick}>{label}</Black>;
};

export const Btn_Modal_Inactive = ({ onClick, label }: IBtn) => {
  return <Inactive onClick={onClick}>{label}</Inactive>;
};

const Common = styled.button`
  ${({ theme }) => theme.mixin.flexCenter}
  ${({ theme }) => theme.mixin.textStyle.M_16}
  border-radius: 15px;
  width: 100%;
  height: 40px;
`;

const Primary = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.highlight_color};
  color: ${({ theme }) => theme.variable.colors.A_FFF};
`;
const White = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.A_FFF};
  color: ${({ theme }) => theme.variable.colors.black_color};
`;
const Black = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.black_color};
  color: ${({ theme }) => theme.variable.colors.A_FFF};
`;
const Inactive = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.btn_inactive_color};
  color: ${({ theme }) => theme.variable.colors.A_FFF};
`;
