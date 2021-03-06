import { firebaseStorage } from './firebase.js';
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  getMetadata,
} from 'firebase/storage';

class FireStorage {
  async uploadFile(articleRef, path, file) {
    console.log(file.name);
    console.log(file);
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
    const res = [];

    console.log(fileImage.items);

    for (const fileRef of fileImage.items) {
      const url = await getDownloadURL(fileRef);
      const metadata = await getMetadata(fileRef);
      console.log(metadata);
      imageURL.push({
        url,
        name: metadata.name,
        contentType: metadata.contentType,
        type: metadata.type,
      });
    }

    console.log(imageURL);

    for (const { url, name, contentType } of imageURL) {
      const response = await fetch(url, { method: 'GET' });
      const blob = await response.blob();
      res.push(blob);
    }

    return res;
  }
}

export default FireStorage;
