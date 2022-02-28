import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Icon_goPrev from '../../Assets/Images/Icon_goPrev.png';
import Banner_1 from '../../Assets/Images/Banner_1.png';

const Banner1 = () => {
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
        <img src={Banner_1} alt="banner img" className="banner_img" />
        <h1>NFT로 수익 창출?</h1>
        <p className="title_desc">
          혹시 다른 곳에서 NFT를 구입하신 적이 있나요?
          <br />
          그렇다면 내 NFT를 작가님들께 소재로 빌려주세요.
          <br />
          수익을 창출할 수 있습니다.
        </p>
        <p className="box_desc">내 인벤토리에서 NFT를 소재로 등록해두면 끝!</p>
        <p className="green_desc">독자들이 결제할 때마다 KLAY 수익이 쌓여요!</p>
        <p className="title_desc">수익 배분율은 자유롭게 설정할 수 있어요.</p>
        <p className="desc">
          독자들은 NFT를 구입해서 무료로 분기를 선택하고 싶어합니다.
          <br /> 내가 가진 NFT의 가치 상승을 이끌어내 보세요!
        </p>
        <span className="later">*위 기능은 향후 제공 예정입니다.</span>
      </Container>
    </>
  );
};

export default Banner1;

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
  .box_desc {
    ${({ theme }) => theme.mixin.textStyle.M_14}
    width: 100%;
    padding: 10px;
    background-image: linear-gradient(to left, #192f3c 100%, #171e45 0%);
    margin-top: 30px;
  }
  .green_desc {
    color: ${({ theme }) => theme.variable.colors.highlight_color};
    ${({ theme }) => theme.mixin.textStyle.R_14}
    margin-top: 8px;
  }
  .desc {
    margin-top: 16px;
  }
  .later {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 100px;
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
