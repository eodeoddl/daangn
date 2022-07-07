import React, { useEffect, useState, useReducer } from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import HeaderMessage from './headerMessage';
// import LatestItem from './latestItem';
import NoResult from './noResult';
import SearchResult from './searchResult';

const Search = ({ match, fireStore, userInfo, searchTerm }) => {
  const [searchedItem, dispatch] = useReducer(reducer, []);
  const [loadingState, setLoadingState] = useState(false);
  const limitCount = 6;

  useEffect(() => {
    console.log('search.jsx useEffect');
    fireStore.initializeCursor('searchTerm');
    fireStore.initializeDocCount();
    dispatch({ type: 'initializeItem' });

    const fetchingData = async () => {
      const res = await fireStore.getOrderedBySearchTerm(
        searchTerm,
        limitCount
      );
      console.log('res ', res);
      dispatch({ type: 'getArticleByTerm', articles: res, searchTerm });
      if (!userInfo.address.region_B) return;
      dispatch({ type: 'orderByRegion', region_B: userInfo.address.region_B });
    };

    fetchingData();
  }, [fireStore, searchTerm, userInfo.region_B]);

  let timer = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  // 새로운 목록6개씩 로딩(idx값 증가)
  const handleLoading = async () => {
    setLoadingState(true);
    await timer(1000).then(async () => {
      const res = await fireStore.getOrderedBySearchTerm(
        searchTerm,
        limitCount
      );
      console.log(' click event res ', res);
      dispatch({ type: 'getArticleByTerm', articles: res, searchTerm });
      if (!userInfo.address.region_B) return;
      dispatch({ type: 'orderByRegion', region_B: userInfo.address.region_B });
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
            handleLoading={handleLoading}
            loadingState={loadingState}
            fireStore={fireStore}
          />
        ) : (
          <NoResult fireStore={fireStore} />
        )}
      </Route>
    </>
  );
};

export default withRouter(Search);

const reducer = (state, action) => {
  switch (action.type) {
    case 'getArticleByTerm':
      const articleArray = [...action.articles];

      const sortedTitle = sortByTermRepeat(
        'title',
        action.searchTerm,
        articleArray
      );

      const sortedDescription = sortByTermRepeat(
        'description',
        action.searchTerm,
        articleArray
      );

      const sortedArticle = sortedTitle.concat(sortedDescription);

      const removedSameArticle = sortedArticle.reduce((acc, curr) => {
        const checkSameId = (article) => {
          return article.index === curr.index;
        };

        if (!acc.find(checkSameId)) acc.push(curr);

        return acc;
      }, []);

      console.log('removedSameArticle ', removedSameArticle);
      const sortedByTerm = removedSameArticle.map(
        (el) => articleArray[el.index]
      );
      return [...state, ...sortedByTerm];
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
    case 'initializeItem':
      return [];
    default:
      throw new Error();
  }
};

// array는 무조건 단어를 포함하고있음.
const sortByTermRepeat = (propertyName, searchTerm, array) => {
  const regExp = new RegExp(`${searchTerm}`, 'g');

  return array
    .reduce((acc, curr, index) => {
      if (curr[propertyName].match(regExp)) {
        return acc.concat({
          index,
          termRepeat: curr[propertyName].match(regExp).length,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.termRepeat - a.termRepeat);
};
