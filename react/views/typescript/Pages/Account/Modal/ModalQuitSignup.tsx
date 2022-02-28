import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Modal_Black, Btn_Modal_White } from '../../../Components/ButtonModal';

const ModalQuitSignup = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();

  const btnBackOnClick = () => {
    navigate('/account');
  };

  return (
    <ModalContainer>
      <ModalBox>
        <h4>회원가입을 중단하시겠습니까?</h4>
        <ModalBtnBox>
          <Btn_Modal_White label="예, 중단하겠습니다" onClick={btnBackOnClick} />
          <Btn_Modal_Black label="아니요, 계속 진행하겠습니다" onClick={closeModal} />
        </ModalBtnBox>
      </ModalBox>
    </ModalContainer>
  );
};

export default ModalQuitSignup;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 200px;
  padding-top: 46px;
  h4 {
    ${({ theme }) => theme.mixin.textStyle.M_15}
  }
`;

const ModalBtnBox = styled.div`
  display: grid;
  width: 222px;
  grid-row-gap: 10px;
  margin-top: 35px;
`;
