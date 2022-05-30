import { useState, useReducer } from 'react';
import styled from 'styled-components';
import { MdAddAPhoto, MdClose } from 'react-icons/md';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;

  textarea {
    resize: none;
    width: 100%;
    min-height: 500px;
  }

  select {
    width: 20%;
  }

  input[name='article title'] {
    width: 80%;
  }

  input[name='hash tag'] {
  }

  input[type='submit'] {
  }

  .img-container {
    width: 100%;
    height: 140px;
    display: flex;
    padding: 20px 0;

    input[type='file'] {
      display: none;
    }

    label {
      position: relative;
      width: 100px;
      margin-right: 20px;

      span {
        position: absolute;
        left: 50%;
        bottom: 5%;
        font-size: 15px;
        font-weight: 500;
        transform: translateX(-50%);
      }
    }

    .MdAddAPhoto {
      width: 100%;
      height: 100%;
      border: 1px solid black;
      border-radius: 4px;
      padding: 5px 5px 15px 5px;
      cursor: pointer;
    }

    .preview-img-container {
      width: 90%;
      display: flex;
      align-items: center;

      ul {
        list-style-type: none;
        height: 100%;

        li {
          display: inline-block;
          position: relative;
          width: 100px;
          height: 100%;
          margin-right: 15px;

          img {
            width: 100%;
            height: 100%;
          }

          .thumbnail {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 30%;
            width: 100%;
            font-size: 15px;
            font-weight: 700;
            background-color: #000;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .delete-btn {
            width: 20px;
            height: 20px;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
            appearance: none;
            background-color: #000;
            border-radius: 50%;
            // opacity: 100;
          }

          .close-img {
            width: 100%;
            height: 100%;
            color: #fff;
            border: none;
          }
        }
      }

      li:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
`;

const cartegory = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '유아물품',
  '생활/가공식품',
  '스포츠/레저',
  '여성잡화/의류',
  '남성잡화/의류',
  '게임/취미',
  '뷰티/미용',
  '반려동물용품',
  '도서/티켓/음반',
  '식물',
  '기타 중고물품',
  '삽니다',
];

const fileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];

const PostingForm = () => {
  const [fileList, setFileList] = useState([]);
  const [fileImg, setFileImg] = useState([]);
  const [fileList1, dispatch] = useReducer(reducer, []);

  const onPriceInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  };

  const validFileType = (file) => {
    return fileTypes.includes(file.type);
  };

  const updateImageDisplay = (e) => {
    const curFiles = e.target.files;

    if (curFiles.length === 0) {
      return;
    } else {
      const fileArray = [];
      const imgSrc = [];

      for (let file of curFiles) {
        if (validFileType(file)) {
          imgSrc.push(URL.createObjectURL(file));
          fileArray.push(file);
        } else {
          console.log('wrong file type');
        }
      }

      setFileImg(imgSrc);
      setFileList(fileArray);
    }
  };

  const onLoadFile = (e) => {
    updateImageDisplay(e);
  };

  const onDeleteFile = (index) => {
    const newFileImg = fileImg.slice();
    newFileImg.splice(index, 1);
    setFileImg([...newFileImg]);
  };

  return (
    <Form>
      <input type='text' name='article title' />
      <input
        type='text'
        name='price'
        placeholder='가격을 적어주세요'
        onChange={onPriceInput}
      />
      <textarea name='description' type='text' />
      <div className='img-container'>
        <label htmlFor='image_uploads'>
          <MdAddAPhoto className='MdAddAPhoto' />
          <span>{fileImg.length}/10</span>
        </label>
        <input
          id='image_uploads'
          type='file'
          multiple
          accept='image/*'
          name='file upload'
          onChange={onLoadFile}
        />
        <div className='preview-img-container'>
          {!fileImg.length && <span>이미지를 선택하세요</span>}
          {fileImg.length && (
            <ul>
              {fileImg.map((url, i) => {
                const element =
                  i === 0 ? <p className='thumbnail'>대표사진</p> : null;
                return (
                  <li key={`img Index${i}`}>
                    <img alt={`img Index${i}`} src={url} />
                    {element}
                    <button
                      type='button'
                      className='delete-btn'
                      onClick={() => onDeleteFile(i)}
                    >
                      <MdClose className='close-img' />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <input type='text' name='hash tag' />
      <input type='submit' value='posting' />
    </Form>
  );
};

export default PostingForm;

const reducer = (fileList1, dispatch) => {};
