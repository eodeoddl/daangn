## 2022\-07\-19

수정 폼에서 사용자 게시글에 첨부해서 저장했던 file을 fileinput에 files 값으로 설정하려고했는데, 보안상문제로 js 코드로 파일을 강제로 지정하는것은 잘못된 방식임. 수정시에 로직을 다시 한번 생각해 봐야할것같음.

arrayBuffer 와 typedArray 의 관계와 uInt8array를 이용한 객체비교후 바뀐 값이있으면 fireStorage업로드를 다시하는 것으로.



## 2022\-07\-18

firestore 기능중에 transaction이란 기능이있다. tarnsaction기능의 정의는 한 필드의 값을 현재값 또는 다른 필드의 값에 따라 업데이트 하려는 경우 사용할 수 있는 기능이다.

또 fireStor 기능중에 onSnapshot() 메서드로 문서의 변화를 수신 대기할 수 있다. 해당 메서드는 사용자가 제공하는 콜백이 최초로 호출될때 단일 문서의 현재 콘텐츠로 문서스냅삿이 즉시 생되고 콘텐츠가 변경될때마다 콜백이 호출되어 문서 스냅샷을 업데이트한다.

현재 내 app 에서 사용자가 자신의 문서를 업데이트를 할 때 article collection 의 해당 article의 document의 image 필드의 storage 참조 배열의 변화, users collection의 해당유저의 document의 userArticles 필드의 article 참조배열, 유저가 좋아요를 누른 subscribeList의 article 참조배열의 변화를 감지하고 업데이트를 해주어야한다. 이것을 onSnapshot() 메서드, 혹은 tarnsaction을 이용한 처리를 해야하는데 아직까지 그 둘의 차이점에 대한 공부가 부족하고 어떤것을 적용해야하는지에 대한 확신이 필요한것같다.

나의 app에서 현재 실험적으로 onSnapshot() 메서드를 적용한 observUserInfo메서드가 존재하고 단지 데이터 변화만 추적하고 app의 state 만 업데이트할뿐 store의 업데이트가 수행되지않는 메서드이다. 이것을먼저 수정해서 firestore 문서업데이트를 하고 문서를 한번 가져오는 get 역할을 수행하는 메서드가 업데이트된 값을 제대로 수신하는지 검증이 필요한것같다. 혹은 변화를 감지하고 state를 변경하는 dispatch 혹은 setState 함수로 수동적으로 업데이트 해야하는지에 대한 검증도 필요함.

postingForm.jsx 에서 업로드방식은 postingForm의 file을 제외한 나머지 입력값을 store에 업데이트를 한다. 업데이트를 하고 난후 해당 document의 자동생성 id값을 리턴받는다. 자동생성 id값을 이용해서 fireStorage의 path를 만들고 해당 path에 file을 업로드한다. file업로드가 끝나면 file이 storage에 저장된 참조를 이용하여 downloadURL을 만들고 URL을 return 한다. return 받은 URL을 다시 아까 업로드했던 article document의 image필드로 업데이트하는 로직으로 구현되어있다.

update와 add하는 로직을 분리하고 postingForm의 action props 로 update 해야될 상황과 add 할 상황을 분리해서 작업하기로함.
컴포넌트의 단순 state는 업데이트 가능함. 하지만 file 객체를 다시 받아와서 다시 storage로 업뎃할때 file이 제대로 된 값이 올라가지 않는 문제점.. uint8array로 받아온 file을 다시 file 객체로 바꿔서 업로드 해야함..

## 2022\-07\-15

문서 업데이트시 로직. submit 이벤트에서 분기처리.
firstore.js 에서 article 수정로직필요. setArticle에서 분기처리 or 새로운 api 만들기.
만약 article 값이 삭제되면 user collection 문서의 userArticles필드도 같이 삭제처리
article 수정시에 image file의변동이 있으면 storage도 다시 업데이트해야함.

오류 노트

배열을 이용해 순차적인 서버와 통신을 할때 기본적으로 비동기식으로 동작을하는데, 배열 메서드인 forEach로 이작업을 수행할때 forEach의 콜백함수가 async await 적용이 되어있다하더라도 promise 를 await 하지않고 코드가 진행됨.

때문에 for..of 문을 사용해서 await를 사용해서 순차적인 실행을 할 수도 있고, 순차적실행이아닌 병렬적 실행을 의해 map함수로 promise 배열을 만들어 return 하고 Promise.all()을 이용해서 비동기함수들을 동시에 실행시킨 값을 받을 수 잇음

## 2022\-07\-14

## 2022\-07\-13

image downloadURl을 이용해서 xhr request를 하거나 axios이용해서 파일을 메모리상으로 다운로드 해서 editform.jsx의 file input 으로 넣어줘야함.

하지만 서버요청시에 아래의 에러가 발생함.

from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field access-control-allow-origin is not allowed by Access-Control-Allow-Headers in preflight response.

CORS는 교차 출처 리소스 공유의 약자로 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다. 웹 애플리케이션은 리소스가 자신의 출처(도메인, 프로토콜, 포트)와 다를 때 교차 출처 HTTP 요청을 실행합니다. 내 앱에서 예시를 들면 http://localhost:3000의 프론트 엔드 코드로 서버에 통신 요청을하는데 해당 통신 URL은 http://locallhost:3000이 아닌 https://firebasestorage.googleapis.com/blabla...를 통하여 리소스를 요청하기 때문에 발생하는 문제이다

이문제를 해결해야 정상적으로 앱의 메모리상으로 file을 받아 files객체를 만들어 필요한 곳에 처리를 할 수 있음.

## 2022\-07\-12

사용자 메뉴 버튼 이미지로 대체하고 마우스 hover때 tooltip으로 설명란추가
posting form 과 edit form 은 ui를 공유함. posting form 을 재사용해서 상황에 맞춰서 데이터 바인딩을 다르게해야함.

## 2022\-07\-11

사용자 프로필 판매목록, 구매목록, 관심목록
userAdminMenu.jsx 세가지 기능있음 -> 수정, 끌어올리기, 삭제, 숨기기
styled-components의 확장할때 확장하는 컴포넌트에 className을 props를 넘겨주고 className을 해당 styled-component에 적용해야지 component확장이 가능.

## 2022\-07\-08

## 2022\-07\-07

search Term을 포함한 문서를 시간순서대로 가져오고 queryCursor 를 이용해서 문서를 효율적으로 검색해 오는 로직 작성완료.
위 방식은 google api를 요청해서 비동기식으로 동작함. 비동기 요청이 끝난후 searchTerm의 반복회수에 따라 정렬, 그 후에 다시 로그인한 유저의 지역정보와 가까운 쪽으로 정렬하는 reducer로 state를 관리함.

정렬방식이 내가 의도한 대로 정렬이되긴하지만 효율적인 정렬인지 의문이듬.. 지금은 더 좋은 생각이 없으니 이방식 그대로 사용하기로함.

한가지 문제점은 data fetching을 비동기식으로 하는동안 data가 존재하지않아 search.jsx에 Noresult 컴포넌트가 로딩되면서 검색하고자하는 게시물이 존재하는데도 noresult > searchResult의 순서로 두번 mount됨. 이 문제를 해결해야함.

queryCursor를 이용한 순차적인 data 요청 코드는 작성완료.

todoList

1. user의 subscribe list로 가격변동을 알림받는 로직작성해야함.
   firestore의 실시간 업데이트 수신 api를 이용.
1. 게시물 수정, 삭제하는 로직을 작성하는데 삭제했을때 해당 경로를 참조하는 field의 삭제 업데이트도 해주어야함.
   이것도 firstore 실시간 업데이트 로직으로 해결해야함.
1. 게시물에 댓글 달기기능.

## 2022\-07\-06

## 2022\-07\-05

검색어 searching시에 검색어로 문서가 검색되지 않았을때 while 문 break 포인트 잡아줘야함..

test2 api는 limitCount만큼의 searchTerm을 포함하고있는 article의 필드가 있을때만 loop를 빠져나오고 limitCount 만큼의 article의 배열을 만들어서 리턴함..
그런데 문서를 탐색하면서 searchTerm을 포함하고있는 필드를 가진 article의 개수가 limitCount 보다 적거나 아예없는 경우의 수를 체크 해줘야함.

현재 구상방안으로는 article collection의 document.size를 알아내고, while 문을 반복하면서 snapshot 의 탐색이 document.size 만큼 반복이 된다면 break 문으로 빠져 나오는 생각중임..

## 2022\-07\-04

렌더링시 state 설정 순서. 같은 컴포넌트가 unmount 되지않고 props만 변경되어 보여지는 data 값만 바뀔때 useState의 초기 설정은 두번째 렌더링시 초기화되지 않는다. 아래 코드는 렌더링 과정의 이해를 돕기위한 코드.

```javascript
// ------------
// 첫 번째 렌더링
// ------------
useState('Mary'); // 1. 'Mary'라는 name state 변수를 선언합니다.
useEffect(persistForm); // 2. 폼 데이터를 저장하기 위한 effect를 추가합니다.
useState('Poppins'); // 3. 'Poppins'라는 surname state 변수를 선언합니다.
useEffect(updateTitle); // 4. 제목을 업데이트하기 위한 effect를 추가합니다.

// -------------
// 두 번째 렌더링
// -------------
useState('Mary'); // 1. name state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(persistForm); // 2. 폼 데이터를 저장하기 위한 effect가 대체됩니다.
useState('Poppins'); // 3. surname state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(updateTitle); // 4. 제목을 업데이트하기 위한 effect가 대체됩니다.

// ...
```

search.jsx > searchResult.jsx의 데이터 페이지화. 이것또한 queryCursor를 이용해서 구현하기.

fireStore getOrderedArticle함수에서 쿼리커서 적용하기
getorderedArticle 함수의 기존 구조상 queryCursor를 특정하기 어려움. firestore.test2함수 작성완료하기.

## 2022\-07\-01

query cursor로 데이터 페이지화 된 api 요청하는 컴포넌트 수정
페이지화 된 데이터를 사용된 컴포넌트는 Search.jsx > noResult.jsx , Article.jsx 임.
위에 사용된 컴포넌트는 실질적으로 LatestItem.jsx 컴포넌트를 임포트해서 렌더링 함.

결국 LatestItem.jsx 컴포넌트를 임포트해서 사용하는 부모컴포넌트까지 props를 전달해야함.
lastestItem을 한번 부르고. 다른곳에서 렌더링할때는 쿼리커서가 초기화 되야함.

app.jsx에서 history.loaction.pathname 값 변경감지해서 firestore에서 this.queryCursor 값 초기화해주어야함.
현재 나의 앱에서 react-router-dom 의 버전은 5.2.0 -> 최신버전 v6에서 생각보다 많이 바뀌었는데 코드를 버전에 맞춰서 다시 고쳐야할듯

## 2022\-06\-30

infinite carousel 독립된 컴포넌트화 작업완료.
마지막남은 json server api 최근에 업로드된 article 목록 가져와서 보여주는 로직 fireStore로 대체하기.

infinite carousel에서 버튼의 click event로 state값이 변경되는데 transition 기간동안 setState가 여러번 호출되지 않도록하기위해 debounce 함수를 만들어서 이벤트 함수에 적용함.

article.jsx의 image carousel의 현재 보여지는 image를 눌렀을때 더 큰 화면으로 carousel을 띄워주는 portal만들어 주었음.

깨달은점.. 로직의 원리자체가 이해가 가면 굳이 남의 코드와 유사한 구조로 작성할 필요는 없다.. 이해가 정 가지 않으면 그때 다른 사람의 코드를 이해하려고 해도 늦지않는다. 일단 내방식대로 구현해보고 그래도 안될때 다른 사람의 코드를 이해해서 내껄로 적용해보는 절차가 필요한것같다.

최근 목록가져와서 보여주기. -> 내림차순 정렬 orderBy('정렬할 필드이름','desc') 오름차순 정렬은 기본값.
itemIdxRef로 데이터의 끝 index를 특정한다. 그리고 데이터를 다시 로딩하는 시작점은 이전에 fetching 해서 state로 보관하는 데이터 배열의 length - 1 값이된다. 이걸통해서 fireStore의 쿼리커서를 이용한 사용자가 발생시킨 event 작동시에 필요한 data만 fetching 할 수 있다.
firestore documentation의 쿼리 커서와 데이터 페이지화 키워드로 검색하여 참고함.

todolist

쿼리커서를 이용해서 data fetching 효율적으로 하기. firestore class의 constructor this.queryCursor 값으로 startAt의 snapshot값을 기억해서 쿼리커서가 필요한경우 this.queryCursor 값을 이용해서 구현할 계획.

## 2022\-06\-29

실제 원본배열에 사진 data 가 있음.
infinite carousel을 구현하기위해선 원본배열의 양끝에 실제 이동을 한듯한 효과를 위한 원본배열의 첫번째와 마지막 item이 필요함.

1. 첫번째 렌더링시에는 clone된 item이 image component의 제일 처음에 위치하기때문에 위치조정이 clone된 item이 아니라 원본배열의 첫번째 item으로 x축 조정이 필요함.

1. 첫렌더링이 끝난후 캐러셀의 container의 x축 길이는 (원본배열의 길이 + 트릭을 위해 클론된 이미지 개수 ) \* 부모로 부터 상속받은 width값이 된다.

1.

## 2022\-06\-28

img src 안보이던 이유는 overflow 먹인 element를 잘못설정;; 처음에 생각했던대로 url만 src에 연결해주면됨.
현재 carousel.jsx 독립된 컴포넌트화 작업 완료. 무한슬라이드로 만들어야하는 로직에 대해고민중.

[무한스크롤 참고링크](https://ye-yo.github.io/react/2022/01/21/infinite-carousel.html)

이해가 완전히 가지는않지만 이번엔 꼭 완성한다... 무한 슬라이드 트릭

## 2022\-06\-27

button안에 svg 형식의 이미지를 사용하고있음. svg 이미지에 transform scale css를 적용할때 일반적인 img 태그와 svg이미지의 작동방식이다름. transform oringin의 좌표의 기본값이 서로 다르기 때문에 svg 와 img의 scale변경이 다른 방식으로 보여짐.
css property로 origin 값을 직접변경 보단 translateY로 먼저 당겨 주고 scale적용으로 해결

carousel 컴포넌트는 경우에 따라 button이 필요한 경우와 필요가 없는 경우가 있음. button의 렌더링 여부는 해당 carousel을 렌더링 할때 withButton props값이 true, false인지에 따라 결정함. 또 button을 absolute로 포지셔닝할때 부모가 relative요소 일때의 컨테이닝 블록이결정되기도 하지만 transform 속성이 none이 아닌 가장 가까운 조상값인 carousel container 블록에 포지셔닝 된다는 사실을 알게됨. 때문에 button 컴포넌트는 carousel container block의 바깥에서 렌더링하기로함.

현재 fireStore 참조경로를 바로 img태그의 src로 삽입할경우 첫렌더링시에 보이는 img 태그만 제대로 사진이 보이고 carousel로 숨겨진 img 태그의 src가 작동하지않음..carousel의 image index를 변화시켜 화면을 이동시킬시 빈 화면만 보임.
fireStore에 image가 저장된 storage 참조경로를 getDownload url로 읽어와서 img태그의 attribute로 세팅해서 테스트 해보기.
fireStorage documentation getDouwloadURL() 참고하기. fireStore에 저장된 참조자체를 src연결하는것이 아니라 참조를 통해 blob데이터를 만들고 src로 연결하는듯.

## 2022\-06\-24

logout 에러코드 정리 => dispatch type reset 하는 타이밍 완.  
userArtcles.jsx css 마무리 완.  
components/datails/article.jsx carousel코드 컴포넌트로 분리하기. carousel 사진 탐색하는 onClickDot 이벤트 ui 완성하기완.  
carousel 이미지 클릭시 확대해서 보는 기능 -> portal로 이미지만 더 자세히 볼수있게만들기 이것도 carousel 컴포넌트를 포탈안에서 부르기만 하면됨.

자잘한 부분으로 article.jsx 올린 시간 사용자가 알아보기 쉽게 얼마전에 포스팅한 글인지 알려주기.
auth가 발급된 유저만 이용할수 있는 컨텐츠에서의 로직고민해보기. history.push('/') 해주는데 auth상태를 어떻게 구분할것인지.

carousel.jsx의 이동버튼도 따로 component화 해서 필요한 곳에서만 import 해서 사용.

components/details/article.jsx 에서 렌더링되는 carousel 컴포넌트를 기존코드는 forWardRef, article.jsx 컴포넌트의 state와 엮여있어서 독립된 컴포넌트로 작동하기 힘든 코드였음. 때문에 carousel-btn.jsx demoCarousel.jsx를 추가하고 독립된 컴포넌트 코드로 만드는 작업중.

carousel 만들때 되도록이면 useRef를 사용하지 않고하려는데 방법을 모르겠음. 이미지를 가로 정렬하려는데 이미지를 감싸고있는 부모요소가 이미지가 가로로 쌓이면서 옆으로 width값이 늘어나게만들어야 함.

## 2022\-06\-23

userInfo.jsx, firStore.js, userManner.jsx, userArticles.jsx firStore api와 연동작업 완료함.

## 2022\-06\-22

유저 로그인auth 정보 state 업데이트 끝나고 auth 의 uid로 해당유저의 document를 가져오고 최종적으로 state 업데이트하는 방식으로 바꿈.
불필요한 dispatch 호출이 줄어들어서 re-rendering 최소화

현재 userInfo.jsx에서 기존코드는 store와 연동이 되지않았는데 연동하는 코드로 바꾸느작업중.

## 2022\-06\-21

유저가 정상적인 방법으로 로그인성공하고 fireStore에 userData를 업데이트 할때 유저가 기존에 존재하는 유저일때와 새로 가입한 유저인지를 먼저 파악을 해야한다.

user의 document의 manner필드는 key와 value를 가진 객체이다.  
manner 필드의 key는 매너종류, value는 number type값으로 초기값을 0으로 가진다.

user document는 필드로 userArticles와 reviews를 가진다.

userArticles는 유저가 판매하는 물품을 갖고있는 필드이고 query를 사용하여 해당유저 article의 참조를 배열로 저장한다.

reviews는 해당유저의 게시글에 달린 다른 유저들의 댓글을 가져올수 있어야한다.  
리뷰정보는 유저 정보의 comments collection에 저장되고 해당컬렉션은 자동생성 id를 식별자로 가진 document를 가지고있다.  
해당 document는 댓글이 달린 시간을 나타내는 serverTimeStamp필드, 댓글이 달린 articleId필드, comment, 댓글을 달았던 유저의 uid필드를 가진다.

fireStore에 getComments 함수를 만들어서 article한개를 유저가 검색할때 reviews 컬렉션의 articleId 필드값으로 쿼리하고 serverTimeStamp로 정렬해서 해당article 컴포넌트에서 보여질수 있게한다.

app.jsx 의 dispatch로 userInfo를 업데이트 하고난뒤 firestore로 push 하던 로직을 authState change에서 먼저 fireStore로 push하고난뒤 fireStore에 저장됬던 값을 다시 읽어오는 것으로 대체하기로함. fireStore.setUserData에서 기존유저와 신규유저 업데이트 로직을 분기처리 하기로함.

## 2022\-06\-20

firestore자료구조가 객체안의 배열을 가질수 있는지 체크 => 안됨.
firestore 자료구조 수정 => [ 구독한 artilce의 refernce, ... ] 이 방식으로.
fireStore 자료 구조로 map객체를 이용해서 저장할 수 있음.

map 객체 정리  
for...of 루프를 사용해서 iteration 가능하고, 또는 iteration method인 foreEach를 사용해서 순회가능.

static prorperty : get Map\[@@species]  
배열object를 인자로 받아서 새로운 map 객체를 생성한다. constructor fucntion

instance property : Map.prototype.size
key/value 쌍의 갯수를 return

instance methods

map.prototype.clear() => remove all key/value pairs  
map.prototype.get(key) => returns key or undefined  
map.prototype.has(key) => returns boolean  
map.prototype.set(key, value) => set map object

iteration methods  
Object prototype method와 사용법 같음.

map.prototype.keys()  
map.prototype.values()  
map.prototype.entries()  
map.prototype.forEach(callbackFn)

Map객체 대신 article의 reference를 저장하기로 결정. fireStore에서 권장하는 경로인 collectionName(article)/docId(articleId)로 저장함.
유저의 기본적인 data세팅을 해주려고하는데 현재 필요한 값은 초기값인 userList: [] 상태의 값이 필요함.  
authStateChange 관찰자 함수로는 값을 리턴할수 없어서 authStateChange안에서 state 변화를 설정해주어야 함.  
또 현재 유저의 정보를 fireStore로 업데이트 하는 메서드가 사용이되지않는것같음. -> 유저가 구독을 했을때 user정보를 저장하는 store도 같이 업데이트.

## 2022\-06\-17

구독하기 버튼에 마우스 오버시에 안내 텍스트 작업완료.  
article footer 디테일한 css작업 완료.  
article footer에서 구독하기 버튼기능에 필요한 state, store 자료구조, effect 구상완료

fireStore는 app을 사용하는 유저정보를 root의 users collection에 저장하고있음.  
users collection은 authentication을 제공해주는 업체로 부터 uid값을 가져와 users 컬렉션의 document의 id로 사용하고있음.  
users 컬렉션의 하위 document의 필드값인 aritcles는 해당유저가 게시했던 게시물의 id를 갖고 있다.  
이것으로 해당유저의 게시물을 검색할때 store root의 article collection에서 게시물의 id로 유저의 게시물을 검색해온다.

또 다른 필드값인 subscribeList는 해당유저가 구독했던 다른 사용자의 게시물의 id를 갖고있어 해당 게시물의 가격이 변동될시에 구독했던 유저에게 알림이 가도록 구현한다. priceChange의 기본값은 false  
ex) [ {articleId, priceChange: true or false}, ...etc ]

=> 객체로 이루어진 배열을 만들 수 없음. 객체로 이루어진 객체로 수정(확정아님)  
ex) { {articleId, priceChange: true or false}, ...etc }  
혹은 document의 참조자체를 저장하는 방법도 고려..

store root의 aritcle collection은 모든 유저들이 포스팅한 게시물들이 저장되는 곳이고 id 값은 firestore에서 자동으로 생성해주는 값으로 사용한다. 이곳에선 subscribe기능을 제공하기위한 subscribe 필드를 가지고 있고 유저가 해당게시물을 수정할때 price 필드도 변경하게 되면 subscribe.uid 객체의 값을 읽어와 해당 유저를 찾고 위에 설계한 subscribeList의 priceChange 값을 바꿔준다. 최종적으로 priceChange값이 true가 되면 해당유저에게 알림이 가도록 만들어준다.

## 2022\-06\-16

redux-saga 사용의 필요성.

articleFooter 컴포넌트 추가했고, 이 컴포넌트에서는 해당 article에대한 구독하기버튼과 가격 제안하기, 채팅하기 버튼이있다.

가격 제안하기는 router link /negotiation/:articleId로 경로를 만들어주고 해당경로가 요청됬을때 해당페이지에서 portal을 이용해 negotiation.jsx를 띄워준다.  
해당 컴포넌트는 가격을 제안할 수 있고 너무 적은 금액은 네고가 불가능하게 구현해야함. 가격제의가 들어오면 aritcle게시자에게 알림이 가도록 만들어준다.

article검색하는 사용자는 subscribe 버튼으로 article의 게시자가 가격을 바꿧을때 알림이가도록 구현해야한다.

채팅은 아직 구상중이고 subscribe, negotiation 관련된 fireStore 자료구조를 구상해봐야할듯. 그리고 redux-saga내용 추가로 더 정리하기.

## 2022\-06\-15

components/details/article.jsx json-server api를 fireStore api 로 대체하기 완료  
searchResult.jsx 컴포넌트에 구독하기 버튼, 댓글달기, 채팅 기능 구현하기  
article.jsx 컴포넌트에서 userInfo의 displayName, profile-image, subscribeCount가 필요하기때문에 fireStore.js의 article 업로드 api에서 해당정보도 저장하도록 바꾼다.  
aritcle.jsx에서 보이는 정보는 serverTimestamp와 유저가 aritcle을 탐색한 시점의 시간을 비교하여 언제게시된 article인지 알 수 있게 나타내야한다.

당근마켓에서 물품을 검색했을때 썸네일, 제목, 지역, 가격, 구독하기(하트아이콘)이 존재한다.
해당물품의 썸네일 정보를 보여주는 카드를 클릭하게 되면 물품의 상세정보 페이지로 이동하게된다.
상세정보 페이지는 물품의 사진의 개수에따라 carousel로 보여주고 탐색하고 있는 article을 구독할 수 있는 버튼이있어야 한다.

js date 객체로 경과시간 검색 및 date 객체를 바탕으로 경과 시간, 경과 일 수로 나타내어 사용자가 쉽게 알아볼 수 있게한다.

carousel.jsx 컴포넌트화 하여 필요한 다른 컴포넌트에서도 import 하여 사용할 수 있게 만든다. 현재 로직은 구현되어있으나 최적화와 state를 효율적으로 관리할 수 있도록 만들어야한다.

## 2022\-06\-14

로그인 상태에서만 유저의 위치를 가져와서 지역에 맞는 매칭을 할 수 있음. 로그인을 하지않고 검색을 할때는 지역에 따른 sort를 하지않는다.  
때문에 기존 검색어로 정렬하는 코드의 api요청은 fireStore.js에서 요청을 하되 로그인 여부를 판별하고 가져온 값을 바탕으로 다시 region우선 순위로 정렬하는 것은 search.jsx에서 한다.

기존코드를 로그인정보가 있는지에 따라 state를 다시 업데이트 하는 코드를 작성중 이전state를 기준으로 state를 sort하므로 re-render가 계속 반복되는 상황발생. 기존 useState코드 대신 useReducer 코드로 작성하기로 함.

useEffect 내부에서 의존을 줄이기위해 reducer의 dispatch함수로 업데이트를 진행하고 이전 코드를 바탕으로 실질적 업데이트 코드는 reduce함수 내에서 실행하기때문에 useEffect 의존배열값을 필요한 값으로만 최소화 할 수 있음.

```javaScript
// 아래코드는 state를 관리하는 reduce함수의 일부와 state를 fetching 하는 useEffect함수이다
// useEffect 내부에서 업데이트를 실행하지않고 dispatch 함수로 필요한 값을 전달하여 reduce함수 안에서 업데이트를 실행하므로
// useEffect 의존배열에서 state에 대한 의존이 없는 것을 볼 수있다.
case 'orderByRegion':
      const sortedByRegion = state
        .reduce((acc, curr, index) => {
          let depth = 1;
          const maxDepth = 4;
          if (curr.region_B.code === action.region_B.code) {
            return acc.concat({ index, depthMatchCount: maxDepth });
          }

          while (depth <= maxDepth) {
            const propertyName = `region_${depth}depth_name`;
            if (
              curr.region_B[propertyName] &&
              action.region_B[propertyName] &&
              curr.region_B[propertyName] !== action.region_B[propertyName]
            ) {
              return acc.concat({ index, depthMatchCount: depth - 1 });
            }
            depth++;
          }
          return acc.concat({ index, depthMatchCount: 0 });
        }, [])
        .sort((a, b) => b.depthMatchCount - a.depthMatchCount);
      const result = sortedByRegion.map((el) => state[el.index]);
      return [...result];

useEffect(() => {
    const getArticle = async () => {
      const res = await fireStore.getOrderedArticle(searchTerm);
      dispatch({ type: 'getArticleByTerm', articles: res });
      if (!userInfo.region_B) return;
      dispatch({ type: 'orderByRegion', region_B: userInfo.region_B });
      dispatch({ type: 'editArticle', loadIdx });
    };
    getArticle();
  }, [fireStore, loadIdx, searchTerm, userInfo.region_B]);
```

기존 searchResult.jsx 에서 관리하던 state는 부모component인 search.jsx의 state와 곂치는 것이 많기때문에 state를 search.jsx로 끌어올리고 props로 전달하는 코드로 바꿧다.  
search.jsx와 searchResult.jsx 컴포넌트의 json-server 코드를 fireStore코드로 바꾸는 작업 완료.

## 2022\-06\-13

array.prototype.reduce 함수의 accumulator 역할을하는 첫번째 인자는 계속 새로운 reference를 생성해줘야 제대로 값이 누적이된다.  
push메서드로 값을 return 하게되면 기존의 reference를 그대로 유지하기때문에 작업후의 값이 제대로 누적되지않는다.  
=> 확실치않음. 내 코드상에선 push 메서드로는 제대로 누적되지않고 concat으로 새로운 ref를 만들어줘야 제대로 누적됨.. 제대로 알아보기.

array.prototype.sort 함수의 compareFunction은 배열내의 요소마다 여러번 호출 될 수 있다. compareFunction이 복잡해지고 정렬할 요소가 많아질 경우, array.prototype.map을 이용한 정렬을 고려해보는것이좋다. 이방법은 임시 배열을 만들어서 여기에 실제 정렬할 값만 뽑아서 넣어 정렬하고, 그 결과를 바탕으로 실제정렬을 하는것이다.

reduce함수로 배열을 만든다. 배열은 객체를 배열의 요소를 갖고있는데 reduce함수의 리턴값으로 만든다. reduce 함수로 리턴을 할때 기존 객체를 그대로 리턴하는것이아닌 단어의 반복을 나타내는 termIntitle, termIndescription 필드와 articleIndex를 필드로 갖는다.  
그리고 title description필드 순으로 sort함수로 반복하여 값을 리턴, 리턴된 값을 다시 map으로 순차적으로 탐색하여 index로 return하면 원하는 값이 나온다.

```javaScript
// ... searchTerm 정렬 코드는 중략 아래의 sortedByTerm의 값임.
// 필요한 정보를 전부 들고있지않고 배열의 index로만 기억한다.
// 정렬에 필요한 필드를만들고 그 필드를 이용해 sort메서드로 정렬을한다.
// return 되는 값은 index를 갖고있기떄문에 원본배열의 index에 접근하여 map함수로 순차적으로 리턴한다.
const sortedByTerm_Region = sortedByTerm
      .reduce((acc, curr, index) => {
        let depth = 1;
        const maxDepth = 4;
        // 여기서 정렬에 필요한것은 depthMatchCount의 값만 필요. 굳이 다른 정보들까지 기억할 필요 x
        if (curr.region_B.code === userRegion.code) {
          return acc.concat({ index, depthMatchCount: maxDepth });
        }

        while (depth <= maxDepth) {
          const propertyName = `region_${depth}depth_name`;
          if (
            curr.region_B[propertyName] &&
            userRegion[propertyName] &&
            curr.region_B[propertyName] !== userRegion[propertyName]
          ) {
            return acc.concat({ index, depthMatchCount: depth - 1 });
          }
          depth++;
        }
        return acc;
      }, [])
      .sort((a, b) => b.depthMatchCount - a.depthMatchCount);
    // reduce로 정렬에 필요한 값을 카운팅했던 배열에 다시 접근하여 소트된 array에 기억해둔 index에 따라 순차적으로 data array를 만들어 return
    const result = sortedByTerm_Region.map((el) => sortedByTerm[el.index]);
```

현재 구현된 소트 우선순위.

1. 내 위치와 가까운곳부터
1. title에 serachTerm의 반복이 많을 수록
1. description에 searchTerm 반복이 많을 수록
1. article이 게시된 시간순으로

todolist  
search.jsx > searchResult.jsx의 검색했을때 json-server api로 값을 가져와 보여주는 코드를 fireStore로 가져와 보여주는 코드로 바꾼다.  
searchResult.jsx의 link router로 연결되는 ./components/datails/article.jsx의 json-server 코드도 fireStore코드로 대체한다.

## 2022\-06\-10

기본적으로 fireStore 쿼리는 조건에 맞는 모든문서를 문서 ID에 따라 오름차순으로 정렬한다.  
orderBy()를 사용하여 데이터의 정렬순서를 지정하고 limit()를 사용하여 검색된 문서 수를 제한 할 수 있음.  
만약 내림차순 정렬을 하고 싶으면 orderBy('필드이름', 'desc')를 사용해서 정렬할 수 있다.

firebase error

Uncaught (in promise) FirebaseError: The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/daangnclone/firestore/indexes?blahblah

fireStore는 대부분의 기본쿼리에 대한 색인이 자동으로 생성된다. 만약 기존 색인에 매핑된 쿼리 아닌 복합쿼리를 생성하게되면 오류 메시지가 뜨게된다. 오류 메시지에는 누락된 색인을 만드는 직접적인 링크가 뜨게 되고 생성된 링크를 따라 firebase console로 이동하고 복합쿼리에 대한 자동으로 입력된 정보를 검토한후 색인을 생성할 수 있다.

fireStore.js

getOrderedSearchTerm() 메서드 작성중..  
api정렬은 timeStamp, workProgress 값으로 먼저 정렬했고, 사용자가 검색한 연관된 article만 또 정렬해야하는데 api가 존재하지않아 직접 작성. 검색어와 지역으로 두번정렬을 해야하는데 코드가 길어질것같아 reducer 함수를 이용하기로 했고, 로직에 대해서 고민중.

1. 첫번째 필터로 title, description 값이 검색어를 포함하고 있는지 체크를 먼저했음.  
   postiongForm.jsx에서 사용자가 아무값도 입력하지 않았을때 체크를 하지않아 null값이 넘어왔을때 String.prototype.includes를 상속받을 수 없기때문에 postingForm.jsx의 null값 체크 코드를 작성해야함.

1. 문자열 함수인 match()를 이용해서 해당 필드에 검색한 단어가 몇번 반복이 되는지 알 수 있고, 반복 회수가 많아질수록 상위index를 갖게 만들어 노출이 상위에 되게한다. match 함수에선 regExp를 사용자가 입력하는 가변인자로 사용을 하려는데 가변인자로 정규표현식 만드는 방법을 잘모르겠다. 현재 match 함수를 실행식키면 분명 검색한 문자열을 포함하고 있음에도 null값을 리턴한다. 추측인데 regExp 생성을 잘못한것같음. mdn 정규표현식 문서를 좀 더 참고해야할듯..

1. 단어로 정렬 후에 사용자의 위치와 가까운 곳에서 부터 다시정렬

1. if문의 중첩이 많기 때문에 가독성을 높이는 코드 작성의 필요성. 아직까진 고려할 사항은 아닌듯 로직먼저 완성을 하되 머리속에 염두는 하면서 작성하기.

## 2022\-06\-09

1. 이전에 작성했던 code 분석 및 firebase api설계
1. app.jsx / search.jsx state, router 리팩토링

article.jsx 컴포넌트 정리

1. root의 route path인 /article/:artilceId로 렌더링된다.
1. root에는 search 컴포넌트가 존재하고 article.jsx 컴포넌트와 latestItemList props를 공유한다.
1. latestItemList는 article, search 컴포넌트의 하단에 위치하고 사용자가 접근한 article과 비슷한 물품을 빠르게 검색할 수 있도록 도와준다.
   lastesItemList는 api class props로 넘겨주고 serverTimestamp, region_B, 사용자가 탐색하고있는 article의 cartegory와 같은 cartegory 순으로 정렬을 해서 보여준다.
1. 기존 코드에서는 props로 api class를 받는데, 이 api props는 Carousel의 image를 로드하는데 사용을 했었으나 fireStore에 img를 로드할 수 있는 경로를 저장해두었기에 해당 props는 필요가없음.
1. ariticle 컴포넌트 안에는 carousel을 다른곳에서도 사용할 수 있게 module화 한 carousel 컴포넌트가 존재한다.
1. 위치별 정렬은 regin_B 필드의 값중에 depth_name이 최대 4개까지 존재하게되는데, article의 depth를 순차적으로 1~4까지 비교하고 depth4가 같은 article 을 먼저 보여주고 만약 depth4가 곂치는 article이 더이상 존재하지않는다면 depth3이 곂치는 article순으로 depth1까지 순차적으로 article을 정렬한다.
1. article.jsx를 불러오는 route 요청은 두가지 경우가 있는데, 사용자가 물품 searching을 했을때와 다른 사람의 아이디의 올린 물품을 검색하는 경우로 나뉜다.
1. api로 검색하고자하는 article에 접근할 수 있는 방법을 제공하는 search.jsx와 userInfo.jsx를 먼저 작업해야함. 그 후에 article.jsx

search.jsx 컴포넌트 정리

1. search 컴포넌트로 이동하는 route path 요청은 haeder.jsx에서 이뤄지고 root에서 state를 관리한다.  
   state는 didSearch, searchTerm이 있고 didSearch의 값으로 사용자가 검색하고 재검색을 할때 route path 요청을 여러번 할 수 있도록 했다.  
   searchTerm은 사용자가 검색한 단어를 route로 로드하는 jsx페이지의 props로 넘겨주어 api요청의 arguments로 사용한다.
1. route path 요청은 history 객체의 push로 root에서 제어한다.

fireStore 쿼리 정렬

fireStore 문자열 검색 api는 따로 존재하지않음.  
때문에 api로 정렬할수 있는 field는 api로 정렬을 하고 js 문자열 함수를 이용해서 필드의 값을 직접탐색 해보기로함.  
store내부 함수에서 한번에 정렬해서 리턴해야 쓸데없는 메모리 손실을 줄일수 있음.  
store query 검색으로 timeStamp, region 두가지 조건으로 정렬 후 snapshot 리턴받고 snapshot의 필드로 접근해서 string.includes로 filtering(title 필드 먼저 필터하고 필터된 값 모아주고 그 다음은 description 필드 필터링해서 후순위로 쌓아주기)  
이 값들은 search/:searchTerm path로 렌더링되는 컴포넌트에 보여질 값임.

## 2022\-06\-08

1. input file로 입력받은 파일을 storage로 저장하는 작업완료
1. storage로 저장한 file의 다운로드 경로를 store로 저장하는작업 완료
1. async/await 함수의 사용으로 then 콜백지옥 문제해결
1. input file의 fileList 객체를 수정하는 작업완료
1. fireStore 필드로 workProgress 추가하고 workProgress 값이 true일 때만 다른사용자에게 노출.
   파일업로드와 다운로드 url 저장 작업이 끝나기 전까지 다른사용자에게 article 노출이 되지않도록 설계

input file에 파일을 사용자가 선택해서 올렸을때 잘못올린 파일을 삭제가 가능해야한다.  
input file 은 내부적으로 files라는 이름의 fileList 객체를 가지고있다.  
문제는 fileList 객체에 직접 접근해서 fileList 객체를 수정할 수 없다는 것이다.  
때문에 fileList 객체를 배열로 변환하고 필요한 작업을 한 후에(나의 경우는 선택한 file객체 삭제) dataTransfer 객체의 items 프로퍼티의 add 메서드로 transfer의 객체의 items 프로퍼티의 item을 다시 만들고 transfer의 files 프로퍼티로 fileList객체를 리턴받아 input file의 fileList를 다시 설정해주는것으로 해결했다.

onchange event re-render 문제에 대해..  
postingform은 현재 제어컴포넌트 형식으로 state를 관리하고있음. 따라서 제어하는 state가 변할때마다 렌더링이 발생한다.  
비제어컴포넌트를 사용하는 것도 고려했지만 react-hook-form 라이브러리를 사용해서 해결 할 수도있고 나중에 state에 따른 다른 작업이 필요할 수 있기때문에 제어컴포넌트 형식을 유지하기로 결정함(사실 귀찮음...)

todo list

1. carousel완성하기
1. 사용자가 posting한 article을 다른 사용자에게 보여주고 보여지는 article 에선 구독하기(가격변동시 알림), 채팅, 댓글달기 기능구현
1. 검색으로도 article 접근할 수 있고 사용자의 프로필을 통해 article을 보여주는 두가지 경우의 수

## 2022\-06\-07

- async/await 함수는 promise를 리턴함.
- promise의 값을 풀어서 사용할때 async / await 함수의 리턴값을 then으로 계속 연결을 하는것이 옳바른 방향인가?
  연속적인 promise값을 연결할때는 async/await 함수의 return 값을 then으로 연결하기 보단 변수에 할당하여 해당 변수는 promise가 값을 리턴할때까지 기다리는 코드로 가독성을 높이는것이 더 좋은 방법!
- async/await 함수를 사용해야될 상황과 아닌상황 구분.  
  함수의 호출이 비동기적으로 작동하는것이 더 효율적일 때도있다.  
  비동기 함수가 서로에게 영향을 끼치지 않는 경우는 처리속도면에서 비동기식으로 작성하는것이 더 효율적임.  
  나의 경우를 예로 들자면 file업로드는 함수는 async적용할 필요가없이 바로 file의 reference를 동기적으로 리턴하는게 맞음.  
  굳이 async처리를 해서 지연시간을 늘릴 필요는 없다!
  setArticle 함수의 경우는 article이 store에 업데이트 되기 전까지 article의 id가 생성되었으리라는 보장이없으므로 async/await 함수를 사용하는것이 맞는 방법이다.
- promise를 한개씩 순차적으로 처리하는게 아닌 promise를 병렬적으로 처리하고 완료후 어떤 작업을 해야되는 상황의 해결방법.

- 비동기의 동작원리

  1. call stack 에서 비동기 함수가 호출되면 먼저 Call stack 에 쌓였다가 Web Api로 해당 비동기 함수가 이동(trigger x)되고 callStack에선 사라진다.

  1. Web Api 에서 비동기 함수의 event listener가 실행 되면 해당 이벤트의 call back 함수는 call back queue로 이동된다.

  1. call stack 이 비어있는지 event loop가 확인을 하고 call stack이 비어있다면 call back queue에 있는 call back 함수를
     call stack으로 이동한다.

  1. call stack에 들어온 콜백함수는 실행이되고 실행이 끝나면 call stack 에서 사라진다.

google api인 getDownloadURL(), uploadBytes() 메서드는 결과값으로 promise를 리턴한다.
이 메서드는 비동기식으로 작동을 하기때문에 async/await 처리를 하게된다면, 각 함수가 어떠한 값을 리턴할때까지 기다리고 다음 작업을 할 수있다.

async/await함수의 목적은 사용하는 여러 promise의 동작을 동기스럽게 사용할 수 있게 하고, 어떠한 동작을 여러 promise의 그룹에서 간단하게 동작하게 하는 것이다.

async 함수는 항상 promise를 반환한다. 만약 aysnc 함수의 반환값이 명시적으로 promise값이 아니라면 암묵적으로 promise로 감싸진다.

## 2022\-06\-06

파일을 storage로 업로드하는 타이밍은 전체적인 데이터를 전부 작성하고 submit btn 을 눌렀을때로 확정

fireStore에 저장하는 참조값은 storage의 getDownloadURL(file) api로 리턴받은 url을 넣어줘야하고, 이값을 읽어와서 이미지 element의 src로 연결해 보여준다.  
각 api는 비동기식으로 작동을하는데 promise 리턴과 체인에대해 아직은 많이 헷갈리는 상황이고 나는 분명 await로 promise의 리턴을 받기까지 대기를 하고 순차적으로 코드를 진행시키려 했지만 async 함수의 값을 리턴해도 undefined값이 넘어오는 이유도 모르겠다.  
또 await 함수를 사용했음에도 비동기식으로 코드가 작동한다.  
mdn Promise문서와 promise chain에 관련된 정보도 찾아봤지만 크게 와닿지는 않는다.  
문서를 좀더 공부해봐야할듯.. 구현방법은 정해졌지만 async await 함수에관련한 지식부족과 어떤값을 어디서 리턴해야하는지 머리속에 감이 잘 잡히지 않는다.

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
