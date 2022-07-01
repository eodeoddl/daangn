import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  .article_kind {
    font-weight: 600;
    font-size: 18px;
    margin: 20px 0;
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .article {
    text-align: left;
    display: inline-block;
    width: calc(33% - 34px);
    margin-right: 34px;
    margin-bottom: 40px;

    .anchor {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.black};

      .img_wrapper {
        width: 100%;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.backgroundColors.gray};
        position: relative;
        padding-top: 100%;
        overflow: hidden;

        .img {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          bottom: 0;
        }
      }

      .article_title {
        font-weight: 600;
        font-size: 16px;
        margin-top: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 18px;
      }

      .article_region {
        color: ${({ theme }) => theme.colors.darkGray};
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        margin-top: 6px;
        line-height: 18px;
      }

      .article_price {
        color: ${({ theme }) => theme.colors.lightOrange};
        font-size: 15px;
        font-weight: 600;
        line-height: 18px;
        margin-top: 6px;
      }
    }
  }
  .article:nth-child(3n) {
    margin-right: 0px;
  }
`;

// 인기중고 대체..
const LatestItem = ({ latestItemList, children }) => {
  // console.log(latestItemList.forEach());
  latestItemList.forEach((item) => {
    // return conso
    console.log(item.uploaded.toDate());
  });
  return (
    <Container>
      <p className='article_kind'>인기 중고</p>
      <div className='flex-box'>
        {latestItemList.map((item) => (
          <article className='article' key={item.id}>
            <Link
              className='anchor'
              to={{
                pathname: `/article/${item.id}`,
              }}
            >
              <div className='img_wrapper'>
                <img alt='dd' src={item.image[0]} className='img' />
              </div>
              <div className='article_info'>
                <p className='article_title'>{item.title}</p>
                <p className='article_region'>{item.region_B.address_name}</p>
                <p className='article_price'>{item.price}원</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {children}
    </Container>
  );
};

export default LatestItem;
