import { firebaseStorage } from './firebase.js';
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  getMetadata,
} from 'firebase/storage';
import { PureComponent } from 'react';

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

    // for (const { url, name, contentType } of imageURL) {
    //   const response = await fetch(url, { method: 'GET' });
    //   console.log(response);
    //   console.log(response.headers.values());
    //   const buffer = await response.body.getReader().read();
    //   console.log('stream object', buffer instanceof Blob); // false
    //   console.log('array buffer ', buffer.value);
    //   res.push({ typedArray: buffer.value, name, contentType });
    // }
    // console.log('after', res);

    // for (const { url } of imageURL) {
    //   const response = await fetch(url, { method: 'GET' });
    //   console.log(response);
    //   const reader = response.body.getReader();
    //   console.log(reader);

    //   const getStream = async () => {
    //     return await new ReadableStream({
    //       start(controller) {
    //         const pump = async () => {
    //           const { done, value } = await reader.read();
    //           console.log(value);
    //           if (done) {
    //             controller.close();
    //             return;
    //           }
    //           controller.enqueque(value);
    //         };
    //         return pump();
    //       },
    //     });
    //   };

    //   const stream = getStream();
    //   console.log(stream);
    //   const newRes = await new Response(stream);
    //   console.log(newRes);
    //   const blob = await newRes.blob();
    //   console.log(blob);
    //   const url1 = await URL.createObjectURL(blob);
    //   console.log('finally response url ', url1);
    // }

    for (const { url } of imageURL) {
      fetch(url)
        .then((response) => {
          const reader = response.body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                // 스트림의 다음 Chunk에 대한 액세스를 제공하는 psomise를 리턴한다.
                return reader.read().then(({ done, value }) => {
                  // 더이상 읽을 데이터 조각이 없을때 스트림을 닫는다
                  if (done) {
                    controller.close();
                    return;
                  }
                  // 데이터 조각을 새로운 스트림(새로 만드는 커스텀 스트림)에 넣는다.
                  controller.enqueue(value);
                  return pump();
                });
              }
            },
          });
        })
        .then((stream) => new Response(stream))
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => res.push(url))
        .catch((err) => console.error(err));
    }
    console.log('after ', res);
    return res;
  }
}

export default FireStorage;
