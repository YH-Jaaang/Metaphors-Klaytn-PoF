import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Primary } from '../../Components/Button';
import ModalWrong from './Modal/ModalWrong';
import { InputEmail, InputPassword } from './Inputs';
import { postSignin } from '../../Api';
import { useRecoilState } from 'recoil';
import { isSigninAtom, userInfoAtom, changeAssetToggleAtom } from '../../Store/Atoms';

const Signin = () => {
  const [isWrongModalRender, setIsWrongModalRender] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignin, setIsSignin] = useRecoilState(isSigninAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [changeAssetToggle, setChangeAssetToggle] = useRecoilState(changeAssetToggleAtom);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsWrongModalRender(false);
  };

  const doSignin = () => {
    // 로그인 클릭 시,
    try {
      // 1. 로그인 post 요청
      postSignin(email, password).then((res) => {
        // 2. 로그인 성공 시, isSign -> true, userInfo 업데이트
        if (res.result === 'ok') {
          setIsSignin(true);
          setUserInfo({ ...res.content });
          setChangeAssetToggle((prev) => !prev);
          // 3. 닉네임 비어있을 시, 성격 만들기. 아니면 홈으로 이동
          if (res.content.nickname === '') {
            navigate('/account/firstsignin');
          } else {
            navigate('/');
          }
        } else {
          // 2.1 로그인 실패 시, 실패 모달 랜더링
          setIsWrongModalRender(true);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container>
        <h2>로그인</h2>
        <InputContainer>
          <InputEmail
            setState={(value) => {
              setEmail(value);
            }}
          />
          <InputPassword
            setState={(value) => {
              setPassword(value);
            }}
          />
        </InputContainer>
        <Btn_Primary label="로그인" onClick={doSignin} />
        <p className="signin">
          Metaphors의 계정이 없다면, 지금{' '}
          <span
            onClick={() => {
              navigate('/account/signup');
            }}
          >
            회원가입
          </span>{' '}
          하기
        </p>
      </Container>
      {isWrongModalRender && <ModalWrong closeModal={closeModal} />}
    </>
  );
};

export default Signin;

const Container = styled.div`
  ${({ theme }) => theme.mixin.paddingSide_login}
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    ${({ theme }) => theme.mixin.textStyle.M_18}
  }
  .signin {
    margin-top: 15px;
    ${({ theme }) => theme.mixin.textStyle.R_13}
    span {
      color: ${({ theme }) => theme.variable.colors.highlight_color};
      text-decoration: underline;
    }
  }
`;

const InputContainer = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 200px;
  display: grid;
  grid-template-rows: 60px auto;
  align-items: start;
  .container_input {
    position: relative;
    .password_guide {
      ${({ theme }) => theme.mixin.textStyle.R_11}
      margin-top: 10px;
      padding-left: 5px;
    }
  }
`;
