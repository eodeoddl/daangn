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
    return await getDoc(docRef);
  }
  // arguments condition is serverTimeStamp, region, searchTerm
  async getOrderedSearchTerm(searchTerm, region) {
    const response = [];
    const collectionRef = collection(firebaseStore, 'article');

    return response;
  }
}

export default FireStore;
