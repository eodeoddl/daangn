import { firebaseStorage } from './firebase.js';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

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
    // console.log(fileImage.items);
    fileImage.items.forEach((itemRef) => {
      console.log(itemRef);
    });
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
