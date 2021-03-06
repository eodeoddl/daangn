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
  limit,
  startAfter,
  onSnapshot,
} from 'firebase/firestore';

class FireStore {
  constructor() {
    this.searhTermQueryCursor = null;
    this.resentQueryCursor = null;
    this.documentCount = 0;
  }

  // 기존에 존재하는 유저인지 검사후 신규일경우에만 업데이트
  async setUserData(userData) {
    const userRef = doc(firebaseStore, 'users', userData.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log('이미존재하는 유저입니다.');

      // 유저가 올린 게시물 업데이트
      const articleCollection = collection(firebaseStore, 'article');
      const q = query(articleCollection, where('uid', '==', userData.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        updateDoc(userRef, {
          userArticles: arrayUnion(doc.ref.path),
        });
      });

      // 유저의 comments collection 업데이트
      // const collectionRef = collection(userRef, 'comments');
      // const q2 = query()

      // await addDoc(collectionRef, {
      //   timeStamp: null,
      //   articleId: null,
      //   commnet: null,
      //   uid: null,
      // });
    } else {
      console.log('존재하지않는 유저입니다.');

      await setDoc(userRef, {
        address: userData.address,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        uid: userData.uid,
        manner: {
          '시간을 잘지켜요': { count: 0 },
          '친절하고 매너가 좋아요': { count: 0 },
          '응답이 빨라요': { count: 0 },
          '상품상태가 설명한것과 같아요': { count: 0 },
          '좋은 상품을 저렴하게 판매해요': { count: 0 },
        },
      });
    }
  }

  async getUserInfo(uid) {
    const userRef = doc(firebaseStore, 'users', uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  }

  async readRefs(path) {
    const articleRef = doc(firebaseStore, path);
    const docSnap = await getDoc(articleRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    }
  }

  // make user > artilce collection & getCollection by document id in components/details article.jsx
  async setUserArticle(uid) {
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

  // observe userInfo for update
  async observeUserInfo(uid, dispatch) {
    const userRef = doc(firebaseStore, 'users', uid);

    onSnapshot(userRef, (doc) => {
      const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
      console.log(source, ' data  => ', doc.data());
      console.log('doc data article size ', doc.data().userArticles.length);
      console.log('subscibe list size ', doc.data().subscribeList.length);
      dispatch({ type: 'updateInfo', userData: { ...doc.data() } });
    });
  }

  // data arg comes from postingForm.jsx
  async setArticle(data, uid, articleId) {
    const userRef = doc(firebaseStore, 'users', uid);
    const collectionRef = collection(firebaseStore, 'article');
    let docRef;

    if (articleId) {
      docRef = doc(collectionRef, articleId);
      updateDoc(docRef, {
        ...data,
        uploaded: serverTimestamp(),
      });
    } else {
      docRef = await addDoc(collectionRef, {
        ...data,
        uploaded: serverTimestamp(),
      });
    }
    // 여기서 유저 document도 업데이트
    updateDoc(userRef, {
      userArticles: arrayUnion(docRef.path),
    });

    return docRef.id;
  }

  // async udateArticle(articleId, data) {
  //   const articleRef = doc(firebaseStore, 'articles', articleId);
  //   if (articleRef.exists()) {
  //     updateDoc(articleRef, {
  //       ...data,
  //       uploaded: serverTimestamp(),
  //     });
  //   }
  // }

  //
  async updateImageUrl(articleId, url) {
    console.log('updateImageURL function ', url);
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

  async getOrderedBySearchTerm(searchTerm, limitCount) {
    console.log('call fetching function');
    const collectionRef = collection(firebaseStore, 'article');
    const result = [];
    const collectionSnapshot = await getDocs(collectionRef);

    checkResult: while (result.length < limitCount) {
      const q = this.searhTermQueryCursor
        ? query(
            collectionRef,
            where('workProgress', '==', true),
            orderBy('uploaded', 'desc'),
            startAfter(this.searhTermQueryCursor),
            limit(limitCount)
          )
        : query(
            collectionRef,
            where('workProgress', '==', true),
            orderBy('uploaded', 'desc'),
            limit(limitCount)
          );
      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
        const { title, description } = doc.data();
        this.documentCount++;

        // query된 doc에서 조건에 맞춰서 결과 data에 push
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          result.push({
            articleId: doc.id,
            ...doc.data(),
          });
        }

        // 가져오고자 하는 data의 숫자만큼 검색이 완료되었을때 while loop종료하고 결과리턴
        if (result.length === limitCount) {
          this.searhTermQueryCursor = doc;
          break checkResult;
        }

        // querySnap의 마지막 루프가 끝날때 다음 while 문 loop의 query startAfter인자 값을 querySnap의 마지막 doc으로 설정.
        if (querySnapshot.docs[querySnapshot.docs.length - 1].id === doc.id) {
          this.searhTermQueryCursor = doc;
        }
      }

      // article collection의 모든 doc을 검색했지만 limit count 이상의 문서를 발견하지 못했을땐 while문을 종료하고 검색된 값들만 리턴
      if (this.documentCount >= collectionSnapshot.size) break;
    }

    return result;
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

  // 스타트 커서 인자는 이전 검색했던 문서의 snapshot이다.
  async getLatestArticle(limitCount) {
    let result = [];
    const articleRef = collection(firebaseStore, 'article');
    const q = this.resentQueryCursor
      ? query(
          articleRef,
          orderBy('uploaded', 'desc'),
          startAfter(this.resentQueryCursor),
          limit(limitCount)
        )
      : query(articleRef, orderBy('uploaded', 'desc'), limit(limitCount));

    const querySnapshot = await getDocs(q);
    // console.log('queryCursor ', querySnapshot.docs[limitCount - 1]);
    this.resentQueryCursor = querySnapshot.docs[limitCount - 1];
    console.log('get latestArticle cursor', this.resentQueryCursor);

    querySnapshot.forEach((snapshot) => {
      result.push({ id: snapshot.id, ...snapshot.data() });
    });

    return result;
  }

  initializeCursor(type) {
    switch (type) {
      case 'searchTerm':
        this.searhTermQueryCursor = null;
        break;
      case 'resent':
        this.resentQueryCursor = null;
        break;
      default:
        console.log('select a type');
    }
    console.log('call initialize queryCursor ', this.queryCursor);
  }

  initializeDocCount() {
    console.log(' call initialize Count ');
    this.documentCount = 0;
  }
}

export default FireStore;
