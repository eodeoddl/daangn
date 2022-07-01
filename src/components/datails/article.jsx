import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArticleFooter from '../footer/articleFooter';
import Portal from '../portal/portal';
import Carousel from '../publicStyle/carousel';
import LatestItem from '../search/latestItem';
import { CgClose } from 'react-icons/cg';
import { MoreButton } from '../publicStyle/moreButton';

const Container = styled.article`
  margin-top: 100px;

  .article-image {
    margin: 0 auto;
    width: 729px;
    height: 500px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
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
  }
  .more-item {
    width: 677px;
    margin: 0 auto;
  }
`;

const ModalContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  z-index: 9999;
  display: flex;
  justify-content: center;

  .image-container {
    width: 80%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 7em;
    background-color: transparent;
    border: none;
    appearance: none;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const Article = ({
  fireStore,
  latestItemList,
  userInfo,
  handleLoading,
  moreLoading,
}) => {
  const [articleData, setArticleData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { articleId } = useParams();

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

  return (
    articleData && (
      <>
        <Container>
          <section className='article-image' onClick={() => setShowModal(true)}>
            <Carousel images={articleData.image} withButton={true} />
          </section>
          <section className='article-profile'>
            <Link to={`/user/${articleData.displayName}`}>
              <div className='space-between'>
                <div>
                  <div className='profile-image'>
                    <img
                      alt='사용자 닉네임'
                      src={articleData.profileImg || '/logo192.png'}
                    />
                  </div>
                  <div className='profile-left'>
                    <div className='nickname'>
                      {articleData.displayName || '닉네임'}
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
            {/* <p className='price'>{articleData.price}원</p> */}
            <div className='detail'>
              <p>{articleData.description}</p>
            </div>
          </section>
          <section className='more-item'>
            <LatestItem latestItemList={latestItemList}>
              <MoreButton
                handleLoading={handleLoading}
                loadingState={moreLoading}
              />
            </LatestItem>
          </section>
          <ArticleFooter
            price={articleData.price}
            fireStore={fireStore}
            uid={userInfo.uid}
          />
        </Container>
        {showModal && (
          <Portal idSelector='carousel-modal'>
            <ModalContainer>
              <div className='image-container'>
                <Carousel images={articleData.image} withButton={false} />
                <button
                  className='close-btn'
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <CgClose />
                </button>
              </div>
            </ModalContainer>
          </Portal>
        )}
      </>
    )
  );
};

export default withRouter(Article);
