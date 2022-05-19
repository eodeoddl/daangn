import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DEFAULTIMG = '/logo192.png';

const Anchor = ({ item, className }) => (
  <Link className={className} to={`/detail/${item.serialNumber}`}>
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
);

const StyledItemAnchor = styled(Anchor)`
  .& {
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
  }
`;

export default StyledItemAnchor;
