import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 10vh;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.1);

  .flex-box {
    margin: 0 auto;
    width: 677px;
    height: 100%;
    // background-color: ${({ theme }) => theme.colors.white};
    backgrond-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    width: 20%;
    height: 50%;
    margin: 10px;
    border: none;
    background-color: transparent;
    font-size: 16px;
    font-weight: 700;
  }

  button:hover {
    color: ${({ theme }) => theme.colors.lightOrange};
  }

  .anchor {
    text-decoration: none;
    color: inherit;
  }
`;

const ArticleAdminMenu = () => {
  const match = useRouteMatch();
  console.log(match.url);
  // 끌올, 수정, 삭제, 숨기기
  return (
    <Container>
      <div className='flex-box'>
        <button>
          <Link className='anchor'>끌어올리기</Link>
        </button>

        <button>
          <Link to={{ pathname: `${match.url}/edit` }} className='anchor'>
            수정하기
          </Link>
        </button>

        <button>
          <Link className='anchor'>숨기기</Link>
        </button>
        <button>
          <Link className='anchor'>삭제</Link>
        </button>
      </div>
    </Container>
  );
};

export default ArticleAdminMenu;
