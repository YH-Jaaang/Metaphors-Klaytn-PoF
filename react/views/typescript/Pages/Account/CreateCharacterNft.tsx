import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Btn_Gradient } from '../../Components/Button';
import { IBtnNft, IUserNft } from '../../Store/Type/Interfaces';
import Arrow_R from '../../Assets/Images/Icon_arrowR.png';
import Arrow_L from '../../Assets/Images/Icon_arrowL.png';
import { useNavigate } from 'react-router';
import { getUserGenre, getUserPersonality } from '../../Api';
import { useRecoilState } from 'recoil';
import { nftAtom, userInfoAtom } from '../../Store/Atoms';

const CreateCharacterNft = () => {
  const [nowStep, setNowStep] = useState('name');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [nft, setNft] = useRecoilState(nftAtom);
  const [personalityList, setPersonalityList] = useState<{ personality: string }[]>();
  const [genresList, setGenresList] = useState<{ genre: string }[]>();
  const [userNft, setUserNft] = useState<IUserNft>({
    isDone: false,
    name: '',
    personality: [],
    genre: [],
  });

  useEffect(() => {
    try {
      getUserGenre().then((res) => {
        setGenresList(res.content);
      });
      getUserPersonality().then((res) => {
        setPersonalityList(res.content);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (userNft.isDone) {
      setNft({
        accessToken: userInfo.accessToken,
        name: userNft.name,
        personality1: userNft.personality[0],
        personality2: userNft.personality[1],
        personality3: userNft.personality[2],
        genre1: userNft.genre[0],
        genre2: userNft.genre[1],
        genre3: userNft.genre[2],
      });
      navigate('/account/complete');
    }
  }, [userNft]);

  const NameBox = () => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <>
        <h3 className="title">
          내 이름은 무엇인가요?
          <img
            src={Arrow_R}
            alt="다음"
            onClick={() => {
              if (value.length > 0) {
                setNowStep('personality');
                setUserNft({ ...userNft, name: value });
              }
            }}
            className="right"
          />
        </h3>
        <input type="text" placeholder="ex) 역삼동불고기" value={value} onChange={handleChange} />
      </>
    );
  };

  const ContentBox = ({ label, onClick }: IBtnNft) => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <TextBox
        onClick={() => {
          isSelected ? setIsSelected(false) : setIsSelected(true);
          onClick(label, isSelected);
        }}
        isSelected={isSelected}
      >
        {label}
      </TextBox>
    );
  };

  const PersonalityBox = () => {
    const [valueList, setValueList] = useState<string[]>([]);

    const handleClick = (label: string, isSelected: boolean) => {
      if (isSelected) {
        setValueList((prev) => prev.filter((data) => data !== label));
      } else {
        setValueList([...valueList, label]);
      }
    };

    return (
      <>
        <h3 className="title">
          <img
            src={Arrow_L}
            alt="이전"
            onClick={() => {
              setNowStep('name');
            }}
            className="left"
          />
          나는 어떤 성격을 갖고 있나요?
          <img
            src={Arrow_R}
            alt="다음"
            onClick={() => {
              if (valueList.length === 3) {
                setNowStep('genre');
                setUserNft({ ...userNft, personality: valueList });
              }
            }}
            className="right"
          />
        </h3>
        <p className="desc">3개의 성격을 선택해주세요.</p>
        <ul className="contList">
          {personalityList &&
            personalityList.map((cont, idx) => (
              <ContentBox key={idx} label={cont.personality} onClick={handleClick} />
            ))}
        </ul>
      </>
    );
  };

  const GenreBox = () => {
    const [valueList, setValueList] = useState<string[]>([]);

    const handleClick = (label: string, isSelected: boolean) => {
      if (isSelected) {
        setValueList((prev) => prev.filter((data) => data !== label));
      } else {
        setValueList([...valueList, label]);
      }
    };

    return (
      <>
        <h3 className="title">
          <img
            src={Arrow_L}
            alt="이전"
            onClick={() => {
              setNowStep('personality');
            }}
            className="left"
          />
          나는 어떤 장르를 좋아하나요?
          <img
            src={Arrow_R}
            alt="다음"
            onClick={() => {
              if (valueList.length === 3) {
                setUserNft({ ...userNft, genre: valueList, isDone: true });
              }
            }}
            className="right"
          />
        </h3>
        <p className="desc">3개의 장르를 선택해주세요.</p>
        <ul className="contList">
          {genresList &&
            genresList.map((cont, idx) => (
              <ContentBox key={idx} label={cont.genre} onClick={handleClick} />
            ))}
        </ul>
      </>
    );
  };

  return (
    <Container>
      <Btn_Gradient label="NFT 생성 중" />
      {nowStep === 'name' ? (
        <NameBox />
      ) : nowStep === 'personality' ? (
        <PersonalityBox />
      ) : (
        <GenreBox />
      )}
    </Container>
  );
};

export default CreateCharacterNft;

const Container = styled.div`
  padding: 0 33px;
  ${({ theme }) => theme.mixin.paddingTopBottom}
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    ${({ theme }) => theme.mixin.textStyle.R_16}
    margin-top: 40px;
    position: relative;
    img {
      position: absolute;
      width: 18px;
      &.left {
        left: -45px;
      }
      &.right {
        right: -45px;
      }
    }
  }
  .desc {
    text-align: center;
    ${({ theme }) => theme.mixin.textStyle.R_12}
    color: #595c7a;
    margin-top: 8px;
  }
  input {
    width: 80%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    padding: 5px 5px;
    margin-top: 80px;
    ${({ theme }) => theme.mixin.textStyle.R_16}
  }
  .contList {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 60px;
  }
`;

const TextBox = styled.li<{ isSelected: boolean }>`
  ${({ theme }) => theme.mixin.flexCenter}
  ${({ theme }) => theme.mixin.textStyle.R_13}
  padding: 0 15px;
  background-color: ${(props) =>
    props.isSelected
      ? ({ theme }) => theme.variable.colors.highlight_color
      : ({ theme }) => theme.variable.colors.inactive_color};
  height: 30px;
  border-radius: 14px;
`;
