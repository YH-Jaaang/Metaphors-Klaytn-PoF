import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Modal_Black, Btn_Modal_White } from '../../../Components/ButtonModal';

const ModalCompleteBuying = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();
  return (
    <ModalContainer>
      <ModalBox>
        <h4>
          구입이 완료되었어요!
          <br />
          인벤토리에서 확인해보세요!
        </h4>
        <Btn_Container>
          <Btn_Modal_White label="거래소 돌아가기" onClick={closeModal} />
          <Btn_Modal_Black
            label="인벤토리 바로가기"
            onClick={() => {
              navigate('/inventory');
            }}
          />
        </Btn_Container>
      </ModalBox>
    </ModalContainer>
  );
};

export default ModalCompleteBuying;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 194px;
  padding: 0 30px;
  padding-top: 46px;
  h4 {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    text-align: center;
    margin-bottom: 40px;
    line-height: 1.3;
  }
`;

const Btn_Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 15px;
  > button {
    ${({ theme }) => theme.mixin.textStyle.R_12}
  }
`;
