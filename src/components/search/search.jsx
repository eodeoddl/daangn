import React, { useEffect, useState } from 'react';
import { withRouter, Route, Redirect, useParams } from 'react-router-dom';
import HeaderMessage from './headerMessage';
import NoResult from './noResult';
import SearchResult from './searchResult';

const Search = ({
  match,
  itemDataApi,
  fireStore,
  userInfo,
  latestItemList,
  handleLoading,
  moreLoading,
  searchTerm,
  location,
}) => {
  const [searchedItem, setSearchedItem] = useState([]);

  useEffect(() => {
    console.log('search useEffect');
    const getArticle = async () => {
      const res = await fireStore.getOrderedSearchTerm(
        searchTerm,
        userInfo.region_B
      );
      console.log(res);
    };
    getArticle();
  }, [fireStore, searchTerm, userInfo.region_B]);

  // 현재는 json-server를 이용한 통신하고 있음
  // fireStore api로 대체
  useEffect(() => {
    const item = () => {
      itemDataApi
        .onSearch(searchTerm || location.pathname.split('/').pop())
        .then((res) => {
          const data = res.data.filter(
            (item) => item.cartegory === 'flea market'
          );
          setSearchedItem(data);
        });
    };
    item();
  }, [itemDataApi, searchTerm, location]);

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
