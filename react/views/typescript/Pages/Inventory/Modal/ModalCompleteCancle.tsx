import React from 'react';
import styled from 'styled-components';
import { Btn_Modal_Black } from '../../../Components/ButtonModal';

interface props {
  closeModal: any;
  item: any;
}

const ModalCompleteCancle = ({ closeModal, item }: props) => {
  return (
    <ModalContainer>
      <ModalBox>
        <h4>
          [{item.name}]의 판매가 취소되어
          <br />
          거래소에서 내려갔습니다.
        </h4>
        <Btn_Modal_Black label="확인" onClick={closeModal} />
      </ModalBox>
    </ModalContainer>
  );
};

export default ModalCompleteCancle;

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
    margin-bottom: 18px;
    line-height: 1.3;
  }
`;
