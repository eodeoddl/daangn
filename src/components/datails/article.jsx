import React, { useEffect, useRef, useState } from 'react';
import { withRouter, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Carosual from '../publicStyle/carosual';
import LatestItem from '../search/latestItem';

const Container = styled.article`
  margin-top: 100px;

  .article-image {
    margin: 0 auto;
    width: 729px;
    height: 500px;
    position: relative;

    .next-btn {
      position: absolute;
      right: 0;
      top: 240px;
      border: none;
      background: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/icon-slider-right-134c53f44716c3bef227ec30da385b4b09c9c068d339a617a23093718f379d02.svg)
        no-repeat;
      width: 11px;
      height: 21px;
    }

    .next-btn:hover {
      transform: scale(1.15);
      background: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/icon-slider-right-hover-c71a5a4d1745bf59f056660eadc57e451f619b5bddaff0c9fdf2f8e3b4d955f8.svg)
        no-repeat;
    }

    .prev-btn {
      position: absolute;
      left: 0;
      top: 240px;
      border: none;
      background: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/icon-slider-left-4c0e713bfa2cd12bd959e6dd9ef456cd6fc094953c41e605f6b9a59bc1680686.svg)
        no-repeat;
      width: 11px;
      height: 21px;
    }

    .prev-btn:hover {
      transform: scale(1.15);
      background: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/articles/icon-slider-left-hover-bbda49cc160e798261c2dd4894cc623d0118a701fbb705546fc06de658ce3996.svg)
        no-repeat;
    }
  }

  .article-profile {
    width: 677px;
    margin: 0 auto;
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 23px;
    margin-top: 25px;

    .space-between {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .profile-image {
      display: inline-block;
    }

    .profile-image img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-left {
      display: inline-block;
      margin-left: 8px;

      .nickname {
        font-size: 15px;
        font-weight: 600;
        line-height: 1.5;
        letter-spacing: -0.6px;
        color: #212529;
      }

      .region-name {
        font-size: 13px;
        line-height: 1.46;
        letter-spacing: -0.6px;
        color: #212529;
      }
    }

    .profile-right {
    }
  }

  .article-description {
    padding: 32px 0;
    border-bottom: 2px solid #e9ecef;
    width: 677px;
    margin: 0 auto;

    .title {
      font-size: 20px;
      line-height: 1.5;
      font-weight: 700;
      letter-spacing: -0.6px;
    }

    .cartegory {
      margin-top: 4px;
      font-size: 13px;
      line-hieght: 1.46;
      letter-spacing: -0.6px;
      color: #868e96;
    }

    .detail {
      margin-top: 8px;
      margin-bottom: 16px;
    }

    .detail p {
      font-size: 17px;
      line-height: 1.6;
      letter-spacing: -0.6px;
      margin: 16px 0;
      word-break: break-all;
    }

    .price {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.76;
      letter-spacing: -0.6px;
      margin-top: 4px;
    }

    .cartegory {
    }
  }
  .more-item {
    width: 677px;
    margin: 0 auto;
  }
`;

const Article = ({ fireStore, latestItemList, handleShowModal }) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [articleData, setArticleData] = useState(null);
  const slideTrackRef = useRef(null);
  // const [imgSrc, setImgSrc] = useState(null);

  const { articleId } = useParams();
  console.log(articleId);
  // const

  useEffect(() => {
    const fetchingData = async () => {
      const data = await fireStore.getArticleById(articleId);
      console.log(data);
      const { uploaded } = data;
      console.log(uploaded.toDate());
      setArticleData(data);
    };
    fetchingData();
  }, [articleId, fireStore]);

  console.log('slideTrackRef', slideTrackRef);
  console.log('slideIdx', slideIdx);

  const onClickDot = () => {
    console.log('dot click');
  };

  const onClickNext = () => {
    console.log('next');
    setSlideIdx((prevIdx) => {
      if (prevIdx >= articleData.image.length - 1) return 0;
      // else slideTrackRef.current.style.transition = 'transform 0.5s ease-in-out';
      else slideTrackRef.current.addTransition();
      return prevIdx + 1;
    });
  };

  const onClickPrev = () => {
    setSlideIdx((prevIdx) => {
      if (prevIdx <= 0) return articleData.image.length - 1;
      // else slideTrackRef.current.style.transition = 'transform 0.5s ease-in out';
      else slideTrackRef.current.addTransition();
      return prevIdx - 1;
    });
  };

  return (
    articleData && (
      <Container>
        {/* <Route exact path='/image'>
        <Portal idSelector='image-madal-container'>
          <Carosual
            imgSrc={imgSrc}
            id={id}
            slideIdx={slideIdx}
            ref={slideTrackRef}
          />
        </Portal>
      </Route> */}
        <section className='article-image'>
          <Carosual
            imgSrc={articleData.image}
            id={articleData.id}
            slideIdx={slideIdx}
            handleShowModal={handleShowModal}
            ref={slideTrackRef}
          />
          <button className='prev-btn' onClick={onClickPrev} />
          <button className='next-btn' onClick={onClickNext} />
        </section>
        <section className='article-profile'>
          <Link to={'aaa'}>
            <div className='space-between'>
              <div>
                <div className='profile-image'>
                  <img alt='사용자 닉네임' src='/logo192.png' />
                </div>
                <div className='profile-left'>
                  <div className='nickname'>
                    {articleData.displayName
                      ? articleData.displayName
                      : '닉네임'}
                  </div>
                  <div className='region-name'>
                    {articleData.region_B.address_name}
                  </div>
                </div>
              </div>
              <div className='profile-right'>오른쪽 아이콘</div>
            </div>
          </Link>
        </section>
        <section className='article-description'>
          <h1 className='title'>{articleData.title}</h1>
          <p className='cartegory'>{articleData.cartegory}</p>
          <p className='price'>{articleData.price}원</p>
          <div className='detail'>
            <p>{articleData.description}</p>
          </div>
        </section>
        <section className='more-item'>
          <LatestItem latestItemList={latestItemList} />
        </section>
      </Container>
    )
  );
};

export default withRouter(Article);
