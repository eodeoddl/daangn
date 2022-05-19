import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { MoreButton } from '../publicStyle/moreButton.jsx';

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

          .item_price {
            color: ${({ theme }) => theme.colors.lightOrange};
            font-weight: 600;
            font-size: 15px;
            margin-top: 6px;
            line-height: 18px;
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

const SearchResult = ({ match, searchedItem }) => {
  const [itemList, setItemList] = useState(searchedItem);
  const [loadingIdx, setLoadingIdx] = useState(6);
  const [loading, setLoading] = useState(false);

  console.log('match.params.searchTerm :', match.params.searchTerm);
  console.log('itemList : ', itemList);
  console.log('searchResult render');

  // 검색리스트 업데이트시에 최신 목록 6개 보여주기
  useEffect(() => {
    setItemList(searchedItem.slice(0, loadingIdx));
  }, [searchedItem, loadingIdx]);

  // searchTerm이 바뀌었을때 idx값 초기값으로 설정
  useEffect(() => {
    setLoadingIdx(6);
  }, [searchedItem]);

  let timer = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  // 새로운 목록6개씩 로딩(idx값 증가)
  const handleLoading = async () => {
    setLoading(true);
    await timer(1000).then(() => {
      setLoadingIdx((prevIdx) => prevIdx + 6);
    });
    setLoading(false);
  };

  return (
    <Container>
      <div className='result'>
        <p className='title'>중고거래</p>
        <div className='wrapper'>
          {itemList &&
            itemList.map((item, i) => {
              return (
                <article className='item' key={i}>
                  <Link
                    className='anchor'
                    to={{
                      pathname: `/article/${item.id}`,
                      state: {
                        data: item,
                      },
                    }}
                  >
                    <div className='imgWrapper'>
                      <img src={item.img} alt='item-img' className='img' />
                    </div>
                    <div className='article_info'>
                      <p className='item_title'>{item.item_title}</p>
                      <p className='item_desc'>{item.item_desc}</p>
                      <p className='item_region'>{item.street}</p>
                      <p className='item_price'>3333333원</p>
                    </div>
                  </Link>
                </article>
              );
            })}
        </div>
        <MoreButton handleLoading={handleLoading} loadingState={loading} />
      </div>
    </Container>
  );
};
export default withRouter(SearchResult);
