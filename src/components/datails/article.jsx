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

const Article = ({ match, location, latestItemList, handleShowModal }) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [articleData, setArticleData] = useState(null);
  const slideTrackRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const { articleId } = useParams();
  console.log(articleId);

  // data 초기값설정.. data는 location.state.data or useParams의 articleId를 이용해서 fireStore로 직접가져오기.
  useEffect(() => {
    const data = location.state.data;
    // const data = location.state.data || 'fireStoreApi';
    const { id, img, city, street, item_title, item_desc } = data;
    console.log('id', id);
    setArticleData({
      id,
      img,
      city,
      street,
      item_title,
      item_desc,
    });

    setImgSrc([
      img,
      'http://placeimg.com/500/800/animals',
      'http://placeimg.com/640/480/animals',
    ]);
  }, [location.state.data]);

  console.log('slideTrackRef', slideTrackRef);
  console.log('match.params.articleId :', match.params.articleId);
  console.log('location.state.data :', location.state.data);
  console.log('match', match);
  console.log('slideIdx', slideIdx);

  const onClickDot = () => {
    console.log('dot click');
  };

  const onClickNext = () => {
    console.log('next');
    setSlideIdx((prevIdx) => {
      if (prevIdx >= imgSrc.length - 1) return 0;
      // else slideTrackRef.current.style.transition = 'transform 0.5s ease-in-out';
      else slideTrackRef.current.addTransition();
      return prevIdx + 1;
    });
  };

  const onClickPrev = () => {
    setSlideIdx((prevIdx) => {
      if (prevIdx <= 0) return imgSrc.length - 1;
      // else slideTrackRef.current.style.transition = 'transform 0.5s ease-in out';
      else slideTrackRef.current.addTransition();
      return prevIdx - 1;
    });
  };
  //  이걸 쓴 이유? ㅋ
  // useEffect(() => {
  //   setSlideIdx(0);
  // }, []);

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
            imgSrc={imgSrc}
            id={articleData.id}
            slideIdx={slideIdx}
            handleShowModal={handleShowModal}
            // itemDataApi={itemDataApi}
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
                  <div className='nickname'>닉네임</div>
                  <div className='region-name'>{`${articleData.city} ${articleData.street}`}</div>
                </div>
              </div>
              <div className='profile-right'>오른쪽 아이콘</div>
            </div>
          </Link>
        </section>
        <section className='article-description'>
          <h1 className='title'>{articleData.item_title}</h1>
          <p className='cartegory'>아이템 분류</p>
          <p className='price'>333333원</p>
          <div className='detail'>
            <p>{articleData.item_desc}</p>
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
