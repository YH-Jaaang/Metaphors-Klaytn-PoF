import { createGlobalStyle } from 'styled-components';
// 각 폰트 파일 import
import NotoSansKR_Thin from '../Assets/Fonts/NotoSansKR_Thin.woff';
import NotoSansKR_Light from '../Assets/Fonts/NotoSansKR_Light.woff';
import NotoSansKR_Regular from '../Assets/Fonts/NotoSansKR_Regular.woff';
import NotoSansKR_Medium from '../Assets/Fonts/NotoSansKR_Medium.woff';
import NotoSansKR_Bold from '../Assets/Fonts/NotoSansKR_Bold.woff';
import NotoSansKR_Black from '../Assets/Fonts/NotoSansKR_Black.woff';
import NanumMyeongjo_Regular from '../Assets/Fonts/NanumMyeongjo_Regular.woff';
import NanumMyeongjo_Bold from '../Assets/Fonts/NanumMyeongjo_Bold.woff';
import NanumMyeongjo_ExtraBold from '../Assets/Fonts/NanumMyeongjo_ExtraBold.woff';

export default createGlobalStyle`
    @font-face {
        font-family: "NotoSansKR";
        src: local("NotoSansKR"), url(${NotoSansKR_Thin}) format('woff');
        font-weight: 100;
    }
    @font-face {
        font-family: "NotoSansKR";
        src: local("NotoSansKR"), url(${NotoSansKR_Light}) format('woff');
        font-weight: 300;
    }
    @font-face {
        font-family: "NotoSansKR";
        src: local("NotoSansKR"), url(${NotoSansKR_Regular}) format('woff');
        font-weight: 400;
    }
    @font-face {
        font-family: "NotoSansKR";
        src: local("NotoSansKR"), url(${NotoSansKR_Medium}) format('woff');
        font-weight: 500;
    }
    @font-face {
        font-family: "NotoSansKR";
        src: local("NotoSansKR"), url(${NotoSansKR_Bold}) format('woff');
        font-weight: 700;
    }
    @font-face {
        font-family: "NotoSansKR";
        src: local("NotoSansKR"), url(${NotoSansKR_Black}) format('woff');
        font-weight: 900;
    }
    @font-face {
        font-family: "NanumMyeongjo";
        src: local("NanumMyeongjo"), url(${NanumMyeongjo_Regular}) format('woff');
        font-weight: 400;
        }
    @font-face {
        font-family: "NanumMyeongjo";
        src: local("NanumMyeongjo"), url(${NanumMyeongjo_Bold}) format('woff');
        font-weight: 700;
        }
    @font-face {
        font-family: "NanumMyeongjo";
        src: local("NanumMyeongjo"), url(${NanumMyeongjo_ExtraBold}) format('woff');
        font-weight: 800;
        }
`;
