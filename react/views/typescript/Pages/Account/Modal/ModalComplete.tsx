import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Modal_Black } from '../../../Components/ButtonModal';

const ModalComplete = ({ email }: { email: string }) => {
  const navigate = useNavigate();

  const goSignin = () => {
    navigate('/account');
  };

  return (
    <ModalContainer>
      <ModalBox>
        <h4>
          다음의 메일 주소로
          <br />
          계정이 생성되었습니다.
        </h4>
        <span className="email">{email}</span>
        <Btn_Modal_Black label="로그인 하러 가기" onClick={goSignin} />
      </ModalBox>
    </ModalContainer>
  );
};

export default ModalComplete;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 193px;
  padding: 0 24px;
  padding-top: 35px;
  h4 {
    ${({ theme }) => theme.mixin.textStyle.M_15}
    text-align: center;
    line-height: 1.5;
  }
  .email {
    ${({ theme }) => theme.mixin.textStyle.M_13}
    margin-top: 13px;
    margin-bottom: 25px;
  }
`;
