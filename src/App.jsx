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
import Search from './components/search/search';
import EditForm from './components/userInfo/editForm';
import PostingForm from './components/userInfo/postingForm';
import UserInfo from './components/userInfo/userInfo';

function App({ loginService, fireStore, fireStorage, kakaoMapAPI }) {
  const history = useHistory();

  const [didSearch, setDidSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  // const [latestItemList, setLatestItemList] = useState([]);
  // const [moreLoading, setMoreLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [userInfo, dispatch] = useReducer(reducer, {});

  // const limitCount = 6;

  // useEffect(() => {
  //   const fetchingData = async () => {
  //     const latestArticles = await fireStore.getLatestArticle(limitCount);
  //     setLatestItemList((prevState) => {
  //       return [...prevState, ...latestArticles];
  //     });
  //   };
  //   fetchingData();
  // }, [fireStore]);

  // useEffect(() => {
  //   console.log('useEffect history ', history.location.pathname);
  //   if (history.location.pathname === '/') return;
  //   fireStore.initializeCursor();
  // }, [fireStore, history.location.pathname]);

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

  // const handleLoading = async () => {
  //   // itemIdxRef.current += 6;
  //   setMoreLoading(true);
  //   const latestArticles = await fireStore.getLatestArticle(limitCount);
  //   setLatestItemList((prevState) => {
  //     return [...prevState, ...latestArticles];
  //   });
  //   setMoreLoading(false);
  // };

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
  // useEffect(() => {
  //   if (!loginState) return;
  //   const getUser = async () => {
  //     const data = await fireStore.getUserInfo(userInfo.uid);
  //     dispatch({ type: 'setUserInfo', data });
  //   };
  //   getUser();
  // }, [fireStore, loginState, userInfo.uid]);

  useEffect(() => {
    console.log('active observe user data');
    if (!loginState) return;
    fireStore.observeUserInfo(userInfo.uid, dispatch);
  }, [fireStore, userInfo.uid, loginState]);

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
        <Route path='/hot_articles'>
          <HotArticles hotItems={hotItems} />
        </Route>
        <Route path='/search'>
          <Search
            searchTerm={searchTerm}
            userInfo={userInfo}
            fireStore={fireStore}
          />
        </Route>
        <Route exact path='/article/:articleId'>
          <Article
            fireStore={fireStore}
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
        <Route path='/editArticle/:articleId'>
          {/* <PostingForm
            userInfo={userInfo}
            fireStore={fireStore}
            fireStrage={fireStorage}
          /> */}
          <EditForm
            userInfo={userInfo}
            fireStore={fireStore}
            fireStorage={fireStorage}
            // action='edit'
          />
        </Route>
      </Switch>
      <Footer />
      {showModal && (
        <Portal idSelector='login-form-modal'>
          <LoginForm
            handleShowModal={handleShowModal}
            loginService={loginService}
          />
        </Portal>
      )}
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
    case 'updateInfo':
      return { ...state, ...action.userData };
    default:
      throw new Error();
  }
};
