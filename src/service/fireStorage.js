import { firebaseStorage } from './firebase.js';
import { ref, uploadBytes } from 'firebase/storage';

class FireStorage {
  async uploadFile(path, file) {
    const imgStorage = ref(firebaseStorage, `${path}/${file.name}`);

    await uploadBytes(imgStorage, file).then((snapshot) => {
      console.log('uploaded snapshot', snapshot);
      console.log('ref', snapshot.ref);
    });
    // return articleStorage.fullPath;
  }

  getFileFromRef(ref) {}
}

export default FireStorage;
