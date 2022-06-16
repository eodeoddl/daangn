import React from 'react';
import styled from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
// import

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
  }

  .subscribe-btn {
  }

  .chat-btn {
    width: 100px;
    heigth: 33%;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.lightOrange};
    border-radius: 4px;
  }

  svg {
    font-size: 40px;
  }
`;

const ArticleFooter = ({ price }) => {
  const { articleId } = useParams();
  return (
    <Footer>
      <div className='container'>
        <button tpye='button' className='subscribe-btn'>
          <AiOutlineHeart />
        </button>
        <div className='text'>
          <p>현재 물품의 가격은 {price}원 입니다.</p>
          <Link to={`/negotiation/${articleId}`}>가격 제안하기</Link>
        </div>
        <button className='chat-btn'>채팅하기</button>
      </div>
    </Footer>
  );
};

export default ArticleFooter;
