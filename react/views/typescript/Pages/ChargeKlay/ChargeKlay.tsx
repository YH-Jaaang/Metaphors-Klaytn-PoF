import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Primary_FontBlack } from '../../Components/Button';
import ModalCompleteCharge from './Modal/ModalCompleteCharge';
import KlayOption from './KlayOption';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, klayTriggerAtom } from '../../Store/Atoms';
import { getUserAssetInfo } from '../../Api';

const ChargeKlay = () => {
  const [klayFocus, setKlayFocus] = useState(0);
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [klayTrigger, setKlayTrigger] = useRecoilState(klayTriggerAtom);

  const [user, setUser] = useState({
    email: '',
    nickname: '',
    cookie: 0,
    token: 0,
  });

  const closeModal = () => {
    navigate('/chargeklay');
  };

  useEffect(() => {
    getUserAssetInfo(userInfo.accessToken).then((res) => {
      setUser(res.content);
    });
  }, [klayTrigger]);

  const setFocus = (value: number) => {
    setKlayFocus(value);
  };

  return (
    <>
      <Container>
        <Btn_Primary_FontBlack label="KLAY 충전하기" />
        <p className="my_klay">
          <span>{user.token}</span> KLAY
        </p>
        <Klay_Container>
          <KlayOption setFocus={setFocus} isActive={klayFocus === 1} count={1} />
          <KlayOption setFocus={setFocus} isActive={klayFocus === 2} count={2} />
          <KlayOption setFocus={setFocus} isActive={klayFocus === 3} count={3} />
        </Klay_Container>
      </Container>

      <Routes>
        <Route path="/complete" element={<ModalCompleteCharge closeModal={closeModal} />} />
      </Routes>
    </>
  );
};

export default ChargeKlay;

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
    span {
      color: ${({ theme }) => theme.variable.colors.highlight_color};
    }
  }
  .list_title {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    margin-top: 45px;
  }
`;

const Klay_Container = styled.ul`
  margin-top: 40px;
`;
