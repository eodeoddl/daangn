import { firebaseStorage } from './firebase.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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

  getFileFromRef(ref) {}
}

export default FireStorage;
