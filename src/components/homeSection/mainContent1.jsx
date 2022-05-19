import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../publicStyle/button';
import { HomeSection } from '../publicStyle/home-main-section';

const MainContent = styled(HomeSection)`
  .background-img {
    background-image: url(/images/image-1.png);
    background-size: 532px 684px;
    width: 532px;
    height: 684px;
  }
  .title {
    font-size: 4rem;
    line-height: 1.35;
    margin-bottom: 2.4rem;
  }
  .text {
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: -0.3px;
  }
  .home-button {
    margin-top: 3.2rem;
  }
  a:nth-child(n + 2) {
    margin-left: 1.6rem;
  }
`;

const MainContent1 = () => {
  return (
    <MainContent>
      <div className='background-img'></div>
      <div>
        <h1 className='title'>
          우리 동네
          <br />
          중고 직거래 마켓
        </h1>
        <p className='text'>
          동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
        </p>
        <div className='home-button'>
          <LinkButton className='text-1 text-bold' path='hot_articles'>
            인기매물 보기
          </LinkButton>
          <LinkButton className='text-1 text-bold' path='trust_deal'>
            믿을 수 있는 중고거래
          </LinkButton>
        </div>
      </div>
    </MainContent>
  );
};

export default MainContent1;
