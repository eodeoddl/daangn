import { firebaseStorage } from './firebase.js';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

class FireStorage {
  // uploadFile(articleRef, path, file) {
  //   const storageRef = ref(
  //     firebaseStorage,
  //     `${articleRef}/${path}/${file.name}`
  //   );

  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   const onStateChanged = (snapshot) => {
  //     // console.log(' state changed');
  //     console.log(snapshot);
  //     switch (snapshot.state) {
  //       case 'paused':
  //         console.log('Upload is paused');
  //         break;
  //       case 'running':
  //         console.log('Upload is running');
  //         break;
  //       default:
  //         console.log('default');
  //     }
  //   };

  //   const onError = () => {
  //     console.log('error');
  //   };

  //   const success = () => {
  //     console.log('success ');
  //     return 'text';
  //     // await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //     //   console.log(downloadURL);
  //     // });
  //   };

  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => onStateChanged(snapshot),
  //     onError,
  //     success
  //   );

  //   // return 'dd';
  // }

  async uploadFile(articleRef, path, file) {
    const storageRef = ref(
      firebaseStorage,
      `${articleRef}/${path}/${file.name}`
    );
    await uploadBytes(storageRef, file);
    return storageRef;
  }

  async getImgURL(storageRef) {
    getDownloadURL(storageRef).then((url) => console.log(url));
    // return
  }

  getFileFromRef(ref) {}
}

export default FireStorage;
