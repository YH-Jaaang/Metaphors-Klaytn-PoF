import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { postSigninDetail } from '../../Api';
import { Btn_Primary, Btn_White } from '../../Components/Button';
import Loading from '../../Components/Loading';
import { nftAtom, changeAssetToggleAtom, userInfoAtom } from '../../Store/Atoms';

const CompleteCreateCharacter = () => {
  const navigate = useNavigate();
  const [nft, setNft] = useRecoilState(nftAtom);
  const [userInfo, setUserinfo] = useRecoilState(userInfoAtom);
  const [changeAssetToggle, setChangeAssetToggle] = useRecoilState(changeAssetToggleAtom);
  const [isLoading, setIsLoading] = useState(false);

  const goCreateNft = () => {
    navigate('/account/character');
  };

  const handleClickHome = () => {
    setIsLoading(true);
    postSigninDetail(
      nft.accessToken,
      nft.name,
      nft.personality1,
      nft.personality2,
      nft.personality3,
      nft.genre1,
      nft.genre2,
      nft.genre3
    )
      .then((res) => {
        setUserinfo({
          ...userInfo,
          nickname: nft.name,
        });
      })
      .then((res) => {
        setNft({
          accessToken: '',
          name: '',
          personality1: '',
          personality2: '',
          personality3: '',
          genre1: '',
          genre2: '',
          genre3: '',
        });
        setIsLoading(false);
        navigate('/');
        setChangeAssetToggle((prev) => !prev);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Background></Background>
          <Container>
            <h2>내 성격들을 NFT로 받았어요!</h2>
            <p className="content">인벤토리를 확인해보세요.</p>
            <Btn_Container>
              <Btn_Primary label="홈으로 돌아가기" onClick={handleClickHome} />
              <Btn_White label="다시 고르기" onClick={goCreateNft} />
            </Btn_Container>
          </Container>
        </>
      )}
    </>
  );
};

export default CompleteCreateCharacter;

const Container = styled.div`
  height: 100vh;
  position: absolute;
  top: 0;
  width: 100%;
  ${({ theme }) => theme.mixin.paddingSide_depth1}
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    ${({ theme }) => theme.mixin.textStyle.M_18}
  }
  .content {
    ${({ theme }) => theme.mixin.textStyle.R_16}
    margin-top: 10px;
    margin-bottom: 200px;
  }
`;

const Btn_Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 15px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  opacity: 0.19;
  background: linear-gradient(
    180deg,
    #2844cf -10%,
    #4678d0 24%,
    #44e09c 85%,
    #41a485 126%,
    #41a384 127%,
    #3a0848 155%,
    #3a0848 155%,
    #9963cf 156%,
    #81088a 156%
  );
`;
