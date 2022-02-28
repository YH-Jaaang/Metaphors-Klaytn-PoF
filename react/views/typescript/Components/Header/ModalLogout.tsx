import React from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isSigninAtom, userInfoAtom } from '../../Store/Atoms';
import { Btn_Modal_Black, Btn_Modal_White } from '../ButtonModal';

const ModalLogout = ({ closeModal }: { closeModal: () => void }) => {
  const setIsSignin = useSetRecoilState(isSigninAtom);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const doLogout = () => {
    setUserInfo({
      id: '',
      email: '',
      nickname: '',
      roles: '',
      accessToken: '',
      refreshToken: '',
      accessExpiredTime: '',
      refreshExpiredTime: '',
    });
    setIsSignin(false);
    closeModal();
    navigate('/');
  };

  return (
    <ModalContainer>
      <ModalBox>
        <h4>로그아웃을 하시겠습니까?</h4>
        <Btn_Container>
          <Btn_Modal_White label="예" onClick={doLogout} />
          <Btn_Modal_Black label="아니요" onClick={closeModal} />
        </Btn_Container>
      </ModalBox>
    </ModalContainer>
  );
};

export default ModalLogout;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
  z-index: 1000000;
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 193px;
  padding: 0 54px;
  padding-top: 55px;
  h4 {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    text-align: center;
    margin-bottom: 55px;
  }
`;

const Btn_Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  column-gap: 28px;
`;
