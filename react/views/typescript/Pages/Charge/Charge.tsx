import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Primary_FontBlack } from '../../Components/Button';
import ModalCompleteCharge from './Modal/ModalCompleteCharge';
import CookieOption from './CookieOption';
import { getUserAssetInfo } from '../../Api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cookieTriggerAtom, userInfoAtom } from '../../Store/Atoms';

const Charge = () => {
  const [cookieFocus, setCookieFocus] = useState(0);
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [cookieTrigger, setCookieTrigger] = useRecoilState(cookieTriggerAtom);
  const [user, setUser] = useState({
    email: '',
    nickname: '',
    cookie: 0,
    token: 0,
  });

  const closeModal = () => {
    navigate('/charge');
  };

  useEffect(() => {
    getUserAssetInfo(userInfo.accessToken).then((res) => {
      setUser(res.content);
    });
  }, [cookieTrigger]);

  const setFocus = (value: number) => {
    setCookieFocus(value);
  };

  return (
    <>
      <Container>
        <Btn_Primary_FontBlack label="쿠키 충전하기" />
        <p className="my_klay">{user.token} KLAY</p>
        <p className="cookie">
          사용 가능한 쿠키 <span className="my_cookie">{user.cookie}</span>
        </p>
        <Cookie_Container>
          <CookieOption setFocus={setFocus} isActive={cookieFocus === 10} count={10} price={1000} />
          <CookieOption setFocus={setFocus} isActive={cookieFocus === 50} count={50} price={4900} />
          <CookieOption
            setFocus={setFocus}
            isActive={cookieFocus === 100}
            count={100}
            price={9800}
          />
        </Cookie_Container>
      </Container>
      <Routes>
        <Route path="/complete" element={<ModalCompleteCharge closeModal={closeModal} />} />
      </Routes>
    </>
  );
};

export default Charge;

const Container = styled.div`
  ${({ theme }) => theme.mixin.paddingSide_depth1}
  ${({ theme }) => theme.mixin.paddingTopBottom}
  >button {
    height: 44px;
  }
  .my_klay {
    color: #a2a4b7;
    ${({ theme }) => theme.mixin.textStyle.R_12}
    margin-top: 15px;
  }
  .cookie {
    ${({ theme }) => theme.mixin.textStyle.R_12}
    margin-top: 5px;
    .my_cookie {
      color: ${({ theme }) => theme.variable.colors.highlight_color};
    }
  }
  .list_title {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    margin-top: 45px;
  }
`;

const Cookie_Container = styled.ul`
  margin-top: 40px;
`;
