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

    // imageURL.forEach((url) => {
    //   const getData = async () => {
    //     const data = await fetch(url, { method: 'GET' });
    //     console.log(data);
    //   };
    //   getData();
    //   const xhr = new XMLHttpRequest();
    //   xhr.responseType = 'blob';
    //   xhr.open('GET', url);
    //   xhr.send();
    //   console.log(xhr.response);
    //   return xhr;
    // });
    // console.log(promiseList);
    // });

    for (const { url, name, contentType } of imageURL) {
      const response = await fetch(url, { method: 'GET' });
      console.log(response);
      console.log(response.headers.values());
      const stream = await response.body.getReader().read();
      console.log('stream object', stream);
      // console.log('buffer.value ', buffer.value);
      res.push({ value: stream.value, name, contentType });
    }
    console.log('after', res);
    return res;
  }
}

export default FireStorage;
