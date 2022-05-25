[2022-05-20](#2020-05-20)  
[2022-05-19](#2020-05-19)  
[2022-05-23](#2020-05-23)

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
 useReducer 부분에서 userInfo를 초기값으로 참조하기 때문에 setUserInfo를 통하지않고 변경되는 것 같기도함.  
 현재 코드는 문제없이 작동하기때문에 지금은 넘어가고 다음reducer를 사용할때 똑같은 방식으로 코드짯을때도 문제없는지 확인해 볼 필요있음.  
 setstate 를 사용하지 않기때문에 리렌더링이 없이 데이터 업데이트가 되는것은 좋은점인듯?  
reducer 작동방식이 원래 이런식인지 좀더 찾아볼것

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
