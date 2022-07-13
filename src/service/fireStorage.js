import { firebaseStorage } from './firebase.js';
import {
  getBlob,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';

class FireStorage {
  async uploadFile(articleRef, path, file) {
    const storageRef = ref(
      firebaseStorage,
      `${articleRef}/${path}/${file.name}`
    );
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    return url;
  }

  async getFileList(articleId) {
    const storageRef = ref(firebaseStorage, `${articleId}/image`);
    const fileImage = await listAll(storageRef);
    const imageURL = [];

    console.log(fileImage.items);

    for (const fileRef of fileImage.items) {
      const url = await getDownloadURL(fileRef);
      imageURL.push(url);
    }
    console.log(imageURL);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';

    imageURL.forEach((url) => {
      xhr.open('GET', url);
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.send();
    });

    xhr.onload = (event) => {
      const blob = xhr.response;
      console.log(blob);
    };
    // console.log(blob);

    // fileImage.items.forEach((itemRef) => {
    //   const url = await getDownloadURL(itemRef);
    //   console.log(url);
    // });

    // fileImage.prefixes.forEach((item) => {
    //   console.log(typeof item);
    // });
  }

  // async upload(articleRef, path, file) {
  //   const storageRef = ref(
  //     firebaseStorage,
  //     `${articleRef}/${path}/${file.name}`
  //   );
  //   const snapshot = await uploadBytes(storageRef, file);
  //   return snapshot.ref;
  // }

  // getFileFromUrl(url) {

  // }
}

export default FireStorage;
