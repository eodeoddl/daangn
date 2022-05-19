import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.article`
  & {
    width: calc(25% - 44px);
    margin-bottom: 56px;
    margin-right: 44px;
  }
  &:nth-child(4n) {
    margin-right: 0px;
  }
  .anchor {
    text-decoration: none;
    color: #212529;
  }
  .imgWrapper {
    width: 100%;
    padding-top: 100%;
    position: relative;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.backgroundColors.gray};
    box-shadow: inset 0px 0px 0px 1px rgb(0 0 0 / 15%);
    .img {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      border-radius: 12px;
      border: 1px solid transparent;
    }
  }

  .desc {
    margin-top: 12px;
    .itemTitle {
      font-size: 16px;
      letter-spacing: -0.02px;
      color: #212529;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 4px;
      line-height: 1.5;
    }
    .price {
      font-size: 15px;
      font-weight: 700;
      line-height: 1.5;
      margin-bottom: 4px;
    }
    .region {
      font-size: 13px;
      color: #212529;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 4px;
      line-height: 1.5;
    }
    .like {
      font-size: 13px;
      color: #868e96;
    }
  }
`;
const DEFAULTIMG = '/logo192.png';
const HotItem = ({ item }) => {
  return (
    item && (
      <Item>
        <Link className='anchor' to={`/article/${item.serialNumber}`}>
          <div className='imgWrapper'>
            <img className='img' src={DEFAULTIMG} alt='hotItem-img' />
          </div>
          <div className='desc'>
            <h2 className='itemTitle'>{item.name}</h2>
            <div className='price'>{item.price}</div>
            <div className='region'>{item.region}</div>
            <span className='like'>좋아요 {item.like}</span>
          </div>
        </Link>
      </Item>
    )
  );
};

export default HotItem;
