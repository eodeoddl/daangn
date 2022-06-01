import { useState, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { MdAddAPhoto, MdClose } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import Portal from '../portal/portal';
import Cartegory from './cartegory';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;

  input[name='article title'] {
    width: 100%;
    height: 30px;
    appearance: none;
    border: none;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
    padding: 0.4em;
  }

  .cartegory {
    width: 40%;
    height: 30px;
    border: none;
    border-bottom: 2px solid #ccc;
    margin-right: 20%;
    margin-bottom: 20px;
    padding: 0.4em;
    background-color: transparent;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .price-label {
    width: 5%;
    font-size: 20px;
    color: #ccc;
  }

  input[name='price'] {
    width: 35%;
    height: 30px;
    border: none;
    appearance: none;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
    padding: 0.4em;
  }

  textarea {
    resize: none;
    width: 100%;
    min-height: 500px;
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
      min-width: 100px;
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

      ul {
        list-style-type: none;
        height: 100%;
        width: 100%;
        display: flex;

        li {
          position: relative;
          max-width: 100px;
          width: 100%;
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
  const [fileImg, setFileImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, dispatch] = useReducer(reducer, {});
  const priceLabel = useRef(null);

  // const focusLabel = () => {};
  // let reader = new FileReader();

  // 미리보기 이미지는 최소, 최대 넓이값 100px로 고정
  // const getImgTotalWidth = () => {
  //   if(fileImg.length) {

  //   }
  //   return null;
  // }

  const onPriceInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  };

  const validFileType = (file) => {
    return fileTypes.includes(file.type);
  };

  const updateImageDisplay = (e) => {
    console.log(e.target.value);
    const curFiles = e.target.files;

    if (curFiles.length === 0) {
      return;
    } else {
      const imgSrc = [];

      for (let file of curFiles) {
        if (validFileType(file)) {
          imgSrc.push(URL.createObjectURL(file));
        } else {
          console.log('wrong file type');
        }
      }

      setFileImg(imgSrc);
      e.target.value = '';
    }
  };

  const onDeleteFile = (index) => {
    const newFileImg = fileImg.slice();
    newFileImg.splice(index, 1);
    setFileImg([...newFileImg]);
  };

  const onInputCartegory = () => {
    setShowModal(true);
  };

  const onBlur = (e) => {
    if (e.target.value) priceLabel.current.style.color = '#000';
    else priceLabel.current.style.color = '#ccc';
  };

  const onFocus = () => {
    priceLabel.current.style.color = '#000';
  };

  return (
    <>
      <Form>
        <input type='text' name='article title' placeholder='제목' />
        <button
          type='button'
          className='cartegory'
          onClick={() => onInputCartegory()}
        >
          {formData.cartegory ? formData.cartegory : '카테고리를 선택하세요'}
          <IoIosArrowDown />
        </button>
        <label htmlFor='price' className={`price-label`} ref={priceLabel}>
          ￦
        </label>
        <input
          type='text'
          name='price'
          id='price'
          placeholder='가격을 적어주세요'
          onChange={onPriceInput}
          onBlur={(e) => onBlur(e)}
          onFocus={() => onFocus()}
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
            onChange={(e) => updateImageDisplay(e)}
          />
          <div className='preview-img-container'>
            {fileImg.length ? (
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
            ) : (
              <span>이미지를 선택하세요</span>
            )}
          </div>
        </div>
        <input type='text' name='hash tag' />
        <input type='submit' value='posting' />
      </Form>
      <Portal idSelector='posting-form-modal'>
        {showModal && (
          <Cartegory
            setShowModal={setShowModal}
            cartegory={cartegory}
            dispatch={dispatch}
          />
        )}
      </Portal>
    </>
  );
};

export default PostingForm;

const reducer = (state, action) => {
  switch (action.type) {
    case 'setCartegory':
      return { ...state, cartegory: cartegory[action.index] };
    default:
      throw new Error();
  }
};
