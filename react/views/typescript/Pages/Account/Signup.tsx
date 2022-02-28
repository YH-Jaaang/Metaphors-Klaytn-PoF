import React from 'react';
import { Route, Routes } from 'react-router';
import styled from 'styled-components';
import Email from './Email';
import Password from './Password';

const Signup = () => {
  return (
    <>
      <Container>
        <h2>회원가입</h2>
        <Routes>
          <Route path="/" element={<Email />} />
          <Route path="/password" element={<Password />} />
        </Routes>
      </Container>
    </>
  );
};

export default Signup;

const Container = styled.div`
  ${({ theme }) => theme.mixin.paddingSide_login}
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    ${({ theme }) => theme.mixin.textStyle.M_18}
  }
`;
