import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
// import { ThemeProvider } from 'styled-components';

const Section = styled.section`
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .card-wrap {
    width: 30%;
    margin-bottom: 40px;
    box-shadow: 3px 3px 4px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 5px;
  }

  .anchor {
    text-decoration: none;
    color: #212529;
  }

  .img-wrap {
    width: 100%;
    height: 200px;
    max-height: 200px;
    overflow: hidden;
    border-radius: 12px;
  }

  .img {
    width: 100%;
    height: 100%;
  }

  .card-desc {
    padding-top: 12px;
  }

  .title {
    text-overflow: ellipsis;
    font-size: 16px;
    color: #212529;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .price {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.lightOrange};
  }

  .region {
    margin-bottom: 6px;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.darkGray};
  }

  .layout-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.lightOrange};
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
  }

  .subscribe-info {
    display: flex;
    align-items: center;

    svg {
      margin-right: 3px;
    }

    span {
      font-size: 13px;
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const UserArticles = ({ fireStore, data }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getArticleData = async () => {
      const articleData = data.map((articlePath) => {
        return fireStore.readRefs(articlePath);
      });
      const result = await Promise.all(articleData);
      setArticle(result);
    };
    getArticleData();
  }, [data, fireStore]);

  return (
    article && (
      <Section>
        {article.map((item) => {
          return (
            <div className='card-wrap' key={item.id}>
              {/* <div className='card'> */}
              <Link
                className='anchor'
                to={{
                  pathname: `/article/${item.id}`,
                }}
              >
                <div className='img-wrap'>
                  <img src={item.image[0]} alt='img' className='img' />
                </div>
                <div className='card-desc'>
                  <p className='title'>{item.title}</p>
                  <div className='region'>{item.region_B.address_name}</div>
                  <div className='layout-container'>
                    <div className='price'>{item.price}원</div>
                    <div className='subscribe-info'>
                      <AiOutlineHeart />
                      <span>{item.subscribeCount || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
              {/* </div> */}
            </div>
          );
        })}
      </Section>
    )
  );
};

export default memo(UserArticles);
