import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Gradient } from '../../Components/Button';

const FirstSignIn = () => {
  const navigate = useNavigate();

  const goCreateNft = () => {
    navigate('/account/character');
  };

  return (
    <>
      <Background></Background>
      <Container>
        <h2>로그인</h2>
        <p className="content">로그인이 완료되었습니다.</p>
        <p className="desc">
          이제 내 성격들을 고르고,
          <br />
          새로운 세계관에 몰입해보세요 .
        </p>
        <Btn_Gradient label="성격 NFT 고르기" onClick={goCreateNft} />
      </Container>
    </>
  );
};

export default FirstSignIn;

const Container = styled.div`
  height: 100vh;
  position: absolute;
  top: 0;
  width: 100%;
  ${({ theme }) => theme.mixin.paddingSide_login}
  padding-top: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    ${({ theme }) => theme.mixin.textStyle.M_18}
  }
  .content {
    ${({ theme }) => theme.mixin.textStyle.M_17}
    margin-top: 130px;
  }
  .desc {
    text-align: center;
    margin-top: 77px;
    margin-bottom: 20px;
    line-height: 1.5;
    ${({ theme }) => theme.mixin.textStyle.R_14}
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  opacity: 0.19;
  background: linear-gradient(
    180deg,
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
`;
