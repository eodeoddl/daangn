## 2020\-06\-01

~~cartegory.jsx 추가 (portal을 이용한 modal) ~~
~~input price : blur, focus css 처리 ~~
~~posting form textarea, submit button을 제외한 css 처리 ~~
~~reducer로 상태 업데이트~~

input file로 업로드한 미리보기 이미지의 길이가 container 길이를 초과할때 carousel 처리해야됨  
 container에 overflow hidden 처리를 해도 x축은 처리가안됨 hidden 처리가 되야 carosel 만들수 있음..  
 현재 생각은 conatainer가 flex box이기 때문에 item들의 넓이값을 자동으로 처리해서 그런듯.  
 flex box대신 다른 걸로 layout처리하거나 shrink, basis, grow 속성을 적용해야할것 같음.  
textarea, submit btn css 처리해야됨  
css끝나면 fireStore로 데이터 업로드하는 작업

## 2020\-05\-31

input file로 업로드시에 onChange이벤트를 이용해서 업로드를 감지한다. 이때 같은 파일을 다시 업로드하게되면 event가 다시
발생하지 않는다.  
이것은 onChange이벤트는 실질적인 data변화가 이루어 져야 다시 trigger 되기때문이다. 때문에 file을 업로드하게되면 같은 값을
다시 올리는 경우의 수를 생각해서 e.target.value를 초기화 해주는 작업이 필요하다.

## 2020\-05\-30

### postingForm.jsx

~~1. input file 미리보기만들기.(대표이미지 처리까지)~~  
~~1. input file 미리보기 삭제기능 구현~~  
~~1. input text 숫자만 입력받기~~  
~~1. input file 스타일링~~

1. cartegory 입력창 input select대신 button과 modal을 이용해서 구현하기로 수정
1. useReducer로 업데이트 로직따로 분리 후 한번에 데이터 보내서 처리해야할듯.
1. html css 어렵다..

## 2022\-05\-27

src/components/userInfo/postingForm.jsx 추가  
json-server을 fireStore로 대체하기전 posting form을 통해 데이터를 fireStore로 보내는 폼을 먼저 만들기로함.

### fireStore 자료구조

1.  유저가 올린 posting 정보(article)는 내림차순으로 보관한다.(article의 id를 사용)
1.  article의 id는 유저가 포스팅을 한 시점의 server timestamp를 사용한다  
    이것을 사용해서 정렬을하고 article 끌어올리기 기능을 구현
1.  사용자 주소는 userInfo.region_B 에있는 법정동 정보를 쓰는것을 기본값으로 한다.
1.  title, description, region, price, files, cartegory, address, uid 를 필드로 갖는다.
    특이사항으로 files 필드는 배열을 값으로 가진다.  
    검색 api는 유저가 올린 article을 찾아올때 uid를 통해 가져오고, region값으로 나의 위치와 가까운곳에서 올린 article 부터 결과값이 노출 될 수 있도록, price로 높은가격 낮은가격순, cartegory로 물품의 종류에따른 filter기능을 제공할 예정
1.  files 보관을 fireStorage를 사용해야할것 같은데 store를 사용할지 storage를 사용할지 아직 명확하진않음.

### postingForm.jsx

1. input select로 cartegory를 입력 받음
2. input text로 title, price를 입력받음  
   price는 숫자만 입력받을 수 있도록 처리한다(정규표현식 사용).  
   또 체크박스를 이용해서 가격을 제시받을 수 있는 기능도 구현
3. input textarea는 decription 입력받음.
4. input file(multiple)은 물품 이미지를 입력받는다.  
   input요소를 label과 연결 후 display:none으로 숨기고 label에 스타일링한다.  
   updateImageDisplay() 함수를 이용해서 내가 업로드한 사진의 미리볼 수 있고 대표 사진도 나타내준다.  
   대표사진은 업로드한 이미지 파일중 첫번째 이미지를 사용하고 대표사진을 삭제하게되면 다음 인덱스에 위치한 이미지가 자동으로 대표사진으로 설정된다.
5. 해시 태그 기능으로 세부적인 카테고리를 나눌수 있고 포스팅이 완료된 시점에서 다른사람들이 구독하기 버튼을 통해 가격이 변동될때 알림이 갈 수 있도록 한다.

## 2022\-05\-26

app.jsx

```javascript
// const [userInfo, setUserInfo] = useState({ history: null });
const [userInfo, dispatch] = useReducer(reducer, {}, resetInfo);

useEffect(() => {
  loginService.observeAuthState(fireStore, setLoginState, dispatch);
}, [fireStore, loginService]);

useEffect(() => {
  if (!loginState) return;
  fireStore.getUserHistory(userInfo.uid).then((res) => {
    dispatch({ type: 'setHistory', history: res });
  });
}, [fireStore, loginState, userInfo.uid]);

useEffect(() => {
  const boundedAddressAPI = kakaoMapAPI.getAddress.bind(kakaoMapAPI);

  const success = (position) => {
    boundedAddressAPI(position.coords.longitude, position.coords.latitude).then(
      (res) => {
        const [B, H] = res.documents;
        dispatch({ type: 'setAddress', address: { region_B: B, region_H: H } });
        // setUserInfo((prevState) => {
        //   return {
        //     ...prevState,
        //     address: { region_B: B, region_H: H },
        //   };
        // });
      }
    );
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
```

loginService.js

```javascript
observeAuthState(fireStore, setLoginState, dispatch) {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        dispatch({
          type: 'setUserInfo',
          userInfo: {
            fireStore,
            displayName,
            email,
            photoURL,
            uid,
          },
        });
        // setUserInfo((prevState) => {
        //   return { ...prevState, displayName, email, photoURL, uid, fireStore };
        // });
        setLoginState(true);
      } else {
        setLoginState(false);
        dispatch({ type: 'reset' });
      }
    });
  }
```

- 리액트 상태의 불변성.  
  객체의 불변성을 지키는 의미에서 이전에 작성한 useReducer코드는 잘못된 코드임.. setState와 마찬가지 개념이고 useReducer가 setState를 대체하는 개념이기때문에 setState({...state, ~~})같은 업데이트 방식에서 state의 종속성에서 벗어나기위한 개념이란것을 숙지해야된다.  
  완성된 코드를 보면 setState와 prevState에 더이상 의존하지 않기때문에 useEffect함수 의존배열에서도 state에 대한 의존을 삭제한 것을 볼 수 있다. 완성하고 나면 별거아닌것같은데 생소한 개념을 적용할때는 언제나 어렵고 오래걸리는것 같다.  
  userInfo관련된 useReducer 코드는 더이상 터치할 일이없을듯.

- jsonServer api 요청을 fireStore api로 바꾸기(todo list)  
  components/details/article.jsx > components/publicStyle/carousual.jsx:132 = getItemById api  
  app.jsx:173 , app.jsx:149 = getLatestList api  
  search.jsx:20 = onSearch api  
  기타 app.jsx의 함수 handleLoading함수를 props로 받는 컴포넌트들..

## 2022\-05\-25

-app.jsx

```javascript
const [userInfo, setUserInfo] = useState({ history: null });
const [state, dispatch] = useReducer(reducer, userInfo, refreshInfo);

useEffect(() => {
  loginService.observeAuthState(setUserInfo, fireStore, setLoginState);
}, [fireStore, loginService]);

useEffect(() => {
  if (!loginState) return;
  console.log('call dispatch');
  dispatch({ type: 'refresh', payload: userInfo });
  dispatch({ type: 'setHistory' });
}, [loginState, userInfo]);

const reducer = (state, action) => {
  switch (action.type) {
    case 'refresh':
      return refreshInfo(action.payload);
    case 'setHistory':
      const userInfo = {
        data: state,

        set setHistory(history) {
          this.data.history = history;
        },

        get editedInfo() {
          return this.data;
        },
      };
      state.fireStore
        .getUserHistory(state.uid)
        .then((res) => (userInfo.setHistory = res));
      return { ...userInfo.editedInfo };
    default:
      throw new Error();
  }
};
const refreshInfo = (userInfo) => {
  return userInfo;
};
```

내가 원하는대로 동작 하기는 함.  
 현재 동작 방식은 dispatch로 userInfo에 직접 접근해서 원본userInfo의 history 프로퍼티를 직접변경하는 방식으로 동작함.  
 react 공식문서에서 setState로 값을 업데이를 하지않는 방식은 추천되지않는 다고 알고있는데 dispatch사용해서 변경하니 state에 직접
변경하는게 맞는 방식인지 모르겠음.(useReducer의 동작방식? 코드흐름이 원래 이런건지 의문)  
 getter setter 코드 수정부분에서 this.data.history에 직접접근해서 바꾸는 방식이기 때문에 원본의 주소값이 변하지않음.  
 getter 부분도 this.data를 참조하기때문에 data자체의 주소는 변경이없고 프로퍼티만 바뀐채로 리턴  
 useReducer 부분에서 userInfo를 초기값으로 참조하기 때문에 setUserInfo를 통하지않고 변경되는 것 같음.  
 현재 코드는 문제없이 작동하기때문에 지금은 넘어가고 다음reducer를 사용해서 똑같은 방식으로 코드짯을때도 문제없는지 확인해 볼 필요있음.  
 setstate 를 사용하지 않기때문에 리렌더링이 없이 데이터 업데이트가 되는것은 좋은점인듯?  
 reducer 작동방식이 원래 이런식인지 좀더 찾아볼것(원본의 주소값 변경이아닌 원본 프로퍼티를 직접변경으로 작동하는지)  
 또 dispatch 연속호출 문제없이 동기식으로 잘 작동함(걍 함수호출이랑 똑같이 동작하는것이니 당연한듯).  
그리고 reducer 함수를 customHook으로 코드 분리해서 사용하려했는데 오류뜸.

## 2022\-05\-20

- app.jsx

  ```javascript
  useEffect(() => {
    if (!loginState) return;
    dispatch({ type: 'refresh', payload: userInfo });
    dispatch({ type: 'setHistory' });
  }, [fireStore, loginState, state, userInfo]);

  const reducer = (state, action) => {
    console.log(state);

    switch (action.type) {
      case 'refresh':
        return refreshInfo(action.payload);
      case 'setHistory':
        const userInfo = {
          data: state,

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
        console.log(userInfo); // 정상적으로 setter가 실행되어 userInfo.data.history값은 truthy
        console.log(userInfo.data); // 이렇게 접근하면 최신화되지않은값을 가지고있음
        console.log(userInfo.EditedInfo); // getter로 호출을 해도 최신화되지않은 값임.
        return userInfo.EditedInfo; // 바뀌지 않은값 리턴
      default:
        throw new Error();
    }
  };

  const refreshInfo = (userInfo) => {
    return userInfo;
  };
  ```

  - 나의 예상은 dispatch({type: 'refresh', payload: userInfo})로 useReducer의 state 값이 변경되고 이 state 값을 다시  
    dispatch({type: 'setHistory'}) 로 전달해 그안에서 history요청하는 api를 통하여 data를  
    다시 편집해서 return 하는것을 바랐음.

  하지만 reducer 함수내부에서 setHistory 코드블럭이 실행되고 나서 return 값은 refresh 부분과 같은 값을 리턴  
  fireStore api요청후 콘솔로 setHistory코드 블럭안에 정의된 userInfo값을 console.log 했을때 getter의 this값이  
  setter값이 실행되기 이전값임. 객체 literal의 this는 항상 최신값이 유지되하는데 안되는 이유를 모르겠음  
  this개념과 getter setter 에 대해 이해도가 부족함.  
  객체literal대신 함수의 클로저 사용도 고려

  ~~history를 요청할때 fireStore내의 값을 새로업데이트 하는 api요청을 해야하는데, 이 값은 promise값이므로 dispatch 함수내부에서 promise값을 풀어서 업데이트 할 수 있는 방법을 찾아야한다.~~  
  -> object literal의 getter와 setter 프로퍼티로 해결

  값이 제대로 전달되지않아 dispatch의 호출방식, Effect의 의존성이 해결되는지 확인못함...

## 2022\-05\-20

- app.jsx
  - useReducer 문법, 사용법 적응하기  
    reducer 함수의 초기 값은 바로 정의할수없음 (in this use case)  
    로그인 -> setUserInfo -> userInfo.uid = truthy -> uid가 있을경우에 reducer 함수 action.type으로 setUserInfo ->
    userInfo.history = truthy  
    useReducer 함수의 세번째 인자로 초기화 지연함수로 필요한 경우에만 초기값세팅 (함수의 reference로 기억)  
    reducer 함수의 return값과 state관계에 대한 이해도 부족  
    dispath 함수로 업데이트를 진행해야 의존성을 없앨수 있음  
    dipatch 함수의 실행결과는 state에 담긴다  
    fireStore의 userHitory는 지속적인 갱신이 필요하므로 정보를 가져올때마다 업데이트가 필요하다.  
    때문에 history를 요청할때 fireStore내의 값을 새로업데이트 하는 api요청을 해야하는데,  
    이 값은 promise값이므로 dispatch 함수내부에서 promise값을 풀어서 업데이트 할 수 있는 방법을 찾아야한다. 지금은 떠오르지않음..  
    의문점으로 dispatch 함수를 연속적으로 호출하면 동기식으로 작동하는지 비동기식으로 작동하는지  
    잘 모르겠다. 확인필요  
    현재 생각으로는 비동기식인것같다, 혹은 Effect함수 내부에서 의존배열이 잘못된걸지도

## 2022\-05\-19

- app.jsx
  - fireStore api 요청후 userInfo.history 업데이트 순차적으로 완료가 안됨  
    ~~useCallback으로 해결해보려했으나 결국 useCallback도 state에 의존하기때문에 해결되지않음~~  
    useEffect 의존성 배열을 줄이는 방식으로 코드내용수정  
    useReducer 사용해서 해결해보기(기존방식인 setState의 함수형 업데이트형태는 제한적)  
    액션을 업데이트로 부터 분리하기
  - json-server로 요청하는 mock data를 fireStore로 대체하기
