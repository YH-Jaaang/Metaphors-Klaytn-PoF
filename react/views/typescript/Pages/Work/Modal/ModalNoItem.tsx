import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon_x from '../../../Assets/Images/Icon_x.png';
import { useNavigate, useParams } from 'react-router';
import { IBtn } from '../../../Store/Type/Interfaces';
import { getUserAssetInfo, postCreateItem } from '../../../Api';
import { useRecoilState } from 'recoil';
import { userInfoAtom, isNovelAtom } from '../../../Store/Atoms';
import Loading from '../../../Components/Loading';

const ModalNoItem = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isNovel, setIsNovel] = useRecoilState(isNovelAtom);
  const [tryCount, setTryCount] = useState(0);
  const [nowToken, setNowToken] = useState(0);
  const [nowCookie, setNowCookie] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateClick = () => {
    setIsLoading(true);
    postCreateItem(userInfo.accessToken, params.id).then((res) => {
      setIsLoading(false);
      if (res.result === 'ok') {
        navigate(`/work/viewer/${params.id}/draw`);
      } else if (res.result === 'fail') {
        navigate(`/work/viewer/${params.id}/fail`);
      } else {
        setTryCount((prev) => prev + 1);
      }
    });
  };

  const handleUseClick = () => {
    navigate(`/work/viewer/${params.id}/using`);
  };

  useEffect(() => {
    try {
      getUserAssetInfo(userInfo.accessToken).then((res) => {
        setNowToken(res.content.token);
        setNowCookie(res.content.cookie);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <ModalContainer>
        <ModalBox>
          <img src={Icon_x} alt="close button" className="close_btn" onClick={closeModal} />
          {tryCount === 0 ? (
            <h3>
              원하는 행동을 하기 위해서는
              <br />[{params.id}]가 필요해요
            </h3>
          ) : (
            <h3>
              획득에 <span>실패</span>했어요.
              <br />
              다음 기회를 노려보세요!
            </h3>
          )}
          <Btn_Container>
            <Btn_Modal_Primary
              label={`[${params.id}] 확률로 획득하기`}
              onClick={handleCreateClick}
              nowToken={nowToken}
            />
            <Btn_Modal_White
              label={`[${params.id}] 구입하기`}
              onClick={() => {
                navigate(`/market`);
                setIsNovel({
                  isNovel: false,
                  title: '',
                  current: 0,
                  novelId: 0,
                });
              }}
            />
            <Btn_Modal_Black
              label={`쿠키 1개로 [${params.id}] 1회 이용하기`}
              onClick={handleUseClick}
              nowToken={nowCookie}
            />
          </Btn_Container>
        </ModalBox>
      </ModalContainer>
      {isLoading && <Loading />}
    </>
  );
};

export default ModalNoItem;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 305px;
  padding: 0 24px;
  padding-top: 44px;
  position: relative;
  .close_btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 10px;
  }
  h3 {
    ${({ theme }) => theme.mixin.textStyle.M_15}
    text-align: center;
    line-height: 1.5;
    span {
      color: #ff5e5e;
    }
  }
  .cookie {
    margin-top: 10px;
    ${({ theme }) => theme.mixin.textStyle.M_12}
  }
`;

const Btn_Container = styled.div`
  display: grid;
  width: 100%;
  margin-top: 20px;
  grid-row-gap: 10px;
`;

const Btn_Modal_Primary = ({ onClick, label, nowToken }: IBtn) => {
  const [isNoKlay, setIsNoKlay] = useState(true);

  useEffect(() => {
    if (nowToken) {
      setIsNoKlay(nowToken < 1 ? true : false);
    }
  }, [nowToken]);

  return (
    <Primary
      onClick={() => {
        if (!isNoKlay) {
          onClick && onClick();
        }
      }}
      isNoKlay={isNoKlay}
    >
      <span>{label}</span>
      <span className="black">-1KALY</span>
    </Primary>
  );
};

const Btn_Modal_White = ({ onClick, label }: IBtn) => {
  return (
    <White onClick={onClick}>
      <span>{label}</span>
      <p>다른 소설에서도 10번 무료로 쓸 수 있어요.</p>
    </White>
  );
};

const Btn_Modal_Black = ({ onClick, label, nowToken }: IBtn) => {
  const [isNoCookie, setIsNoCookie] = useState(true);

  useEffect(() => {
    if (nowToken) {
      setIsNoCookie(nowToken < 1 ? true : false);
    }
  }, [nowToken]);

  return (
    <Black
      onClick={() => {
        if (!isNoCookie) {
          onClick && onClick();
        }
      }}
      isNoCookie={isNoCookie}
    >
      {label}
    </Black>
  );
};

const Common = styled.button`
  ${({ theme }) => theme.mixin.flexCenter}
  ${({ theme }) => theme.mixin.textStyle.M_12}
  border-radius: 15px;
  width: 100%;
  height: 40px;
  .label {
  }
`;

const Primary = styled(Common)<{ isNoKlay: boolean }>`
  background-color: ${({ theme }) => theme.variable.colors.highlight_color};
  color: ${({ theme }) => theme.variable.colors.A_FFF};
  opacity: ${(props) => (props.isNoKlay ? '0.5' : '1')};
  .black {
    color: ${({ theme }) => theme.variable.colors.black_color};
    margin-left: 6px;
  }
`;
const White = styled(Common)`
  background-color: ${({ theme }) => theme.variable.colors.A_FFF};
  color: ${({ theme }) => theme.variable.colors.black_color};
  flex-direction: column;
  height: 56px;
  p {
    margin-top: 3px;
  }
`;
const Black = styled(Common)<{ isNoCookie: boolean }>`
  background-color: ${({ theme }) => theme.variable.colors.black_color};
  color: ${({ theme }) => theme.variable.colors.A_FFF};
  opacity: ${(props) => (props.isNoCookie ? '0.3' : '1')};
`;
