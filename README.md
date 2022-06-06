## 2022\-06\-06

파일을 storage로 업로드하는 타이밍은 전체적인 데이터를 전부 작성하고 submit btn 을 눌렀을때로 확정

fireStore에 저장하는 참조값은 storage의 getDownloadURL(file) api로 리턴받은 url을 넣어줘야하고, 이값을 읽어와서 이미지 element의 src로 연결해 보여준다.  
각 api는 비동기식으로 작동을하는데 promise 리턴과 체인에대해 아직은 많이 헷갈리는 상황이고 나는 분명 await로 promise의 리턴을 받기까지 대기를 하고 순차적으로 코드를 진행시키려 했지만 async 함수의 값을 리턴해도 undefined값이 넘어오는 이유도 모르겠다.  
또 await 함수를 사용했음에도 비동기식으로 코드가 작동한다.  
mdn Promise문서와 chain에 관련된 정보도 찾아봤지만 그렇게 크게 와닿지는 않는다.  
문서를 좀더 공부해봐야할듯.. 구상방법은 정해졌지만 async await 함수에관련한 지식부족과 어떤값을 어디서 리턴해야하는지 머리속에 감이 잘 잡히지 않는다.

## 2022\-06\-03

file업로드 firestrage이용..

1. 파일 데이터는 store가 아니라 storage에 저장된다.
1. 파일을 가리키는 참조를 만들면 fireStorage를 initializing한 앱에서 액세스 권한이 부여된다.
1. 참조는 메모리에 부담을 주지않고 많이 만들수 있으며 여러작업에서 재사용하기도 용이하다.
1. 참조는 child(), parent, root 속성을 통해 파일의 계층구조를 탐색할수 있다.
   그리고 각각의 속성은 다시 참조를 반환하므로 여러번 연결할 수 있다.
1. fullpath, name, bucket 속성으로 참조가 가리키는 파일의 전체경로, 파일이름, 파일이 저장된 버킷을 알 수 있다.

나의 앱에서는 store의 fileRef 필드는 file이 저장된 storage의 참조를 저장하고, 필요할때 참조를 통하여 접근하는 방식으로
구현한다.

파일의 경로는 article id/ file name으로 경로를 지정한다.  
=> firestore id값을 자동생성으로 사용하게되니 ariticle의 id로 참조를 만들때 자동생성된 id를 기억할 수 없다..
=> fireStorage안에서 firestore 문서의 id값을 가져와서 저장하는 방식도 고려해봄.

파일명.파일타입 을 업로드했다고 가정하게 되면
참조는 '파일타입(just string..) / 파일명.파일타입'으로 저장한다.(ex. image/111.png)  
=> file명이 같으면 기존파일이 overwrite가 됨. path를 구분할 수 있는 고유한 id 필요하다.  
=> 최종 path는 'articleId/image/111.png' 이런식으로 저장할 예정.

문서를 제출하면서 store에 저장하는 과정안에서는 스토어의 자동생성 id를 참조할수 있다.  
이때 fireStorage작업을 하려고했는데 작동하지않음. 에러도 안뜨고 store저장하는 api자체가 실행되지않는다.  
좀더 알아보고 안되면 store에 저장하면서 id값을 리턴받고 리턴받은 id값을 사용해서 path로 지정한다.  
이방식은 file 데이터를 제외한 나머지정보를 store저장 - 리턴받은 id이용해서 storage path 만들면서 file업로드 - storage에 저장된 file의 참조(storage path)를 다시 store에 저장하는 방식이 될 것 같은데 store에 저장하는 api호출을 두번하게되니 비효율적인느낌..

파일을 storage에 업로드하는것은 성공했지만 같은 이름의 파일을 올릴경우 overwrite되는 문제때문에 id를 어떻게 만들것인지가 제일중요(되도록이면 store업데이트하면서 자동생성되는 id 값을 이용하고싶음).  
library이용을 자제 하고싶은데, 정안되면 library도움 받아서 id 생성해서 할 예정이다.

onchange 이벤트로 state 업데이트를할때 지속적인 리렌더링 방지 해결방법

1. setTimeout 함수를 사용. setState업데이트를 특정 시간후에 업데이트.
1. lodash library 사용
1. onblur 이벤트에 input의 focus가 사라졌을때 업데이트.
1. onchange 리렌더링 이슈는 위 세가지 방법중 하나 선택해서 구현할 예정
1. storage 한다고 리렌더링 최적화코드 쳐보지도 못함.
1. carousel도 아직 완성안됨.
1. 오늘은 진행한게없네.

## 2022\-06\-02

~~postingForm 완성하고 fireStore로 데이터 추가작업완료.~~  
~~input file을 제외하고 나머지 값들만..~~  
~~게시글 작성완료하고 home으로 이동할때 스크롤이 이전 페이지위치하는 문제 해결~~

이미지노출을 위한 로직과 formdata를 한번에 모아서 보내기위한 로직이 따로 분리되야하는데
img url은 미리보기 기능을 위해 필요한 것일뿐 서버에 보낼 필요가없음. => 이미지 src는 useState로 처리하고 나머지는 reducer로 처리.  
js의 formData 객체를 이용해서 form에 입력된 값을 서버로 보낸다. => 나는 fireStore api를 사용하기때문에 굳이formdata객체를
사용할 필요가 없음.

auth 경우의 수

1.  사용자가 로그인을 한 상태에서 다른사람의 info를 탐색하는 경우 => postingForm이 보여지지않아야함.
1.  사용자가 로그인을 한 상태에서 본인의 info를 탐색하는경우 => postingForm 노출.
1.  로그인을 하지않고 url로 postingForm에 직접접근하는 경우 => root로 강제로 보내고 로그인 modal을 띄워준다.

사용자 입력값을 받는 처리는 onChange를 이용해서 state를 실시간으로 업데이트한다.  
의문점. state의 변화가 발생하는데 state에 변화에 관련된 component자체의 업데이트가 없다면 re-render가 발생하는지
확인이 필요할 것 같다. => component 업데이트와 상관없이 state 변화로 인해 값이 바뀔때마다 re-render 발생하고 useCallback을 사용해도 똑같음.  
onChange 이벤트로 처리를하지않고 submit btn으로 처리를 하고싶은데 그러면 dom에 직접 접근해서 값을 가져와야하는데 맞는 방법인지 모르겠음.  
무엇이 최선일지 고민하고 검색해봐야할듯.

store에 file을 직접 올리려고했는데 업로드 되지않음.
에러내용  
 uncaught (in promise) FirebaseError: Function addDoc() called with invalid data. Unsupported field value: a custom File object (found in document article/OJsIvsdRAv3JA8ERasyS)

## 2022\-06\-01

~~cartegory.jsx 추가 (portal을 이용한 modal)~~  
~~input price : blur, focus css 처리~~  
~~posting form textarea, submit button을 제외한 css 처리~~  
~~reducer로 상태 업데이트~~

1. input file로 업로드한 미리보기 이미지의 길이가 container 길이를 초과할때 carousel 처리해야됨  
   container에 overflow hidden 처리를 해도 x축은 처리가안됨 hidden 처리가 되야 carousel 만들수 있음..  
   현재 생각은 conatainer가 flex box이기 때문에 item들의 넓이값을 자동으로 처리해서 그런듯.  
   flex box대신 다른 걸로 layout처리하거나 shrink, basis, grow 속성을 적용해야할것 같음.
1. textarea, submit btn css 처리해야됨
1. css끝나면 fireStore로 데이터 업로드하는 작업하고 json-server 코드들 더이상 사용하지않을 예정.

## 2022\-05\-31

input file로 업로드시에 onChange이벤트를 이용해서 업로드를 감지한다. 이때 같은 파일을 다시 업로드하게되면 event가 다시
발생하지 않는다.  
이것은 onChange이벤트는 실질적인 data변화가 이루어 져야 다시 trigger 되기때문이다. 때문에 file을 업로드하게되면 같은 값을
다시 올리는 경우의 수를 생각해서 e.target.value를 초기화 해주는 작업이 필요하다.

## 2022\-05\-30

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
1.  title, description, region, price, files, cartegory, uid 를 필드로 갖는다.
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
