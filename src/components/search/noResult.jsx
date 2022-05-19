import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ResultSection } from '../publicStyle/result-section';
import { MoreButton } from '../publicStyle/moreButton';
import { withRouter } from 'react-router-dom';
import LatestItem from './latestItem';

const Container = styled(ResultSection)`
  .empty_result {
    padding: 34px 0 24px 0;
    text-align: center;

    .message {
      font-size: 16px;
      line-height: 22px;
      .o-keyword {
        font-weight: 600;
      }
    }

    .research_btn {
      border: none;
      padding: 6px;
      background-color: #fff;
      font-weight: 600;
      font-size: 16px;
      color: #ff8a3d;
    }
  }
`;

const NoResult = ({ match, latestItemList, moreLoading, handleLoading }) => {
  return (
    <Container>
      <section className='empty_result'>
        <p className='message'>
          <span className='o-keyword'>{`'${match.params.searchTerm}'`}</span>에
          대한 검색 결과가 없어요.
          <br /> 검색어를 다시 확인해주세요!
        </p>
        <button className='research_btn'>다시 검색하기</button>
      </section>
      <LatestItem latestItemList={latestItemList}>
        <MoreButton handleLoading={handleLoading} loadingState={moreLoading} />
      </LatestItem>
    </Container>
  );
};

export default withRouter(NoResult);
