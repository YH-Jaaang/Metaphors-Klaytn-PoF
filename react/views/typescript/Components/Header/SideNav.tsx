import React from 'react';
import styled from 'styled-components';
import Icon_menu_gray from '../../Assets/Images/Icon_menu_gray.png';
import Icon_x from '../../Assets/Images/Icon_x.png';
import { ISideNavProps } from '../../Store/Type/Interfaces';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isSigninAtom } from '../../Store/Atoms';

const SideNav = ({ toggleNav, clickLogout, nickname }: ISideNavProps) => {
  const navigate = useNavigate();
  const isSignin = useRecoilValue(isSigninAtom);

  return (
    <NavContainer>
      <div className="contentarea">
        <img src={Icon_menu_gray} alt="menuicon" className="menu_icon" />
        <img src={Icon_x} alt="close icon" className="close" onClick={toggleNav} />
        <div className="user_box">
          {isSignin ? (
            <>
              <span className="loginout" onClick={clickLogout}>
                로그아웃
              </span>
              <span className="user">{nickname} 님</span>
            </>
          ) : (
            <span
              className="loginout"
              onClick={() => {
                navigate('account');
                toggleNav();
              }}
            >
              로그인
            </span>
          )}
        </div>
        <ul className="menu_list">
          {isSignin ? (
            <li
              onClick={() => {
                navigate('/inventory');
                toggleNav();
              }}
            >
              인벤토리
            </li>
          ) : (
            ''
          )}
          <li
            onClick={() => {
              navigate('/market');
              toggleNav();
            }}
          >
            거래소
          </li>
        </ul>
      </div>
    </NavContainer>
  );
};

export default SideNav;

const NavContainer = styled.nav`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  color: ${({ theme }) => theme.variable.colors.black_color};
  .contentarea {
    position: relative;
    height: 100vh;
    width: 280px;
    background-color: ${({ theme }) => theme.variable.colors.A_FFF};
    padding: 100px 33px;
    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 15px;
    }
    .menu_icon {
      position: absolute;
      top: 22px;
      left: 20px;
      width: 20px;
    }
    .user_box {
      height: 100px;
      .loginout {
        ${({ theme }) => theme.mixin.textStyle.R_13}
        color: #a2a4b7;
      }
      .user {
        margin-top: 10px;
        display: block;
        ${({ theme }) => theme.mixin.textStyle.R_15}
      }
    }
    .menu_list {
      li {
        ${({ theme }) => theme.mixin.textStyle.R_16}
        margin-bottom: 20px;
      }
    }
  }
`;
