import React, { useEffect, useState, useReducer } from 'react';
import { withRouter, Route, Redirect, useHistory } from 'react-router-dom';
import HeaderMessage from './headerMessage';
import NoResult from './noResult';
import SearchResult from './searchResult';

const Search = ({
  match,
  fireStore,
  userInfo,
  latestItemList,
  moreLoading,
  searchTerm,
}) => {
  const [searchedItem, dispatch] = useReducer(reducer, []);
  const [loadIdx, setLoadIdx] = useState(6);
  const [loadingState, setLoadingState] = useState(false);
  // console.log('search component', history.location.pathname);
  // firestore
  useEffect(() => {
    const getArticle = async () => {
      const res = await fireStore.getOrderedArticle(searchTerm);
      dispatch({ type: 'getArticleByTerm', articles: res });
      if (!userInfo.region_B) return;
      dispatch({ type: 'orderByRegion', region_B: userInfo.region_B });
      dispatch({ type: 'editArticle', loadIdx });
    };
    getArticle();
  }, [fireStore, loadIdx, searchTerm, userInfo.region_B]);

  // 검색어 바뀔시 idx 초기값으로 설정
  useEffect(() => {
    setLoadIdx(6);
  }, [searchTerm]);

  let timer = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  // 새로운 목록6개씩 로딩(idx값 증가)
  const handleLoading = async () => {
    setLoadingState(true);
    await timer(1000).then(() => {
      setLoadIdx((prevIdx) => prevIdx + 6);
    });
    setLoadingState(false);
  };

  return (
    <>
      <HeaderMessage />
      <Route exact path={`${match.url}`}>
        <Redirect to='/' />
      </Route>
      <Route exact path={`${match.url}/:searchTerm`}>
        {searchedItem.length ? (
          <SearchResult
            searchedItem={searchedItem}
            moreLoading={moreLoading}
            handleLoading={handleLoading}
            loadingState={loadingState}
          />
        ) : (
          <NoResult
            latestItemList={latestItemList}
            moreLoading={moreLoading}
            handleLoading={handleLoading}
          />
        )}
      </Route>
    </>
  );
};

export default withRouter(Search);

const reducer = (state, action) => {
  switch (action.type) {
    case 'getArticleByTerm':
      return [...action.articles];
    case 'orderByRegion':
      const sortedByRegion = state
        .reduce((acc, curr, index) => {
          let depth = 1;
          const maxDepth = 4;
          if (curr.region_B.code === action.region_B.code) {
            return acc.concat({ index, depthMatchCount: maxDepth });
          }

          while (depth <= maxDepth) {
            const propertyName = `region_${depth}depth_name`;
            if (
              curr.region_B[propertyName] &&
              action.region_B[propertyName] &&
              curr.region_B[propertyName] !== action.region_B[propertyName]
            ) {
              return acc.concat({ index, depthMatchCount: depth - 1 });
            }
            depth++;
          }
          return acc.concat({ index, depthMatchCount: 0 });
        }, [])
        .sort((a, b) => b.depthMatchCount - a.depthMatchCount);
      const result = sortedByRegion.map((el) => state[el.index]);
      return [...result];
    case 'editArticle':
      return [...state.slice(0, action.loadIdx)];
    default:
      throw new Error();
  }
};
