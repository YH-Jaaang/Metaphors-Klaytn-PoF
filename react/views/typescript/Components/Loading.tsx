import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <h2>Loading...</h2>
    </Container>
  );
};

export default Loading;

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000000;
  ${({ theme }) => theme.mixin.flexCenter}
  background-color: rgba(29, 29, 29, 0.8);
  backdrop-filter: blur(5px);
  h2 {
    ${({ theme }) => theme.mixin.textStyle.B_17}
  }
`;
