import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

const Footer = styled.div`
  height: 10vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.1);

  .container {
    display: flex;
    align-items: center;
    width: 677px;
    height: 100%;
    margin: 0 auto;
  }

  .text {
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    color: ${({ theme }) => theme.colors.black};
    margin-left: 20px;
  }

  .text a {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.lightOrange};
  }

  button {
    background-color: transparent;
    padding: 10px;
    border: none;
    appearance: none;
    box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.1);

    svg {
      font-size: 40px;
    }

    .onSubscribe {
      color: ${({ theme }) => theme.colors.lightOrange};
    }
  }

  .subscribe-btn {
    position: relative;

    .subscribe-guide {
      display: none;
      position: absolute;
      background-color: ${({ theme }) => theme.backgroundColors.white};
      width: 200px;
      bottom: 110%;
      left: 50%;
      border-radius: 3px;
      box-shadow: 0.2em 0.1em 0.7em 0.3em rgba(0, 0, 0, 0.7);
      font-size: 13px;
      font-weight: 600;
    }

    .subscribe-guide:before {
      content: '';
      position: absolute;
      left: 5%;
      top: 100%;
      border-top: 7px solid ${({ theme }) => theme.backgroundColors.white};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
  }

  .subscribe-btn:hover svg {
    transform: scale(1.2);
    color: ${({ theme }) => theme.colors.lightOrange};
  }

  .chat-btn {
    width: 100px;
    heigth: 33%;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    border-radius: 4px;

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

const ArticleFooter = ({ price, subscribeList, fireStore, uid }) => {
  const subscribeGuide = useRef(null);
  const { articleId } = useParams();
  const [subscribe, setSubscribe] = useState(() => {
    for (const list of subscribeList) {
      if (list.includes(articleId)) return true;
    }
    return false;
  });

  useEffect(() => {
    // ??????????????? ?????? ???????????? ????????? ?????????????????? ???????????? x.
    if (!uid) return;
    fireStore.addSubscribeList(uid, articleId, subscribe);
  }, [articleId, fireStore, subscribe, uid]);

  const onSubscribe = () => {
    // ????????? fireStore subscribe count ??????
    if (!uid) {
      alert('???????????? ????????? ??????????????????.');
      return;
    }
    setSubscribe(!subscribe);
  };

  const onMouseEnter = () => {
    subscribeGuide.current.style = 'display:block';
    setTimeout(() => {
      subscribeGuide.current.style = 'display:none';
    }, 3000);
  };

  return (
    <Footer>
      <div className='container'>
        <button
          tpye='button'
          className='subscribe-btn'
          onClick={onSubscribe}
          onMouseEnter={onMouseEnter}
        >
          <div className='subscribe-guide' ref={subscribeGuide}>
            ???????????? ????????? ????????? ????????? ???????????? ????????? ?????????!
          </div>
          {subscribe ? (
            <AiFillHeart className='onSubscribe' />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
        <div className='text'>
          <p>?????? ????????? ????????? {price}??? ?????????.</p>
          <Link to={`/negotiation/${articleId}`}>?????? ????????????</Link>
        </div>
        <button className='chat-btn'>
          <Link to={`/chattingRoom`}>????????????</Link>
        </button>
      </div>
    </Footer>
  );
};

export default ArticleFooter;
