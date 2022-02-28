import React from 'react';
import styled from 'styled-components';
import { Btn_Modal_Black } from '../../../Components/ButtonModal';

const ModalFailCreate = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <ModalContainer>
      <ModalBox>
        <h4>
          발행량이 초과되어
          <br />
          획득에 실패했어요.
        </h4>
        <Btn_Container>
          <Btn_Modal_Black label="돌아가기" onClick={closeModal} />
        </Btn_Container>
      </ModalBox>
    </ModalContainer>
  );
};

export default ModalFailCreate;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 193px;
  padding: 0 54px;
  padding-top: 40px;
  h4 {
    ${({ theme }) => theme.mixin.textStyle.M_18}
    line-height: 1.5;
    text-align: center;
    margin-bottom: 30px;
  }
`;

const Btn_Container = styled.div`
  display: grid;
  width: 100%;
`;
