import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { Btn_Modal_Primary } from '../../../Components/ButtonModal';
import SignatureCanvas from 'react-signature-canvas';
import { postItemImage } from '../../../Api';
import { useRecoilState } from 'recoil';
import { optionTriggerAtom, userInfoAtom } from '../../../Store/Atoms';
import Loading from '../../../Components/Loading';

const ModalDraw = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();
  const signCanvas = useRef() as React.MutableRefObject<any>;
  const params = useParams();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [optionTrigger, setOptionTrigger] = useRecoilState(optionTriggerAtom);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const clear = () => {
    signCanvas.current.clear();
  };

  const handleClick = () => {
    const dataURL = signCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    setLoading(true);
    params.id &&
      postItemImage(userInfo.accessToken, dataURL, params.id)
        .then((res) => {
          setLoading(false);
          setOptionTrigger((prev) => !prev);
          closeModal();
        })
        .catch((e) => {
          console.log('이미지 생성 실패', e);
          navigate(`/work/viewer/${params.id}/noitem`);
        });
  };

  return (
    <>
      <ModalContainer>
        <ModalBox>
          <h3>[{params.id}] 획득 성공!</h3>
          <p className="desc">나만의 [{params.id}]를 그려보세요.</p>
          <Canvas_Container>
            <SignatureCanvas
              ref={signCanvas}
              canvasProps={{ className: 'sigCanvas canvasStyle' }}
              backgroundColor="#fff"
              penColor="#000"
            />
            <span className="clear_btn" onClick={clear}>
              지우기
            </span>
          </Canvas_Container>
          <p className="warning">*부적절한 그림은 운영사 임의로 거래가 금지될 수 있습니다.</p>
          {isEmpty && <p className="empty">*그림을 그려주세요</p>}

          <Btn_Modal_Primary label="완료" onClick={handleClick} />
        </ModalBox>
      </ModalContainer>
      {isLoading && <Loading />}
    </>
  );
};

export default ModalDraw;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 570px;
  padding: 0 22px;
  padding-top: 44px;
  position: relative;
  .close_btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 10px;
  }
  h3 {
    ${({ theme }) => theme.mixin.textStyle.M_18}
    text-align: center;
    color: ${({ theme }) => theme.variable.colors.highlight_color};
  }
  .desc {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    margin-top: 10px;
  }
  .warning {
    ${({ theme }) => theme.mixin.textStyle.M_11}
    margin-top: 6px;
    margin-bottom: 15px;
  }
  .empty {
    text-align: left;
    ${({ theme }) => theme.mixin.textStyle.M_13}
    color: #ff5e5e;
    margin-bottom: 40px;
  }
`;

const Canvas_Container = styled.div`
  width: 100%;
  height: calc(100vw - 88px);
  background-color: #999;
  margin-top: 30px;
  position: relative;
  .canvasStyle {
    width: 100%;
    height: 100%;
  }
  .clear_btn {
    position: absolute;
    right: 14px;
    bottom: 11px;
    ${({ theme }) => theme.mixin.textStyle.M_13}
  }
`;
