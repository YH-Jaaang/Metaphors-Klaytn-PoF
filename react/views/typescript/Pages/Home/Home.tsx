import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Icon_arrowRight from '../../Assets/Images/Icon_arrowRight.png';
import { isSigninAtom, userInfoAtom } from '../../Store/Atoms';
import NovelCard from './NovelCard';
import Banner from './Banner';
import { getNovelList, getNovelListUser } from '../../Api';
import { INovel } from '../../Store/Type/Interfaces';

const Home = () => {
  const navigate = useNavigate();
  const isSignin = useRecoilValue(isSigninAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const [hasNft, setHasNft] = useState(userInfo.nickname !== '');
  const [novelList, setNovelList] = useState<INovel[]>();
  const [novelListUser, setNovelListUser] = useState<INovel[]>();

  useEffect(() => {
    try {
      getNovelList().then((res) => {
        if (res.content) {
          setNovelList(res.content.total);
        }
      });
      getNovelListUser(userInfo.accessToken).then((res) => {
        if (res.content) {
          setNovelListUser(res.content.total);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <Banner />
      <Container>
        {!hasNft && (
          <Intro_Container>
            <div
              className="contentBox"
              onClick={() => {
                isSignin ? navigate('/account/character') : navigate('/account/signup');
              }}
            >
              <div>
                <span className="title">나를 닮은 캐릭터로 시작해보세요</span>
                <span className="contents">내 성격 NFT 생성하기</span>
              </div>
              <img src={Icon_arrowRight} alt="arrow right icon" className="iconArrow" />
            </div>
          </Intro_Container>
        )}
        {isSignin && (
          <List_Container>
            <h4 className="subtitle">
              {hasNft ? `${userInfo.nickname}님이 좋아할 만한` : ''} 추천 월드
            </h4>
            <div className="list">
              {novelListUser &&
                novelListUser.map((novel, idx) => (
                  <NovelCard
                    key={idx}
                    id={novel.id}
                    name={novel.name}
                    author={novel.author}
                    imagePath={novel.imagePath}
                    nftItems={novel.nftItems}
                    genre={novel.genre}
                  />
                ))}
            </div>
          </List_Container>
        )}

        <List_Container>
          <h4 className="subtitle">월드 전체 보기</h4>
          <div className="list">
            {novelList &&
              novelList.map((novel, idx) => (
                <NovelCard
                  key={idx}
                  id={novel.id}
                  name={novel.name}
                  author={novel.author}
                  imagePath={novel.imagePath}
                  nftItems={novel.nftItems}
                  genre={novel.genre}
                />
              ))}
          </div>
        </List_Container>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  ${({ theme }) => theme.mixin.paddingSide_depth1}
  ${({ theme }) => theme.mixin.paddingTopBottom}
`;

const Intro_Container = styled.section`
  margin-top: 30px;
  .contentBox {
    height: 77px;
    padding-left: 30px;
    padding-right: 16px;
    border-radius: 11px;
    background: linear-gradient(
      90deg,
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconArrow {
      width: 8px;
    }
    .title {
      display: block;
      ${({ theme }) => theme.mixin.textStyle.R_15}
    }
    .contents {
      display: block;
      ${({ theme }) => theme.mixin.textStyle.R_11}
      margin-top: 11px;
    }
  }
`;

const List_Container = styled.section`
  margin-top: 40px;
  .subtitle {
    ${({ theme }) => theme.mixin.textStyle.R_13}
    padding-left: 11px;
    margin-bottom: 6px;
  }
  .list {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: grid;
    grid-row-gap: 15px;
    padding: 15px 11px;
  }
`;
