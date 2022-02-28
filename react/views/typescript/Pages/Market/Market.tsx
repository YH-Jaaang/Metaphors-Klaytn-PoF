import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import styled from 'styled-components';
import { Btn_Primary_FontBlack } from '../../Components/Button';
import { IItemMarket } from '../../Store/Type/Interfaces';
import Icon_search from '../../Assets/Images/Icon_search.png';
import Icon_cookieCharge from '../../Assets/Images/Icon_cookieCharge.png';
import ItemCard_Market from './ItemCard_Market';
import ModalBuying from './Modal/ModalBuying';
import ModalCompleteBuying from './Modal/ModalCompleteBuying';
import { getNftForSaleItems, getUserAssetInfo, searchNftForSaleItems } from '../../Api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { marketTriggerAtom, userInfoAtom } from '../../Store/Atoms';

const Market = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);
  const [marketTrigger, setMarketTrigger] = useRecoilState(marketTriggerAtom);

  const closeModal = () => {
    navigate('/market');
  };

  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState('');
  const [list, setList] = useState<IItemMarket[]>();
  const [item, setItem] = useState<IItemMarket>({
    id: '',
    name: '',
    ownerNickname: '',
    imageURI: '',
    maxDurability: '',
    durability: '',
    price: '',
  });
  const [klay, setKlay] = useState(0);

  useEffect(() => {
    getNftForSaleItems().then((res) => {
      setList(res.content);
    });
    getUserAssetInfo(userInfo.accessToken).then((res) => {
      setKlay(res.content.token);
    });
  }, [marketTrigger]);

  useEffect(() => {
    if (userInfo.accessToken != '') {
      searchNftForSaleItems(userInfo.accessToken, name, isChecked).then((res) => {
        setList(res.content);
      });
    }
  }, [isChecked]);

  return (
    <>
      <Container>
        <Btn_Primary_FontBlack label="거래소" />
        {userInfo.accessToken != '' && (
          <>
            <p
              className="my_klay"
              onClick={() => {
                navigate('/chargeklay');
              }}
            >
              <span>{klay} KLAY</span>
              <img src={Icon_cookieCharge} alt="charge icon" className="charge_icon" />
            </p>
            <div className="searchbox">
              <img
                src={Icon_search}
                alt="search"
                className="search_icon"
                onClick={() => {
                  searchNftForSaleItems(userInfo.accessToken, name, isChecked).then((res) => {
                    setList(res.content);
                  });
                }}
              />
              <input
                type="text"
                className="search"
                placeholder="소재 이름으로 검색하기"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
              <div className="checkbox_box">
                <input
                  type="checkbox"
                  onChange={() => {
                    setIsChecked((prev) => !prev);
                  }}
                />
                <span>내가 판매 중인 물품 제외</span>
              </div>
            </div>
          </>
        )}
        <section className="item_list">
          {list &&
            list.map((cont, idx) => (
              <ItemCard_Market
                key={idx}
                id={cont.id}
                name={cont.name}
                durability={cont.durability}
                maxDurability={cont.maxDurability}
                imageURI={cont.imageURI}
                price={cont.price ? cont.price : '0'}
                ownerNickname={cont.ownerNickname}
                setItem={setItem}
              />
            ))}
        </section>
      </Container>
      <Routes>
        <Route
          path="/buying"
          element={<ModalBuying closeModal={closeModal} item={item} klay={klay} />}
        />
        <Route path="/completebuying" element={<ModalCompleteBuying closeModal={closeModal} />} />
      </Routes>
    </>
  );
};

export default Market;

const Container = styled.div`
  ${({ theme }) => theme.mixin.paddingSide_depth1}
  ${({ theme }) => theme.mixin.paddingTopBottom}
  > button {
    height: 44px;
  }
  .my_klay {
    color: #a2a4b7;
    ${({ theme }) => theme.mixin.textStyle.R_12}
    margin-top: 15px;
    border-radius: 15px;
    border: 1px solid #fff;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 120px;
    .charge_icon {
      width: 13px;
    }
    span {
      padding-top: 3px;
    }
  }
  .searchbox {
    margin-top: 30px;
    position: relative;
    .search {
      width: 100%;
      background-color: #24253a;
      ${({ theme }) => theme.mixin.textStyle.R_16}
      padding: 8px 22px;
      border-radius: 20px;
    }
    .search_icon {
      position: absolute;
      width: 16px;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
    .checkbox_box {
      position: absolute;
      bottom: -30px;
      right: 0;
      display: flex;
      align-items: center;
      ${({ theme }) => theme.mixin.textStyle.R_12}
      color: #c2c2c2;
      height: 20px;
      span {
        padding-top: 3px;
      }
      input {
        background-color: #373850;
        border: 0;
      }
    }
  }
  .item_list {
    margin-top: 56px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 100%;
  }
`;
