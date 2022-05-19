import React from 'react';
import styled from 'styled-components';
import HotItem from '../hotItem/hotItem';
import { StyledTextAnchor } from '../publicStyle/textAnchor';
import { HomeSection } from '../publicStyle/home-main-section';

const Section = styled(HomeSection)`
  & {
    background-color: ${({ theme }) => theme.backgroundColors.gray};
  }
  .wrapper {
    margin: 6rem auto 12rem auto;
    display: block;
  }

  .title {
    margin-bottom: 8rem;
    font-size: 4rem;
    line-height: 1.35;
    text-align: center;
  }

  .itemWrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
  }

  .text-center {
    text-align: center;
  }
`;

const ContentHot = ({ hotItems }) => {
  if (hotItems.length > 8) hotItems = hotItems.slice(0, 8);
  return (
    <Section backgroundColor='#F8F9FA'>
      <h1 className='title'>중고 거래 인기매물</h1>
      <div className='itemWrapper'>
        {hotItems.map((item, i) => (
          <HotItem item={item} key={i} />
        ))}
      </div>
      <div className='text-center'>
        <StyledTextAnchor className='underLine' path='hot_articles'>
          인기매물 더 보기
        </StyledTextAnchor>
      </div>
    </Section>
  );
};

export default ContentHot;
