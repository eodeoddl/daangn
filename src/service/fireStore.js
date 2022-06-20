import { firebaseStore } from './firebase.js';
import {
  collection,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  orderBy,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

class FireStore {
  async setUserData(userData) {
    console.log(userData);
    try {
      const userRef = doc(firebaseStore, 'users', userData.uid);
      await setDoc(
        userRef,
        {
          address: userData.address,
          displayName: userData.displayName,
          email: userData.email,
          photoURL: userData.photoURL,
          uid: userData.uid,
          history: {
            판매물품: {},
            거래후기: {
              아이디1: { comments: '좋아여' },
              아이디2: { comments: '좋아여' },
              아이디3: { comments: '좋아여' },
              아이디4: { comments: '좋아여' },
              아이디5: { comments: '좋아여' },
              아이디6: { comments: '좋아여' },
              아이디7: { comments: '좋아여' },
            },
            매너칭찬: {
              '시간을 잘지켜요': { count: 0 },
              '친절하고 매너가 좋아요': { count: 10 },
              '응답이 빨라요': { count: 9 },
              '상품상태가 설명한것과 같아요': { count: 11 },
              '좋은 상품을 저렴하게 판매해요': { count: 6 },
            },
          },
        },
        { merge: true }
      );
    } catch (e) {
      console.log(e);
    }
  }

  // get all user article
  async getUserArticle(uid, setArticle) {
    const collectionRef = collection(firebaseStore, 'users', uid, 'articles');
    console.log(collectionRef);
    const querySnapshot = await getDocs(collectionRef);
    const dataArr = [];
    querySnapshot.forEach((article) => {
      dataArr.push({ id: article.id, data: article.data() });
    });
    setArticle(dataArr);
  }

  async getUserHistory(userId) {
    console.log(userId);
    const docRef = doc(firebaseStore, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().history;
    } else {
      console.log('no data');
    }
  }

  // make user > artilce collection & getCollection by document id
  async setUserArticle(uid) {
    console.log(uid);
    // query
    const articleRef = collection(firebaseStore, 'articles');
    const q = query(articleRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((article) => {
      const userArticleRef = doc(
        firebaseStore,
        'users',
        uid,
        'articles',
        article.id
      );
      setDoc(userArticleRef, article.data(), { merge: true });
    });
  }

  // data arg comes from postingForm.jsx
  async setArticle(data) {
    const collectionRef = collection(firebaseStore, 'article');
    const docRef = await addDoc(collectionRef, {
      ...data,
      uploaded: serverTimestamp(),
    });
    return docRef.id;
  }

  async updateImageUrl(articleId, url) {
    const docRef = doc(firebaseStore, 'article', articleId);
    await setDoc(docRef, { image: url }, { merge: true });
    updateDoc(docRef, { workProgress: true });
  }

  // 포스팅한 article 한개가져오기 유저가 검색하고 검색결과중 한개의 article 경로를 요청한 경우 or
  // 특정 사용자의 profile에서 사용자의 모든 article 중에 한가지의 경로를 요청했을때
  // return 값은 docsnapshot 이고 snapshot.exist() 메서드로 검색여부가 존재하는지 알 수 있음(true or false)
  async getArticleById(articleId) {
    // const collectionRef = collection(firebaseStore, 'article')
    const docRef = doc(firebaseStore, 'article', articleId);
    const article = await getDoc(docRef);
    return article.data();
  }
  // arguments condition is serverTimeStamp, region, searchTerm
  async getOrderedArticle(searchTerm) {
    const articles = [];
    const collectionRef = collection(firebaseStore, 'article');

    const timeStampQuery = query(
      collectionRef,
      where('workProgress', '==', true),
      orderBy('uploaded')
    );
    const querySnapshot = await getDocs(timeStampQuery);

    // 여기서는 쿼리필터링된 값을 배열로 만들어서 리턴함.
    querySnapshot.forEach((snapshot) => {
      articles.push({
        articleId: snapshot.id,
        ...snapshot.data(),
      });
    });

    const sortByTermRepeat = (propertyName, searchTerm, array) => {
      const regExp = new RegExp(`${searchTerm}`, 'g');

      return array
        .reduce((acc, curr, index) => {
          if (curr[propertyName].includes(searchTerm)) {
            return acc.concat({
              index,
              termRepeat: curr[propertyName].match(regExp).length,
            });
          }
          return acc;
        }, [])
        .sort((a, b) => b.termRepeat - a.termRepeat);
    };
    // title, description 소트를 두번한다. 그리고 결과값을 concat으로 이어붙인다.
    // 그후에 index가 곂칠경우 뒤에 위치한 인덱스를 누적하지 않는다.
    const sortedTitle = sortByTermRepeat('title', searchTerm, articles);
    const sortedDescription = sortByTermRepeat(
      'description',
      searchTerm,
      articles
    );
    const sortedArticle = sortedTitle.concat(sortedDescription);

    const removedSameArticle = sortedArticle.reduce((acc, curr) => {
      if (acc.length === 0 || acc[acc.length - 1].index !== curr.index) {
        acc.push(curr);
      }
      return acc;
    }, []);

    const sortedByTerm = removedSameArticle.map((el) => articles[el.index]);

    // 1차필터링한 값을 다시 다른 조건으로 필터링 api없이 직접구현
    // 검색하고자하는 단어의 반복이 많을 수록 우선순위가 된다.
    // 지역 정보는 총 4depth까지 나뉘어져있음.
    // 나와 가까운 지역일수록 depth name의 숫자가 커짐.
    // 일치하는 depthCount를 측정하고 depthCount가 높을수록 상위 인덱스

    return sortedByTerm;
  }
  // 유저가 구독버튼을 눌렀을때 user > subcribeList 업데이트
  // 유저가 로그인을 하지않았을경우는 실행할 수 없음.
  async addSubscribeList(uid, articleId, state) {
    const articleRef = doc(firebaseStore, 'article', articleId);

    // state가 true 값이 넘어왔을때만 업데이트 실행하고 만약 false 값이 넘어온다면 해당 구독정보를 삭제한다.
    const userRef = doc(firebaseStore, 'users', uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      state
        ? await updateDoc(userRef, {
            subscribeList: arrayUnion(articleRef.path),
          })
        : await updateDoc(userRef, {
            subscribeList: arrayRemove(articleRef.path),
          });
    }
  }
}

export default FireStore;
