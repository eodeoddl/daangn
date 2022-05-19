import React from 'react';
import styled from 'styled-components';
import { LinkButton } from '../publicStyle/button';
import { HomeSection } from '../publicStyle/home-main-section';

const Content = styled(HomeSection)`
  .background-img {
    background: url(/images/image-3.png);
    background-size: 526px 735px;
    width: 526px;
    height: 735px;
  }
  .title {
    font-size: 4rem;
    line-height: 1.35;
    margin-bottom: 2.4rem;
  }
  .text {
    font-size: 1.6rem;
    line-hieght: 1.5;
    letter-spacing: -0.3px;
    margin-bottom: 3.2rem;
  }
`;

const MainContent3 = () => {
  return (
    <Content>
      <div className='background-img'></div>
      <div>
        <h1 className='title'>
          내 근처에서 찾는
          <br /> 동네가게
        </h1>
        <p className='text'>
          우리동네 가게를 찾고 있나요?
          <br />
          동네 주민이 남긴 진짜후기를 함께 확인해보세요!
        </p>
        <LinkButton className='text-1 text-bold' path='find_townMarket'>
          당근마켓 동네가게 찾기
        </LinkButton>
      </div>
    </Content>
  );
};

export default MainContent3;
