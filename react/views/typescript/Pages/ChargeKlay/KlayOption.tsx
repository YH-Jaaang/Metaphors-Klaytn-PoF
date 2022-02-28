import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { IKlayOptionProps } from '../../Store/Type/Interfaces';
import Icon_klay from '../../Assets/Images/Icon_klay.png';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, klayTriggerAtom } from '../../Store/Atoms';
import { purchaseToken } from '../../Api';
import Loading from '../../Components/Loading';

const KlayOption = ({ isActive, count, setFocus }: IKlayOptionProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useRecoilValue(userInfoAtom);
  const [klayTrigger, setKlayTrigger] = useRecoilState(klayTriggerAtom);

  return (
    <>
      <KlayOption_Style
        isActive={isActive}
        onClick={() => {
          setFocus(count);
        }}
      >
        <div className="left">
          <img src={Icon_klay} alt="klay icon" />
          <span>{count} KLAY</span>
        </div>
        {isActive && (
          <div
            className="pay_box"
            onClick={() => {
              setIsLoading(true);
              purchaseToken(userInfo.accessToken, count.toString()).then((res) => {
                setKlayTrigger((prev) => !prev);
                setIsLoading(false);
                navigate('/chargeklay/complete');
              });
            }}
          >
            <h5>충전하기</h5>
          </div>
        )}
      </KlayOption_Style>
      {isLoading && <Loading />}
    </>
  );
};

export default KlayOption;

const KlayOption_Style = styled.li<{ isActive: boolean }>`
  ${({ theme }) => theme.mixin.textStyle.M_14}
  display: flex;
  flex-direction: ${(props) => (props.isActive ? 'column' : '')};
  align-items: ${(props) => (props.isActive ? '' : 'center')};
  padding-top: ${(props) => (props.isActive ? '15px' : '')};
  justify-content: ${(props) => (props.isActive ? '' : 'space-between')};
  height: ${(props) => (props.isActive ? '120px' : '47px')};
  border-bottom: ${(props) => (props.isActive ? '' : '1px solid #fff')};
  opacity: ${(props) => (props.isActive ? '1' : '0.4')};
  .left {
    display: flex;
    align-items: center;
    img {
      width: 15px;
      margin-right: 5px;
    }
  }
  .price {
    padding-right: 10px;
  }
  .pay_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 25px;
    background-color: #2c2e48;
    border-radius: 6px;
    margin-top: 15px;
  }
`;
