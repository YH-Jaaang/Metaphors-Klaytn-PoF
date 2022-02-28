import React from 'react';
import styled from 'styled-components';
import { IFooterProps } from '../../Store/Type/Interfaces';
import Icon_goPrev from '../../Assets/Images/Icon_goPrev.png';
import Icon_goNext from '../../Assets/Images/Icon_goNext.png';
import Border_nextEpisode from '../../Assets/Images/Border_nextEpisode.png';
import { useRecoilState } from 'recoil';
import { nextEpisodeAtom, isNovelAtom } from '../../Store/Atoms';
import { useNavigate, useParams } from 'react-router-dom';

const Footer = ({
  moveNext,
  movePrev,
  isLastPage,
  isFirstPage,
  haschoice,
  isEndingPage,
  novelDetail,
}: IFooterProps) => {
  const [nextEpisodeToggle, setNextEpisodeToggle] = useRecoilState(nextEpisodeAtom);
  const [isNovel, setIsNovel] = useRecoilState(isNovelAtom);
  const navigate = useNavigate();
  const params = useParams();

  const handleClick = () => {
    setNextEpisodeToggle((prev) => !prev);
    window.location.replace(`/work/viewer/${params.id}`);
  };

  return (
    <FooterContainer>
      {isLastPage && (
        <NextEpisode onClick={handleClick}>
          <span>다음화 보기</span>
          <img src={Border_nextEpisode} alt="next episode" />
        </NextEpisode>
      )}
      {isEndingPage && (
        <NextEpisode
          onClick={() => {
            setIsNovel({
              isNovel: false,
              title: '',
              current: 0,
              novelId: 0,
            });
            navigate(`/work/${params.id}`);
          }}
        >
          <span>소설로 돌아가기</span>
          <img src={Border_nextEpisode} alt="next episode" />
        </NextEpisode>
      )}
      {isFirstPage || isLastPage ? (
        <span></span>
      ) : (
        <img className="arrow_icon" src={Icon_goPrev} onClick={movePrev} alt="go previous" />
      )}
      {isLastPage || haschoice || isEndingPage ? (
        ''
      ) : (
        <img className="arrow_icon" src={Icon_goNext} onClick={moveNext} alt="go next" />
      )}
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100vw;
  height: 45px;
  position: fixed;
  z-index: 10000;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.variable.colors.background_color};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px;
  .arrow_icon {
    width: 9px;
  }
`;

const NextEpisode = styled.div`
  position: absolute;
  z-index: 100000;
  top: -66px;
  width: 80%;
  background-color: #fff;
  span {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    color: ${({ theme }) => theme.variable.colors.black_color};
    padding-left: 11px;
  }
  img {
    width: 100%;
    position: absolute;
    top: 10px;
    left: 0;
  }
`;

export default Footer;
