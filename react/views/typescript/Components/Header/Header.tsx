import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import SideNav from './SideNav';
import ModalLogout from './ModalLogout';
import Icon_menu from '../../Assets/Images/Icon_menu.png';
import Icon_login from '../../Assets/Images/Icon_login.png';
import Logo from '../../Assets/Images/Logo.png';
import Icon_goPrev from '../../Assets/Images/Icon_goPrev.png';
import Icon_cookie from '../../Assets/Images/Icon_cookie.png';
import Icon_cookieCharge from '../../Assets/Images/Icon_cookieCharge.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  changeAssetToggleAtom,
  isSigninAtom,
  userInfoAtom,
  isNovelAtom,
  cookieTriggerAtom,
} from '../../Store/Atoms';
import { getUserAssetInfo } from '../../Api';
import { IUserAssetInfo } from '../../Store/Type/Interfaces';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation;
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  const [isLogoutModalRender, setIsLogoutModalRender] = useState(false);
  const isSignin = useRecoilValue(isSigninAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [changeAssetToggle, setChangeAssetToggle] = useRecoilState(changeAssetToggleAtom);
  const [userAssetInfo, setUserAssteInfo] = useState<IUserAssetInfo>({
    email: '',
    nickname: '',
    cookie: 0,
    token: 0,
  });
  const [isCookieRender, setIsCookieRender] = useState(false);
  const [isNovel, setIsNovel] = useRecoilState(isNovelAtom);
  const [isNovelRender, setIsNovelRender] = useState(false);
  const [cookieTrigger, setCookieTrigger] = useRecoilState(cookieTriggerAtom);

  const toggleNav = () => {
    setIsSideNavVisible((prev) => !prev);
  };

  const onLoginClick = () => {
    navigate('/account');
  };

  const closeModal = () => {
    setIsLogoutModalRender(false);
  };

  const openModal = () => {
    setIsLogoutModalRender(true);
  };

  useEffect(() => {
    setChangeAssetToggle((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isSignin) {
      getUserAssetInfo(userInfo.accessToken).then((res) => {
        setUserAssteInfo({
          cookie: res.content.cookie,
          token: res.content.token,
          nickname: res.content.nickname,
          email: res.content.email,
        });
        setIsCookieRender(true);
      });
    }
  }, [changeAssetToggle]);

  useEffect(() => {
    if (isSignin) {
      getUserAssetInfo(userInfo.accessToken).then((res) => {
        setUserAssteInfo({
          cookie: res.content.cookie,
          token: res.content.token,
          nickname: res.content.nickname,
          email: res.content.email,
        });
        setIsCookieRender(true);
      });
    }
  }, [cookieTrigger]);

  useEffect(() => {
    isNovel.isNovel ? setIsNovelRender(true) : setIsNovelRender(false);
  }, [isNovel]);

  return (
    <>
      <Container
        isFirstSignin={
          location().pathname.includes('/firstsignin') ||
          location().pathname.includes('/account/complete')
        }
      >
        {isNovelRender ? (
          <div className="gobackToDetail">
            <img
              src={Icon_goPrev}
              alt="prev icon"
              className="icon_prev"
              onClick={() => {
                navigate(`/work/${isNovel.novelId}`);
                setIsNovel({
                  isNovel: false,
                  title: '',
                  current: 0,
                  novelId: 0,
                });
              }}
            />
            <span className="title">
              {isNovel.title} {isNovel.current}화
            </span>
          </div>
        ) : (
          <img src={Icon_menu} alt="menu icon" className="icon" onClick={toggleNav} />
        )}

        {isSignin ? (
          <ChargeIconBox
            onClick={() => {
              navigate('/charge');
              setIsNovel({
                isNovel: false,
                title: '',
                current: 0,
                novelId: 0,
              });
            }}
          >
            <div className="flex_left">
              <img
                src={Icon_cookie}
                alt="cookie icon"
                className="cookie_icon"
                onClick={onLoginClick}
              />
              {isCookieRender ? <span className="my_cookie">{userAssetInfo.cookie}</span> : ''}
            </div>
            <img
              src={Icon_cookieCharge}
              alt="charge icon"
              className="charge_icon"
              onClick={onLoginClick}
            />
          </ChargeIconBox>
        ) : (
          <img src={Icon_login} alt="login icon" className="icon" onClick={onLoginClick} />
        )}
        {isNovelRender ? (
          ''
        ) : (
          <img
            src={Logo}
            alt="home icon"
            className="home"
            onClick={() => {
              navigate('/');
            }}
          />
        )}
      </Container>
      {isSideNavVisible && (
        <SideNav toggleNav={toggleNav} clickLogout={openModal} nickname={userAssetInfo.nickname} />
      )}
      {isLogoutModalRender && <ModalLogout closeModal={closeModal} />}
    </>
  );
};

export default Header;

const Container = styled.header<{ isFirstSignin: boolean }>`
  width: 100%;
  height: 55px;
  background-color: ${(props) =>
    props.isFirstSignin ? 'transparent' : ({ theme }) => theme.variable.colors.background_color};
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.mixin.paddingSide_depth1}
  position: sticky;
  top: 0;
  z-index: 10;
  .icon {
    width: 22px;
  }
  .home {
    position: absolute;
    width: 90px;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
  }
  .gobackToDetail {
    display: flex;
    align-items: center;
    .icon_prev {
      width: 7px;
      margin-right: 10px;
    }
    .title {
      ${({ theme }) => theme.mixin.textStyle.M_13}
      padding-top: 3px;
    }
  }
`;

const ChargeIconBox = styled.div`
  display: flex;
  width: 83px;
  height: 26px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border: 1.5px solid #fff;
  border-radius: 16px;
  .flex_left {
    display: flex;
    align-items: center;
    .cookie_icon {
      width: 14px;
    }
    .my_cookie {
      ${({ theme }) => theme.mixin.textStyle.M_13}
      padding-top: 2px;
      margin-left: 3px;
    }
  }
  .charge_icon {
    width: 15px;
  }
`;
