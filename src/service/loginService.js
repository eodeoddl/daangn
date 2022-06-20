import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { MdTurnedInNot } from 'react-icons/md';

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

  observeAuthState() {
    const userInfo = {};
    onAuthStateChanged(firebaseAuth, (user) => {
      // console.log(user.providerData);
      // const { displayName, email, photoURL, uid } = user;
      if (user) {
        console.log('userExist');
        user.providerData.forEach((profile) => {
          const { displayName, email, photoURL, uid } = profile;
          userInfo.displayName = displayName;
          userInfo.email = email;
          userInfo.photoURL = photoURL;
          userInfo.uid = uid;
          userInfo.fetching = true;
        });
      } else {
        console.log('no userExist');
        userInfo.fetching = false;
      }
    });
    return userInfo;
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
