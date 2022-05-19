import React, { useEffect, useState } from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import HeaderMessage from './headerMessage';
import NoResult from './noResult';
import SearchResult from './searchResult';

const Search = ({
  match,
  location,
  history,
  itemDataApi,
  searchTerm,
  latestItemList,
  handleLoading,
  moreLoading,
}) => {
  const [searchedItem, setSearchedItem] = useState([]);

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
  }, [itemDataApi, location.pathname, searchTerm]);

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
