import React from 'react';
import styled from 'styled-components';
import { HomeTopSection } from '../publicStyle/home-main-section';

const TopSection = styled(HomeTopSection)`
  .title {
    font-size: 4.8rem;
    padding-top: 27rem;
    margin-bottom: 3.2rem;
    line-height: 1.2;
  }
  .text {
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: 0.3px;
  }
  .backgroundImg {
    position: absolute;
    right: -123px;
    bottom: 0;
    width: 800px;
    height: 685px;
    background: ${({ theme }) => theme.backgroundColors.white}
      url(/images/image-top.png) no-repeat;
    background-size: 800px 685px;
  }
`;

const HomeMainTop = () => {
  return (
    <TopSection>
      <h1 className='title'>
        당신 근처의 <br />
        당근 마켓
      </h1>
      <p className='text'>
        중고 거래부터 동네 정보까지, 이웃과 함께해요.
        <br /> 가깝고 따뜻한 당신의 근처를 만들어요.
      </p>
      <div className='backgroundImg'></div>
    </TopSection>
  );
};

export default HomeMainTop;
