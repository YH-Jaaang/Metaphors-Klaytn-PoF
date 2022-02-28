import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { postNovelDetail, postRestartNovel } from '../../Api';
import { Btn_Primary_FontBlack, Btn_Gray } from '../../Components/Button';
import { userInfoAtom } from '../../Store/Atoms';
import { IDetailProps } from '../../Store/Type/Interfaces';

const Detail = ({ novelDetail, setNovelDetail }: IDetailProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(() => {
    try {
      params.id &&
        userInfo.accessToken &&
        postNovelDetail(userInfo.accessToken, parseInt(params.id)).then((res) => {
          setNovelDetail(res.content);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const restartNovel = () => {
    params.id &&
      userInfo.accessToken &&
      postRestartNovel(userInfo.accessToken, parseInt(params.id)).then((res) => {
        navigate(`/work/viewer/${novelDetail?.novelId}`);
      });
  };

  return (
    <Container>
      <Info>
        <div className="image">
          <img src={novelDetail.imagePath} alt="image" />
        </div>
        <div className="info">
          <h4 className="title">{novelDetail?.name}</h4>
          <span className="author">{novelDetail?.author}</span>
          <div className="inlineBox">
            <span className="date">{novelDetail?.issueDate.slice(0, 10)}</span>
            <ul className="items">
              {novelDetail?.nftItems.split('/').map((item, idx) => {
                if (idx < 2) {
                  return <li key={idx}>{item}</li>;
                }
              })}
            </ul>
          </div>
        </div>
        <div className="desc">{novelDetail?.description}</div>
      </Info>
      <Btn_Container>
        <Btn_Primary_FontBlack
          label={
            novelDetail.current > 1
              ? `이어보기 [${novelDetail.current}화]`
              : `지금 시작하기 [${novelDetail.current}화]`
          }
          onClick={() => {
            navigate(`/work/viewer/${novelDetail?.novelId}`);
          }}
        />
        <Btn_Gray
          label="다시 시작하기"
          onClick={() => {
            restartNovel();
          }}
        />
      </Btn_Container>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  ${({ theme }) => theme.mixin.paddingSide_depth1}
  ${({ theme }) => theme.mixin.paddingTopBottom}
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 68px auto;
  grid-template-rows: auto auto;
  grid-column-gap: 17px;
  grid-row-gap: 20px;
  ${({ theme }) => theme.mixin.textStyle.R_11}

  .image {
    width: 100%;
    height: 97px;
    img {
      display: block;
      width: 100%;
      border-radius: 4px;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    .title {
      ${({ theme }) => theme.mixin.textStyle.M_15}
      padding-top: 3px;
    }
    .author {
      display: block;
      margin-top: 10px;
      ${({ theme }) => theme.mixin.textStyle.R_13}
      color: ${({ theme }) => theme.variable.colors.gray_color};
    }
    .inlineBox {
      display: flex;
      align-items: center;
      margin-top: 30px;
      .date {
        display: flex;
        padding-top: 3px;
        align-items: center;
      }
      .items {
        margin-left: 12px;
        display: flex;
        li {
          height: 19px;
          ${({ theme }) => theme.mixin.flexCenter}
          background-color: #429f7a;
          border-radius: 9px;
          padding: 0 7px;
          padding-top: 3px;
          &:not(:first-child) {
            margin-left: 6px;
          }
        }
      }
    }
  }
  .desc {
    grid-column: 1/3;
    ${({ theme }) => theme.mixin.textStyle.R_11}
    line-height: 1.5;
  }
`;

const Btn_Container = styled.div`
  margin-top: 30px;
  display: grid;
  width: 100%;
  grid-row-gap: 10px;
  button {
    ${({ theme }) => theme.mixin.textStyle.M_13}
  }
`;
