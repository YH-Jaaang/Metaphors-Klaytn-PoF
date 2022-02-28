import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import ModalComplete from './Modal/ModalComplete';
import { BtnGoBack, BtnGoForward } from './Buttons';
import { InputPassword, InputPasswordAgain } from './Inputs';
import { useRecoilState } from 'recoil';
import { signupAtom } from '../../Store/Atoms';
import { postSignup } from '../../Api';

const Password = () => {
  const [isCompleteModalRender, setIsCompleteModalRender] = useState(false);
  const [password, setPassword] = useState('');
  const [againPassword, setAgainPassword] = useState('');
  const [signup, setSignup] = useRecoilState(signupAtom);
  const [createdEmail, setCreatedEmail] = useState('');

  const navigate = useNavigate();

  const onGoBackClick = () => {
    navigate('/account/signup');
  };

  const onGoForwardClick = () => {
    // 비밀번호 조건이 갖춰지면
    // 1. recoil state에 비밀번호 업데이트
    if (password === againPassword && password.length > 7 && password.length < 17) {
      setSignup({ ...signup, password: password });
    }
  };

  useEffect(() => {
    if (signup.password.length > 0 && signup.email.length > 0) {
      try {
        // 2. 회원가입 post
        postSignup(signup.email, signup.password).then((res) => {
          if (res) {
            // 3. 회원가입 모달 띄우기
            setIsCompleteModalRender(true);
            setCreatedEmail(res.content.email);
          }
        });
      } catch (e) {
        console.log('error!!', e);
      }
    }
  }, [signup]);

  return (
    <>
      <InputContainer>
        <InputPassword
          setState={(value) => {
            setPassword(value);
          }}
        />
        <InputPasswordAgain
          setState={(value) => {
            setAgainPassword(value);
          }}
          isExternalWrong={password !== againPassword}
        />
      </InputContainer>
      <BtnContainer>
        <BtnGoBack label="이전" onClick={onGoBackClick} />
        <BtnGoForward label="완료하기" onClick={onGoForwardClick} />
      </BtnContainer>
      {isCompleteModalRender && <ModalComplete email={createdEmail} />}
    </>
  );
};

export default Password;

const InputContainer = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 200px;
  display: grid;
  grid-template-rows: 100px auto;
  align-items: start;
  position: relative;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const BtnStyle = styled.button`
  background-color: transparent;
  border: none;
  ${({ theme }) => theme.mixin.textStyle.R_13}
`;
