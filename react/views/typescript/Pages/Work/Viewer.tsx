import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { postNovelEpisode } from '../../Api';
import { useCookieAtom, userInfoAtom, nextEpisodeAtom, isNovelAtom } from '../../Store/Atoms';
import { INovelDetail, INovelEpisode } from '../../Store/Type/Interfaces';
import Footer from './Footer';
import SelectOption from './SelectOption';
import PageContainer from './PageContainer';
import Loading from '../../Components/Loading';

const Viewer = ({ novelDetail }: { novelDetail: INovelDetail }) => {
  const [nowPage, setNowPage] = useState(1);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [episodeData, setEpisodeData] = useState<INovelEpisode>({
    novelId: 0,
    name: '',
    author: '',
    episodeId: '',
    current: 0,
    pages: [
      {
        number: 0,
        content: '',
        hasChoice: false,
        context: '',
      },
    ],
    choice: [
      {
        episodeId: '',
        item: '',
        context: '',
      },
    ],
    items: [
      {
        id: '',
        name: '',
        imagePath: '',
        durability: '',
        maxDurability: '',
        isFreeToken: false,
        price: '',
      },
    ],
  });
  const [useCookie, setUseCookie] = useRecoilState(useCookieAtom);
  const [nextEpisodeToggle, setNextEpisodeToggle] = useRecoilState(nextEpisodeAtom);
  const [isNovel, setIsNovel] = useRecoilState(isNovelAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isEndingPage, setIsEndingpage] = useState(false);
  const params = useParams();

  const goNext = (num: number) => {
    setNowPage((prev) => prev + num);
  };

  useEffect(() => {
    try {
      params.id &&
        postNovelEpisode(userInfo.accessToken, parseInt(params.id)).then((res) => {
          if (res.content) {
            setEpisodeData(res.content);
            setNowPage(1);
          }
        });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
    return;
  }, [nextEpisodeToggle]);

  useEffect(() => {
    setIsNovel({
      isNovel: true,
      title: episodeData.name,
      current: episodeData.current,
      novelId: episodeData.novelId,
    });
  }, [episodeData]);

  useEffect(() => {
    if (useCookie !== '') {
      if (episodeData?.choice) {
        for (let i = 0; i < episodeData?.choice.length; i++) {
          if (episodeData.choice[i].episodeId === useCookie) {
            setNowPage((prev) => prev + i + 1);
            setUseCookie('');
            return;
          }
        }
      }
    }
  }, [useCookie]);

  useEffect(() => {
    setIsEndingpage(episodeData.choice.length === 0 && nowPage === episodeData.pages.length);
  }, [nowPage]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <PageContainer
              title={episodeData?.name}
              author={episodeData?.author}
              contents={episodeData?.pages[nowPage - 1].content}
              isVisibleOption={episodeData?.pages[nowPage - 1].hasChoice}
              isLastPage={episodeData?.pages[nowPage - 1].context !== ''}
              isFirstPage={nowPage === 1}
            />
          </Container>
          {episodeData?.pages[nowPage - 1].hasChoice && (
            <SelectOption novelId={episodeData.novelId} goNext={goNext} />
          )}
          <Footer
            movePrev={() => {
              if (nowPage === 1) return;
              setNowPage((current) => current - 1);
            }}
            moveNext={() => {
              if (episodeData?.pages[nowPage - 1].context !== '') return;
              setNowPage((current) => current + 1);
            }}
            isLastPage={episodeData?.pages[nowPage - 1].context !== ''}
            isFirstPage={nowPage === 1}
            isEndingPage={episodeData?.pages[nowPage - 1].content.includes('-끝-')}
            haschoice={episodeData?.pages[nowPage - 1].hasChoice}
            novelDetail={novelDetail}
          />
        </>
      )}
    </>
  );
};

export default Viewer;

const Container = styled.div`
  padding: 0 33px;
  ${({ theme }) => theme.mixin.paddingTopBottom}
  background-color: ${({ theme }) => theme.variable.colors.A_FFF};
  color: ${({ theme }) => theme.variable.colors.black_color};
  min-height: 100vh;
  .title {
  }
`;
