import React from 'react';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { postUseItemCookie } from '../../../Api';
import { Btn_Modal_Black, Btn_Modal_White } from '../../../Components/ButtonModal';
import { userInfoAtom, changeAssetToggleAtom, useCookieAtom } from '../../../Store/Atoms';
import { INovelChoice } from '../../../Store/Type/Interfaces';

const ModalUseItem = ({
  closeModal,
  choiceList,
  novelId,
}: {
  closeModal: () => void;
  choiceList: INovelChoice[] | undefined;
  novelId: number;
}) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [changeAssetToggle, setChangeAssetToggle] = useRecoilState(changeAssetToggleAtom);
  const [useCookie, setUseCookie] = useRecoilState(useCookieAtom);
  const params = useParams();

  const getNext = (list: INovelChoice[], value: string) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].item === value) {
        return list[i].episodeId;
      }
    }
  };

  const handleUseClick = () => {
    const next = choiceList && params.id && getNext(choiceList, params.id);
    next &&
      postUseItemCookie(userInfo.accessToken, novelId.toString(), next).then((res) => {
        setChangeAssetToggle((prev) => !prev);
        setUseCookie(next);
        closeModal();
      });
  };

  return (
    <ModalContainer>
      <ModalBox>
        <h4>[{params.id}]를 사용하시겠습니까?</h4>
        <Btn_Container>
          <Btn_Modal_White label="예" onClick={handleUseClick} />
          <Btn_Modal_Black label="아니요" onClick={closeModal} />
        </Btn_Container>
      </ModalBox>
    </ModalContainer>
  );
};

export default ModalUseItem;

const ModalContainer = styled.div`
  ${({ theme }) => theme.mixin.modalContainer}
`;

const ModalBox = styled.div`
  ${({ theme }) => theme.mixin.modalBox}
  height: 193px;
  padding: 0 54px;
  padding-top: 55px;
  h4 {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    text-align: center;
    margin-bottom: 55px;
  }
`;

const Btn_Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  column-gap: 28px;
`;
