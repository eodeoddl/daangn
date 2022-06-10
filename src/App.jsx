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
  const [userInfo, dispatch] = useReducer(reducer, {}, resetInfo);

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

  // 로그인 정보만 auth 정보.
  useEffect(() => {
    loginService.observeAuthState(fireStore, setLoginState, dispatch);
  }, [fireStore, loginService]);

  // 유저가 있을때 dispatch로 정보업데이트
  useEffect(() => {
    if (!loginState) return;
    fireStore.getUserHistory(userInfo.uid).then((res) => {
      dispatch({ type: 'setHistory', history: res });
    });
  }, [fireStore, loginState, userInfo.uid]);

  // 유저상태 관찰후 바뀔경우 useInfo업데이트
  // geolocation 좌표가져와서 userInfo 업데이트
  useEffect(() => {
    const boundedAdressAPI = kakaoMapAPI.getAddress.bind(kakaoMapAPI);

    const success = (position) => {
      boundedAdressAPI(
        position.coords.longitude,
        position.coords.latitude
      ).then((res) => {
        const [B, H] = res.documents;
        dispatch({ type: 'setAddress', address: { region_B: B, region_H: H } });
      });
    };

    const error = () => {
      console.log('not surpported on your device');
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log('error');
    }
  }, [kakaoMapAPI, loginService]);

  return (
    <>
      <Header
        handleSearch={handleSearch}
        handleShowModal={handleShowModal}
        userInfo={userInfo}
        loginState={loginState}
        logout={loginService.logOut}
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
            itemDataApi={itemDataApi}
            fireStore={fireStore}
            handleLoading={handleLoading}
            moreLoading={moreLoading}
          />
        </Route>
        <Route exact path='/article/:articleId'>
          <Article
            latestItemList={latestItemList}
            // itemDataApi={itemDataApi}
            handleShowModal={handleShowModal}
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
      return resetInfo();
    case 'setHistory':
      return {
        ...state,
        history: action.history,
      };
    case 'setUserInfo':
      return { ...state, ...action.userInfo };
    case 'setAddress':
      return { ...state, ...action.address };
    default:
      throw new Error();
  }
};
const resetInfo = () => {
  return {};
};
