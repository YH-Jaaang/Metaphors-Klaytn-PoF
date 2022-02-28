import React from 'react';
import styled from 'styled-components';
import { IAccountBtn } from '../../Store/Type/Interfaces';

export const BtnGoBack = ({ label, onClick }: IAccountBtn) => {
  return <BtnStyle onClick={onClick}>{label}</BtnStyle>;
};

export const BtnGoForward = ({ label, onClick }: IAccountBtn) => {
  return <BtnStyle onClick={onClick}>{label}</BtnStyle>;
};

const BtnStyle = styled.button`
  background-color: transparent;
  border: none;
  ${({ theme }) => theme.mixin.textStyle.R_13}
`;
