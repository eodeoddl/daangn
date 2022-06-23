import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { MoreButton } from '../publicStyle/moreButton.jsx';
import { AiOutlineHeart } from 'react-icons/ai';

const Container = styled.section`
  & {
    background-color: ${({ theme }) => theme.backgroundColors.gray};
    padding: 30px 0 40px 0;
  }

  .result {
    border-radius: 8px;
    border: 1px solid #ccc9c5;
    width: 800px;
    margin: 0 auto;
    margin-bottom: 20px;
    background: #fff;

    .title {
      font-weight: 600;
      font-size: 18px;
      margin: 20px 0;
      text-align: center;
    }

    .wrapper {
      padding: 0 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .item {
        width: 30%;
        margin-bottom: 40px;
        box-shadow: 3px 3px 4px 5px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 5px;

        .anchor {
          text-decoration: none;
          color: #212529;
        }

        .imgWrapper {
          border-radius: 12px;
          width: 100%;
          height: 200px;
          max-height: 200px;
          overflow: hidden;

          .img {
            width: 100%;
            height: 100%;
            object-fit: fill;
          }
        }

        .article_info {
          color: ${({ theme }) => theme.colors.black};

          .item_title {
            font-weight: 600;
            font-size: 16px;
            margin-top: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .item_desc {
            display: none;
          }

          .item_region {
            color: ${({ theme }) => theme.colors.darkGray};
            font-size: 14px;
            line-height: 18px;
            margin-top: 6px;
          }

          .layout-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 6px;
            // margin
            color: ${({ theme }) => theme.colors.lightOrange};
            font-weight: 600;
            font-size: 15px;
            line-height: 18px;
          }

          .subscribe-info {
            display: flex;
            align-items: center;
          }

          .subscribe-info span {
            color: ${({ theme }) => theme.colors.black};
            font-size: 13px;
          }

          .subscribe-info svg {
            margin-right: 3px;
            alignment-baseline: baseline;
          }
        }
      }

      .item:nth-child(3n) {
        margin-right: 0;
      }
    }

    .moreBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.darkGray};
      border-top: 1px solid #e9ecef;
      height: 50px;
    }
  }
`;

const SearchResult = ({ match, searchedItem, handleLoading, loadingState }) => {
  return (
    <Container>
      <div className='result'>
        <p className='title'>중고거래</p>
        <div className='wrapper'>
          {searchedItem &&
            searchedItem.map((article, i) => {
              return (
                <article className='item' key={i}>
                  <Link
                    className='anchor'
                    to={{
                      pathname: `/article/${article.articleId}`,
                      state: {
                        data: article,
                      },
                    }}
                  >
                    <div className='imgWrapper'>
                      <img
                        src={article.image[0]}
                        alt='item-img'
                        className='img'
                      />
                    </div>
                    <div className='article_info'>
                      <p className='item_title'>{article.title}</p>
                      <p className='item_desc'>{article.description}</p>
                      <p className='item_region'>
                        {article.region_B.address_name}
                      </p>
                      <div className='layout-container'>
                        <p className='item_price'>{article.price}원</p>
                        <div className='subscribe-info'>
                          <AiOutlineHeart />
                          <span>
                            {article.subscribe ? article.subscribe : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
        </div>
        <MoreButton handleLoading={handleLoading} loadingState={loadingState} />
      </div>
    </Container>
  );
};
export default withRouter(SearchResult);
