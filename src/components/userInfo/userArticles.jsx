import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { ThemeProvider } from 'styled-components';

const Section = styled.section`
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
  .card-wrap {
    margin: 0 auto;
    width: calc(33% - 16px);
  }

  .card {
    width: 100%;
    margin-right: 16px;
    margin-bottom: 56px; 
  }
  .anchor {
    text-decoration: none;
    color: #212529;
  }
  .img-wrap {
    position: relative;
    padding-top : 100%;
    overflow: hidden;
    border-radius: 12px;
  }

  .img{ 
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 12px;
    border: 1px solid black;
    object-fit: cover;
  }

  .card-desc {
    padding-top: 12px;
  }

  .title {
    text-overflow: ellipsis;
    font-size: 16px;
    color: color: #212529;
    font-weight: normal;
    margin-bottom: 4px;
  }

  .price {
    font-size : 15px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .region {
    margin-bottom: 4px;
    font-size: 15px;
  }
`;

const UserArticles = ({ fireStore, uid }) => {
  const [article, setArticle] = useState(null); //
  console.log(fireStore.getUserArticle);
  console.log(uid);
  useEffect(() => {
    fireStore.getUserArticle(uid, setArticle);
  }, [fireStore, uid]);
  return (
    article && (
      <Section>
        {article.map((item) => {
          return (
            <div className='card-wrap' key={item.id}>
              <div className='card'>
                <Link
                  className='anchor'
                  to={{
                    pathname: `/article/${item.id}`,
                    state: {
                      data: {
                        id: item.id,
                        img: 'http://placeimg.com/640/480/animals',
                        city: '청주시',
                        street: '흥덕구',
                        item_title: item.data.title,
                        item_desc: item.data.description,
                      },
                    },
                  }}
                >
                  <div className='img-wrap'>
                    <img
                      src='http://placeimg.com/640/480/animals'
                      alt='img'
                      className='img'
                    />
                  </div>
                  <div className='card-desc'>
                    <p className='title'>{item.data.title}</p>
                    <div className='price'>{item.data.price}원</div>
                    <div className='region'>청주시 흥덕구</div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </Section>
    )
  );
};

export default memo(UserArticles);
