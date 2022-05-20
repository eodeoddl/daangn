[2022-05-20](#2020\-05\-20)  
[2022-05-19](#2020\-05\-19)

## 2022-05-20

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

## 2022-05-19

- app.jsx
  - fireStore api 요청후 userInfo.history 업데이트 순차적으로 완료가 안됨  
    ~~useCallback으로 해결해보려했으나 결국 useCallback도 state에 의존하기때문에 해결되지않음~~  
    useEffect 의존성 배열을 줄이는 방식으로 코드내용수정  
    useReducer 사용해서 해결해보기(기존방식인 setState의 함수형 업데이트형태는 제한적)  
    액션을 업데이트로 부터 분리하기
  - json-server로 요청하는 mock data를 fireStore로 대체하기
