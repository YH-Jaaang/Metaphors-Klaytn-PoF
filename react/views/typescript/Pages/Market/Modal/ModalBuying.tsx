import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Btn_Modal_Primary, Btn_Modal_Inactive } from '../../../Components/ButtonModal';
import Icon_x from '../../../Assets/Images/Icon_x.png';
import { useNavigate } from 'react-router';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, marketTriggerAtom } from '../../../Store/Atoms';
import { purchaseItem, getImage } from '../../../Api';
import { IItemMarket } from '../../../Store/Type/Interfaces';
import Loading from '../../../Components/Loading';

interface props {
  closeModal: any;
  item: IItemMarket;
  klay: number;
}

const ModalBuying = ({ closeModal, item, klay }: props) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [marketTrigger, setMarketTrigger] = useRecoilState(marketTriggerAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    getImage(item.imageURI).then((res) => {
      setImage(res);
    });
  }, []);

  return (
    <>
      <ModalContainer>
        <ModalBox hasKlay={klay >= parseInt(item.price)}>
          <img src={Icon_x} alt="close button" className="close_btn" onClick={closeModal} />
          <h3>[{item.name}]를 구입할까요?</h3>
          <div className="item_card">
            <div className="image">
              <img src={image} alt="image" />
            </div>
            <div className="content">
              <h4 className="title">{item.name}</h4>
              <span className="dutability">
                {item.durability}/{item.maxDurability}회 남음
              </span>
              <span className="price">{item.price} KLAY</span>
            </div>
          </div>
          {klay >= parseInt(item.price) && userInfo.nickname != item.ownerNickname && (
            <Btn_Modal_Primary
              label="구입하기"
              onClick={() => {
                setIsLoading(true);
                purchaseItem(userInfo.accessToken, item.id).then((res) => {
                  setIsLoading(false);
                  if (res.result === 'ok') {
                    setMarketTrigger((prev) => !prev);
                    navigate('/market/completebuying');
                  } else {
                    alert('구매에 실패하였습니다');
                  }
                });
              }}
            />
          )}
          {klay < parseInt(item.price) && userInfo.nickname != item.ownerNickname && (
            <>
              <p className="warning">*KLAY 잔액이 부족합니다. KLAY를 충전해주세요.</p>
              <Btn_Modal_Inactive label="구입하기" />
            </>
          )}
          {userInfo.nickname == item.ownerNickname && (
            <>
              <p className="warning">*현재 유저의 아이템입니다.</p>
              <Btn_Modal_Inactive label="구입하기" />
            </>
          )}
        </ModalBox>
      </ModalContainer>
      {isLoading && <Loading />}
    </>
  );
};

export default ModalBuying;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div<{ hasKlay: boolean }>`
  ${({ theme }) => theme.mixin.modalBox}
  height: 288px;
  padding: 0 24px;
  padding-top: 50px;
  position: relative;
  .close_btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 10px;
  }
  .warning {
    ${({ theme }) => theme.mixin.textStyle.R_12}
    margin-bottom: 6px;
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
    margin-bottom: ${(props) => (props.hasKlay ? '45px' : '35px')};
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
