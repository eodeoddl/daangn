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
// import useGeolocation from './customHook/useGeolocation';

function App({ itemDataApi, loginService, fireStore, kakaoMapAPI }) {
  const history = useHistory();

  const [didSearch, setDidSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [latestItemList, setLatestItemList] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [userInfo, setUserInfo] = useState({ history: null });
  const [state, dispatch] = useReducer(reducer, userInfo);

  // const [userState, setUserState] = useState({
  //   activeHistory: null,
  //   userHistory: null,
  //   userInfo: null,
  // });
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

  const handleSubmit = (searchTerm) => {
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
    loginService.observeAuthState(setUserInfo, fireStore, setLoginState);
  }, [fireStore, loginService]);

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
        setUserInfo((prevState) => {
          return {
            ...prevState,
            address: { region_B: B, region_H: H },
          };
        });
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

  useEffect(() => {
    if (!loginState) return;
    dispatch({ type: 'refresh', payload: userInfo });
    console.log(state);
    dispatch({ type: 'setHistory' });
    console.log(state);
  }, [fireStore, loginState, state, userInfo]);

  // const fetchHistory = useCallback(
  //   (loginState) => {
  //     fireStore.setUserData(userInfo);
  //     fireStore.getUserData(userInfo.uid, setUserInfo, loginState);
  //     fireStore.setUserArticle(userInfo.uid);
  //   },
  //   [fireStore]
  // );
  // 테스트용 fireStore api 요청
  // 유저 정보가 있다면 fireStore에 데이터 저장
  // 이곳에서 유저의 location도 firebase에 업데이트
  // useEffect(() => {
  //   console.log('useEffect 5555555555555555555');
  //   if (!loginState || !userInfo.uid) fetchHistory(false);
  //   fireStore.getUserData(userInfo.uid, setUserInfo);
  //   fetchHistory(true);
  // }, [fetchHistory, loginState, userInfo.uid]);

  return (
    <>
      <Header
        handleSubmit={handleSubmit}
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
            itemDataApi={itemDataApi}
            handleLoading={handleLoading}
            moreLoading={moreLoading}
          />
        </Route>
        <Route exact path='/article/:itemId'>
          <Article
            latestItemList={latestItemList}
            itemDataApi={itemDataApi}
            handleShowModal={handleShowModal}
          />
        </Route>
        <Route path='/user/:displayName'>
          <UserInfo userInfo={userInfo} fireStore={fireStore} />
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
  console.log(state);
  switch (action.type) {
    case 'refresh':
      return refreshInfo(action.payload);
    case 'setHistory':
      console.log(state);
      const userInfo = {
        data: { ...state },

        set setHistory(history) {
          this.data = { ...this.data, history };
        },

        get EditedInfo() {
          return this.data;
        },
      };
      console.log(userInfo.data);
      state.fireStore
        .getUserHistory(state.uid)
        .then((res) => (userInfo.setHistory = res));
      console.log(userInfo);
      console.log(userInfo.EditedInfo);
      return;
    default:
      throw new Error();
  }
};
const refreshInfo = (userInfo) => {
  return userInfo;
};
