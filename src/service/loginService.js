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
        console.log(token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

  observeAuthState(setUserInfo, fireStore, setLoginState) {
    console.log('on auth state changed');
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log(user);
        const { displayName, email, photoURL, uid } = user;
        setUserInfo((prevState) => {
          return { ...prevState, displayName, email, photoURL, uid, fireStore };
        });
        setLoginState(true);
      } else {
        setLoginState(false);
        setUserInfo(null);
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
