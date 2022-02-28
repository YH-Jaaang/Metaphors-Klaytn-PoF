import { DefaultTheme, css } from 'styled-components';

// variables
const variable = {
  colors: {
    A_000: '#000000',
    A_222: '#222222',
    A_666: '#666666',
    A_999: '#999999',
    A_BBB: '#BBBBBB',
    A_DDD: '#DDDDDD',
    A_EEE: '#EEEEEE',
    A_FFF: '#FFFFFF',
    black_color: '#12152e',
    background_color: '#12152E',
    highlight_color: '#38cd9e',
    gray_color: '#9193aa',
    btngray_color: '#595c7a',
    inactive_color: '#1a4346',
    btn_inactive_color: '#a2a4b7',
    item_color: '#429f7a',
  },
};

// mixins
const mixin = {
  textStyle: {
    EB_20: css`
      font-weight: 800;
      font-size: 20px;
      letter-spacing: -0.02em;
    `,
    B_20: css`
      font-weight: 700;
      font-size: 20px;
      letter-spacing: -0.02em;
    `,
    B_17: css`
      font-weight: 700;
      font-size: 17px;
      letter-spacing: -0.02em;
    `,
    B_14: css`
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.02em;
    `,
    M_18: css`
      font-weight: 500;
      font-size: 18px;
      letter-spacing: -0.02em;
    `,
    M_17: css`
      font-weight: 500;
      font-size: 17px;
      letter-spacing: -0.02em;
    `,
    M_16: css`
      font-weight: 500;
      font-size: 16px;
      letter-spacing: -0.02em;
    `,
    M_15: css`
      font-weight: 500;
      font-size: 15px;
      letter-spacing: -0.02em;
    `,
    M_14: css`
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.02em;
    `,
    M_13: css`
      font-weight: 500;
      font-size: 13px;
      letter-spacing: -0.02em;
    `,
    M_12: css`
      font-weight: 500;
      font-size: 12px;
      letter-spacing: -0.02em;
    `,
    M_11: css`
      font-weight: 500;
      font-size: 11px;
      letter-spacing: -0.02em;
    `,
    R_17: css`
      font-weight: 400;
      font-size: 17px;
      letter-spacing: -0.02em;
    `,
    R_16: css`
      font-weight: 400;
      font-size: 16px;
      letter-spacing: -0.02em;
    `,
    R_15: css`
      font-weight: 400;
      font-size: 15px;
      letter-spacing: -0.02em;
    `,
    R_14: css`
      font-weight: 400;
      font-size: 14px;
      letter-spacing: -0.02em;
    `,
    R_13: css`
      font-weight: 400;
      font-size: 13px;
      letter-spacing: -0.02em;
    `,
    R_12: css`
      font-weight: 400;
      font-size: 12px;
      letter-spacing: -0.02em;
    `,
    R_11: css`
      font-weight: 400;
      font-size: 11px;
      letter-spacing: -0.02em;
    `,
    R_10: css`
      font-weight: 400;
      font-size: 10px;
      letter-spacing: -0.02em;
    `,
  },

  paddingTopBottom: css`
    padding-top: 33px;
    padding-bottom: 66px;
  `,
  paddingSide_depth1: css`
    padding-left: 22px;
    padding-right: 22px;
  `,
  paddingSide_depth2: css`
    padding-left: 11px;
    padding-right: 11px;
  `,
  paddingSide_login: css`
    padding: 0 45px;
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  modalContainer: css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 33px;
  `,

  modalBox: css`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

const theme: DefaultTheme = {
  variable,
  mixin,
};

export { theme };

export type TypeVariable = typeof variable;
export type TypeMixin = typeof mixin;
