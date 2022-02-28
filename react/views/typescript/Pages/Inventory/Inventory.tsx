import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Primary_FontBlack } from '../../Components/Button';
import ItemCard from './ItemCard';
import ModalCancleSelling from './Modal/ModalCancleSelling';
import ModalCompleteCancle from './Modal/ModalCompleteCancle';
import ModalCompleteSelling from './Modal/ModalCompleteSelling';
import ModalSelling from './Modal/ModalSelling';
import { getMyItemInfo, getUserAssetInfo } from '../../Api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { inventoryTriggerAtom, userInfoAtom } from '../../Store/Atoms';

const Inventory = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [inventoryTrigger, setInventoryTrigger] = useRecoilState(inventoryTriggerAtom);
  const [list, setList] = useState([] as any);
  const [item, setItem] = useState({
    name: '',
    image: '',
    isFreeToken: false,
    durability: 0,
    maxDurability: 0,
    onSale: false,
    price: 0,
  });
  const [klay, setKlay] = useState(0);

  const closeModal = () => {
    navigate('/inventory');
  };

  useEffect(() => {
    getMyItemInfo(userInfo.accessToken).then((res) => {
      setList(res.items);
    });
    getUserAssetInfo(userInfo.accessToken).then((res) => {
      setKlay(res.content.token);
    });
  }, []);

  useEffect(() => {
    getMyItemInfo(userInfo.accessToken).then((res) => {
      setList(res.items);
    });
    getUserAssetInfo(userInfo.accessToken).then((res) => {
      setKlay(res.content.token);
    });
  }, [inventoryTrigger]);

  return (
    <>
      <Container>
        <Btn_Primary_FontBlack label="인벤토리" />
        <p className="my_klay">{klay} KLAY</p>
        <h3 className="list_title">내 소재</h3>
        <section className="item_list">
          {list.map((item: any, idx: any) => (
            <ItemCard
              key={idx}
              id={item.id}
              name={item.name}
              durability={item.durability}
              isFreeToken={item.isFreeToken}
              maxDurability={item.maxDurability}
              imageURI={item.imageURI}
              onSale={item.price !== '0' ? true : false}
              price={item.price ? item.price : 0}
              setItem={setItem}
            />
          ))}
        </section>
      </Container>
      <Routes>
        <Route path="/selling" element={<ModalSelling closeModal={closeModal} item={item} />} />
        <Route path="/completeselling" element={<ModalCompleteSelling closeModal={closeModal} />} />
        <Route
          path="/cancleselling"
          element={<ModalCancleSelling closeModal={closeModal} item={item} />}
        />
        <Route
          path="/completecancle"
          element={<ModalCompleteCancle closeModal={closeModal} item={item} />}
        />
      </Routes>
    </>
  );
};

export default Inventory;

const Container = styled.div`
  ${({ theme }) => theme.mixin.paddingSide_depth1}
  ${({ theme }) => theme.mixin.paddingTopBottom}
  >button {
    height: 44px;
  }
  .my_klay {
    color: #a2a4b7;
    ${({ theme }) => theme.mixin.textStyle.R_12}
    margin-top: 15px;
  }
  .list_title {
    ${({ theme }) => theme.mixin.textStyle.M_16}
    margin-top: 45px;
  }
  .item_list {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
`;
