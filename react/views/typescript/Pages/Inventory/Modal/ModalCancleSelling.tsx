import React, { useState } from 'react';
import styled from 'styled-components';
import { Btn_Modal_Black, Btn_Modal_White } from '../../../Components/ButtonModal';
import Icon_x from '../../../Assets/Images/Icon_x.png';
import { useNavigate } from 'react-router';
import { sellItemsCancel } from '../../../Api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, inventoryTriggerAtom } from '../../../Store/Atoms';
import Loading from '../../../Components/Loading';

interface props {
  closeModal: any;
  item: any;
}

const ModalCancleSelling = ({ closeModal, item }: props) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [inventoryTrigger, setInventoryTrigger] = useRecoilState(inventoryTriggerAtom);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ModalContainer>
        <ModalBox>
          <img src={Icon_x} alt="close button" className="close_btn" onClick={closeModal} />
          <h3>[{item.name}] 판매를 취소할까요?</h3>
          <div className="item_card">
            <div className="image">
              <img src={item.image} alt="image" />
            </div>
            <div className="content">
              <h4 className="title">{item.name}</h4>
              <span className="dutability">
                {item.durability}/{item.maxDurability}회 남음
              </span>
              <span className="price">{item.price} KLAY</span>
            </div>
          </div>
          <Btn_Container>
            <Btn_Modal_White
              label="예, 취소하겠습니다."
              onClick={() => {
                setIsLoading(true);
                sellItemsCancel(userInfo.accessToken, item.id).then((res) => {
                  setIsLoading(false);
                  if (res.result == 'ok') {
                    navigate('/inventory/completecancle');
                    setInventoryTrigger((prev) => !prev);
                  } else {
                    navigate('/inventory');
                  }
                });
              }}
            />
            <Btn_Modal_Black label="아니요, 취소하지 않겠습니다." onClick={closeModal} />
          </Btn_Container>
        </ModalBox>
      </ModalContainer>
      {isLoading && <Loading />}
    </>
  );
};

export default ModalCancleSelling;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 310px;
  padding: 0 24px;
  padding-top: 46px;
  position: relative;
  .close_btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 10px;
  }
  h3 {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    text-align: center;
  }
  .item_card {
    display: grid;
    grid-template-columns: 77px auto;
    grid-column-gap: 14px;
    height: 100px;
    width: 90%;
    padding: 12px 11px;
    ${({ theme }) => theme.mixin.textStyle.R_12}
    background-color: #2c2e48;
    border-radius: 6px;
    margin-top: 15px;
    margin-bottom: 30px;
    .image {
      width: 77px;
      height: 77px;
      img {
        border-radius: 5px;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: ${({ theme }) => theme.variable.colors.A_FFF};
      .title {
        ${({ theme }) => theme.mixin.flexCenter}
        padding: 0 9px;
        height: 20px;
        background-color: ${({ theme }) => theme.variable.colors.item_color};
        border-radius: 10px;
      }
      .dutability {
        margin-top: 8px;
        color: #a2a4b7;
      }
      .price {
        ${({ theme }) => theme.mixin.textStyle.R_12}
        margin-top: 20px;
      }
    }
  }
`;

const Btn_Container = styled.div`
  display: grid;
  width: 100%;
  grid-row-gap: 10px;
  > button {
    height: 32px;
    ${({ theme }) => theme.mixin.textStyle.R_14}
  }
`;
