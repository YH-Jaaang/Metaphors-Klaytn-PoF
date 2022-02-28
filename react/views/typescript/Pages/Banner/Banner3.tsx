import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Icon_goPrev from '../../Assets/Images/Icon_goPrev.png';
import Banner_3 from '../../Assets/Images/Banner_3.png';

const Banner3 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <h2>NFT로 수익 창출하기</h2>
        <img
          src={Icon_goPrev}
          alt="move prev"
          className="icon_prev"
          onClick={() => {
            navigate('/');
          }}
        />
      </Header>
      <Container>
        <img src={Banner_3} alt="banner img" className="banner_img" />
        <h1>평범한 웹소설 인세 NO!</h1>
        <p className="title_desc">
          내 소설에서 쿠키가 결제될 때마다,
          <br />
          플랫폼은 20%의 수수료만 가져가요.
        </p>
        <p className="sub_disc">
          남은 돈으로 인기있는 NFT 소재를 빌려
          <br />
          독자를 유입시켜보세요!
        </p>
        <p className="border_desc">새로운 웹소설 플랫폼, 메타포스에 작품을 등록하세요!</p>
        <p className="green_desc">
          직접 소유한 NFT 소재로 <br />
          모든 돈을 다 얻을 수 있어요.
        </p>
        <p className="title_desc">
          내가 소유한 NFT를 팔 때<br />
          가치 상승은 덤!
        </p>
        <p className="green_desc">한 작품으로 중복 수익 내기, 어렵지 않아요.</p>
        <p className="title_desc">
          하나의 작품을 독자들이 여러 번 읽도록 활용해보세요.
          <br />
          기존 작품에 독자들이 원하는 분기(NFT 선택)를 추가해서
          <br />더 쉽게 수익을 창출하세요!
        </p>
        <span className="later">*위 기능은 향후 제공 예정입니다.</span>
      </Container>
    </>
  );
};

export default Banner3;

const Container = styled.div`
  ${({ theme }) => theme.mixin.paddingSide_depth1}
  ${({ theme }) => theme.mixin.paddingTopBottom}
  min-height: 100vh;
  ${({ theme }) => theme.mixin.textStyle.R_12}
  line-height: 1.5;
  .banner_img {
    width: 100%;
  }
  h1 {
    ${({ theme }) => theme.mixin.textStyle.B_20}
    margin-top: 28px;
  }
  .title_desc {
    color: ${({ theme }) => theme.variable.colors.btn_inactive_color};
    margin-top: 6px;
  }
  .green_desc {
    color: ${({ theme }) => theme.variable.colors.highlight_color};
    ${({ theme }) => theme.mixin.textStyle.R_14}
    margin-top: 16px;
  }

  .sub_disc {
    ${({ theme }) => theme.mixin.textStyle.R_14}
    margin-top: 6px;
  }
  .border_desc {
    ${({ theme }) => theme.mixin.textStyle.M_12}
    border-bottom: 1px solid #fff;
    padding: 3px 0;
    margin-top: 26px;
  }
  .later {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 70px;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #595c7a;
  ${({ theme }) => theme.mixin.flexCenter}
  position: relative;
  h2 {
    ${({ theme }) => theme.mixin.textStyle.R_14}
  }
  .icon_prev {
    position: absolute;
    top: 50%;
    left: 33px;
    transform: translateY(-50%);
    width: 6px;
  }
`;
