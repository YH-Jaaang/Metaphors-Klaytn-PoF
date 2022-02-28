import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ICookieOptionProps } from '../../Store/Type/Interfaces';
import Icon_cookie from '../../Assets/Images/Icon_cookie.png';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, cookieTriggerAtom } from '../../Store/Atoms';
import { purchaseCookie } from '../../Api';

const CookieOption = ({ isActive, count, price, setFocus }: ICookieOptionProps) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [cookieTrigger, setCookieTrigger] = useRecoilState(cookieTriggerAtom);

  return (
    <CookieOption_Style
      isActive={isActive}
      onClick={() => {
        setFocus(count);
      }}
    >
      <div className="left">
        <img src={Icon_cookie} alt="cookie icon" />
        <span>쿠키 {count}개</span>
      </div>
      {!isActive && <span className="price">{price}원</span>}
      {isActive && (
        <div
          className="pay_box"
          onClick={() => {
            purchaseCookie(userInfo.accessToken, count.toString()).then((res) => {
              setCookieTrigger((prev) => !prev);
              navigate('/charge/complete');
            });
          }}
        >
          <h5>현금으로 결제하기</h5>
          <span>{price}원</span>
        </div>
      )}
    </CookieOption_Style>
  );
};

export default CookieOption;

const CookieOption_Style = styled.li<{ isActive: boolean }>`
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
