import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Icon_onSale from '../../Assets/Images/Icon_onSale.png';
import { getImage } from '../../Api';

interface ItemCardProps {
  id: string;
  name: string;
  imageURI: string;
  durability: number;
  maxDurability: number;
  onSale: boolean;
  price?: number;
  isFreeToken: boolean;
  setItem: any;
}

const ItemCard = ({
  id,
  name,
  imageURI,
  durability,
  maxDurability,
  price,
  onSale,
  isFreeToken,
  setItem,
}: ItemCardProps) => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');

  useEffect(() => {
    if (isFreeToken) {
      setImage(imageURI);
    } else {
      getImage(imageURI).then((res) => {
        setImage(res);
      });
    }
  }, [id]);

  return (
    <>
      {onSale ? (
        <Container_onSale>
          <div className="image">
            <img src={image} style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="contents">
            <span className="onSale_mark">
              <img src={Icon_onSale} alt="icon" /> 판매 중
            </span>
            <h4 className="title">{name}</h4>
            <span className="dutability">
              {durability}/{maxDurability}회 남음
            </span>
            <span className="price">{price} KLAY</span>
            <span
              className="sell_btn"
              onClick={() => {
                setItem({
                  id: id,
                  name: name,
                  image: image,
                  durability: durability,
                  maxDurability: maxDurability,
                  onSale: onSale,
                  price: price,
                });
                navigate('/inventory/cancleselling');
              }}
            >
              판매 취소
            </span>
          </div>
        </Container_onSale>
      ) : (
        <Container>
          <div className="image">
            <img src={image} style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="contents">
            <h4 className="title">{name}</h4>
            {!isFreeToken ? (
              <>
                <span className="dutability">
                  {durability}/{maxDurability}회 남음
                </span>
                <span
                  className="sell_btn"
                  onClick={() => {
                    setItem({
                      id: id,
                      name: name,
                      image: image,
                      durability: durability,
                      maxDurability: maxDurability,
                      onSale: onSale,
                      price: price,
                    });
                    navigate('/inventory/selling');
                  }}
                >
                  팔기
                </span>
              </>
            ) : (
              <span className="dutability">무제한</span>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default ItemCard;

const Container_onSale = styled.article`
  display: grid;
  grid-template-columns: 77px auto;
  grid-column-gap: 8px;
  padding: 12px;
  height: 100px;
  ${({ theme }) => theme.mixin.textStyle.R_12}
  background-color: #2c2e48;
  border-radius: 6px;
  .image {
    width: 100%;
    height: 77px;
    img {
      display: block;
      width: 100%;
      border-radius: 5px;
    }
  }
  .contents {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 8px;
    ${({ theme }) => theme.mixin.textStyle.R_12}
    position: relative;
    .title {
      ${({ theme }) => theme.mixin.flexCenter}
      padding: 0 9px;
      height: 20px;
      background-color: ${({ theme }) => theme.variable.colors.item_color};
      border-radius: 10px;
    }
    .dutability {
      margin-top: 8px;
      color: #a2a4b7;
    }
    .onSale_mark {
      position: absolute;
      top: 3px;
      right: 0px;
      img {
        position: absolute;
        top: 50%;
        left: -12px;
        transform: translateY(-50%);
        width: 5px;
      }
    }
    .price {
      position: absolute;
      bottom: 0px;
      left: 8px;
    }
    .sell_btn {
      position: absolute;
      bottom: 0px;
      right: 0px;
      background-color: ${({ theme }) => theme.variable.colors.btngray_color};
      border-radius: 3px;
      padding: 0 9px;
      height: 20px;
      ${({ theme }) => theme.mixin.flexCenter}
    }
  }
`;

const Container = styled.article`
  display: grid;
  grid-template-columns: 69px auto;
  grid-column-gap: 8px;
  height: 73px;
  ${({ theme }) => theme.mixin.textStyle.R_12}
  .image {
    width: 100%;
    height: 69px;
    background-color: #ffffff;
    border-radius: 5px;
  }
  .contents {
    border-bottom: 1px solid #888;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 8px;
    ${({ theme }) => theme.mixin.textStyle.R_12}
    position: relative;
    .title {
      ${({ theme }) => theme.mixin.flexCenter}
      padding: 0 9px;
      height: 20px;
      background-color: ${({ theme }) => theme.variable.colors.item_color};
      border-radius: 10px;
    }
    .dutability {
      margin-top: 8px;
    }
    .sell_btn {
      position: absolute;
      bottom: 6px;
      right: 10px;
    }
  }
`;
