import React from 'react';
import styled from 'styled-components';
import { Btn_Modal_Black } from '../../../Components/ButtonModal';

const ModalCompleteSelling = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <ModalContainer>
      <ModalBox>
        <h4>성공적으로 거래소에 올라갔습니다.</h4>
        <Btn_Modal_Black label="확인" onClick={closeModal} />
      </ModalBox>
    </ModalContainer>
  );
};

export default ModalCompleteSelling;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 150px;
  padding: 0 24px;
  padding-top: 33px;
  h4 {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    text-align: center;
    margin-bottom: 34px;
  }
`;
