import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MoreButton } from '../publicStyle/moreButton';

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
const LatestItem = ({ fireStore }) => {
  const [latestItemList, setLatestItemList] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);
  const { searchTerm } = useParams();
  const limitCount = 6;

  useEffect(() => {
    console.log('search Term이 바뀔때마다 실행되는 useEffect 입니다.');
    setLatestItemList([]);
    fireStore.initializeCursor('resent');
    const fetchingData = async () => {
      const latestArticles = await fireStore.getLatestArticle(limitCount);
      setLatestItemList((prevState) => {
        return [...prevState, ...latestArticles];
      });
    };
    fetchingData();

    return () => {
      fireStore.initializeCursor('resent');
    };
  }, [searchTerm, fireStore]);

  const handleLoading = async () => {
    setMoreLoading(true);
    const latestArticles = await fireStore.getLatestArticle(limitCount);
    setLatestItemList((prevState) => {
      return [...prevState, ...latestArticles];
    });
    setMoreLoading(false);
  };

  return (
    <Container>
      <p className='article_kind'>인기 중고</p>
      <div className='flex-box'>
        {latestItemList.map((item, i) => (
          <article className='article' key={i}>
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
      <MoreButton handleLoading={handleLoading} loadingState={moreLoading} />
    </Container>
  );
};

export default LatestItem;
