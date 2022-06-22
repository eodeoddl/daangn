import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { firebaseAuth } from './firebase.js';

class LoginService {
  login(providerName) {
    const provider = this.getProvider(providerName);
    signInWithPopup(firebaseAuth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  observeAuthState(dispatch, setLoginState, kakaoMapAPI, fireStore) {
    const boundedAddressAPI = kakaoMapAPI.getAddress.bind(kakaoMapAPI);
    const addressData = {};

    const success = async (position) => {
      const address = await boundedAddressAPI(
        position.coords.longitude,
        position.coords.latitude
      );
      const [region_B, region_H] = address.documents;
      addressData.region_B = region_B;
      addressData.region_H = region_H;
    };

    const error = () => {
      console.log('not surpported on your device');
    };

    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(success, error);
    // } else {
    //   console.log('error');
    // }

    // 이곳에서 uid가 기존에 존재하는 uid인지 파악하고 신규 유저라면 users collection에 정보를 저장하는 작업도 수행한다.
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && 'geolocation' in navigator) {
        const { uid, displayName, photoURL } = user;
        navigator.geolocation.getCurrentPosition(success, error);
        dispatch({
          type: 'setUserInfo',
          userInfo: { uid, displayName, photoURL },
        });
        fireStore.setUserData1({
          uid,
          displayName,
          photoURL,
          address: addressData,
        });
        setLoginState(true);
      } else {
        // geolocation 객체를 사용할 수 없거나 user정보가없을경우
        dispatch({ type: 'reset' });
        setLoginState(false);
      }
    });
  }

  logOut() {
    return signOut(firebaseAuth);
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'google':
        return new GoogleAuthProvider();
      // return null;
      case 'github':
        // return new firebaseAppInstance.auth.GithubAuthProvider();
        return null;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default LoginService;
