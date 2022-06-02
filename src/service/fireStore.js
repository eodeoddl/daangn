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

  // this api is just for test
  async setInitArticle() {
    const articleRef = collection(firebaseStore, 'articles');

    await addDoc(articleRef, {
      title: `판매`,
      uid: '7AJFZSRZ0hhz7zBq6LhBO4u9QJf2',
      displayName: '리에이미',
      price: 1000,
      description:
        '미사용 새상품인데 배송상 이음새부분 눌려진 자국있어요\n지인아들 선물용이였는데 방치중입니다\n직접오셔야돼요',
      uploaded: serverTimestamp(),
    });
  }

  async setArticle(data) {
    const articleRef = collection(firebaseStore, 'article');
    console.log(articleRef);
    await addDoc(articleRef, {
      ...data,
      uploaded: serverTimestamp(),
    });
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
}

export default FireStore;
