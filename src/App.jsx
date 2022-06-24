import { useEffect, useRef, useState, useReducer } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Article from './components/datails/article';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import MainContent1 from './components/homeSection/mainContent1';
import MainContent2 from './components/homeSection/mainContent2';
import MainContent3 from './components/homeSection/mainContent3';
import ContentHot from './components/homeSection/mainContentHot';
import HomeMainTop from './components/homeSection/mainContentTop';
import HotArticles from './components/hot_articles/article';
import LoginForm from './components/login/loginForm';
import Portal from './components/portal/portal';
// import Carosual from './components/publicStyle/carosual';
import Search from './components/search/search';
// import UserArticles from './components/userInfo/userArticles';
import UserInfo from './components/userInfo/userInfo';
// import UpdateInfo from './customHook/updateUser';
// import useGeolocation from './customHook/useGeolocation';

function App({
  itemDataApi,
  loginService,
  fireStore,
  fireStorage,
  kakaoMapAPI,
}) {
  const history = useHistory();

  const [didSearch, setDidSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [latestItemList, setLatestItemList] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [userInfo, dispatch] = useReducer(reducer, {});

  const itemIdxRef = useRef(0);

  const [hotItems, setHotItems] = useState([
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑 싸게팝니다. 네고x',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
    {
      serialNumber: Date.now(),
      imgSrc: '',
      price: 30000,
      region: '충북 청주시 흥덕구 비하동',
      name: '프라다 지갑',
      like: '10',
    },
  ]);

  const handleSearch = (searchTerm) => {
    setDidSearch(true);
    setSearchTerm(searchTerm);
  };

  const handleLoading = async () => {
    itemIdxRef.current += 6;
    setMoreLoading(true);
    await itemDataApi.getLatestList(itemIdxRef.current, 6).then((res) => {
      setLatestItemList([...latestItemList, ...res.data]);
    });
    setMoreLoading(false);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const logout = () => {
    loginService.logOut(dispatch);
  };

  // 검색여부에따라서 url 요청
  useEffect(() => {
    if (didSearch) {
      history.push({
        pathname: `/search/${searchTerm}`,
      });
    }

    return () => {
      setDidSearch(false);
    };
  }, [didSearch, history, searchTerm]);

  // 최신 물품보여주기용 api 호출
  useEffect(() => {
    itemDataApi.getLatestList(itemIdxRef.current, 6).then((res) => {
      setLatestItemList(res.data);
    });
  }, [itemDataApi]);

  // user auth state를 관찰하는 함수실행.
  // 관찰하는 함수이기 때문에 한번 실행하면 알아서 코드실행
  useEffect(() => {
    loginService.observeAuthState(
      dispatch,
      setLoginState,
      kakaoMapAPI,
      fireStore
    );
  }, [fireStore, history, kakaoMapAPI, loginService]);

  // 유저가 외부업체auth로 로그인에 성공했을때 dispatch로 정보업데이트
  useEffect(() => {
    if (!loginState) return;
    const getUser = async () => {
      const data = await fireStore.getUserInfo(userInfo.uid);
      dispatch({ type: 'setUserInfo', data });
    };
    getUser();
  }, [fireStore, loginState, userInfo.uid]);

  return (
    <>
      <Header
        handleSearch={handleSearch}
        handleShowModal={handleShowModal}
        userInfo={userInfo}
        loginState={loginState}
        logout={logout}
      />
      <Switch>
        <Route exact path='/'>
          <HomeMainTop />
          <MainContent1 />
          <MainContent2 />
          <MainContent3 />
          <ContentHot hotItems={hotItems} />
        </Route>
        <Route path='/hoft_articles'>
          <HotArticles hotItems={hotItems} />
        </Route>
        <Route path='/search'>
          <Search
            latestItemList={latestItemList}
            searchTerm={searchTerm}
            userInfo={userInfo}
            fireStore={fireStore}
            handleLoading={handleLoading}
            moreLoading={moreLoading}
          />
        </Route>
        <Route exact path='/article/:articleId'>
          <Article
            fireStore={fireStore}
            latestItemList={latestItemList}
            handleShowModal={handleShowModal}
            userInfo={userInfo}
          />
        </Route>
        <Route path='/user/:displayName'>
          <UserInfo
            userInfo={userInfo}
            fireStore={fireStore}
            fireStorage={fireStorage}
          />
        </Route>
      </Switch>
      <Footer />
      <Portal idSelector='login-form-modal'>
        {showModal && (
          <LoginForm
            handleShowModal={handleShowModal}
            loginService={loginService}
          />
        )}
      </Portal>
    </>
  );
}

export default App;

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return {};
    case 'setUserInfo':
      return { ...state, ...action.data };
    // case 'setUserInfo1':
    //   return { ...state, ...action.userData };
    default:
      throw new Error();
  }
};
