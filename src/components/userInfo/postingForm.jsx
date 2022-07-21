import { useState, useReducer, useRef, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MdAddAPhoto, MdClose } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import Portal from '../portal/portal';
import Cartegory from './cartegory';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;

  input[name='title'] {
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
    font-size: 17px;
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
    height: 500px;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 10px;
  }

  input[name='hash tag'] {
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

  button[type='submit'],
  button[type='reset'] {
    font-size: 16px;
    font-weight: 700;
    padding: 5px;
    border-radius: 2px;
    apearance: none;
  }

  button[type='reset'] {
    margin-right: 10px;
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

const PostingForm = ({
  userInfo,
  fireStorage,
  fireStore,
  action,
  className,
}) => {
  const [fileImg, setFileImg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, dispatch] = useReducer(reducer, userInfo, init);
  const history = useHistory();
  const priceLabel = useRef(null);
  const fileInputRef = useRef(null);
  const { articleId } = useParams();

  console.log('history ', history);
  console.log('params.articleId ', articleId);

  useEffect(() => {
    console.log('action  ', action);
    if (!(action === 'edit')) return;

    console.log(history.location.state);
    const fetchData = async () => {
      const data = await fireStore.getArticleById(articleId);
      return data;
    };

    const getFile = async () => {
      const responseArr = await fireStorage.getFileList(articleId);
      console.log(responseArr);
      // const arr = [];
      // for (const data of responseArr) {
      //   // const reader = new FileReader();
      //   // console.log(data.typedArray.buffer)
      //   const blob = new Blob(data.typedArray, {
      //     type: data.contentType,
      //   });
      //   console.log(blob);
      //   const url = URL.createObjectURL(blob);
      //   arr.push(url);
      // reader.onload = (e) => {
      //   const dataURL = e.target.result;
      //   console.log(dataURL);
      //   arr.push(dataURL);
      // };
      // reader.readAsDataURL(blob);
      // }
      // responseArr.forEach((data) => {
      //   const reader = new FileReader();
      //   const blob = new Blob(data.typedArray, { type: data.contentType });
      //   reader.onload = (e) => {
      //     console.log(e.target.result);
      //     arr.push(e.target.result);
      //   };
      //   reader.readAsDataURL(blob);
      // });
      console.log('useEffect setFile');
      setFileImg(responseArr);
    };

    const { cartegory, description, price, title } =
      history.location.state || fetchData();
    // setFileImg(image);

    dispatch({
      type: 'editForm',
      data: { cartegory, description, price, title },
    });
    getFile();
  }, [history.location.state, fireStore, articleId, fireStorage, action]);

  const onPriceInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
  };

  const validFileType = (file) => {
    return fileTypes.includes(file.type);
  };

  const makeStoragePath = (file) => {
    // 문자열 메서드 substring or split or slice 사용가능
    // const endIdx = file.name.indexOf('/');
    return file.type.split('/')[0];
  };

  const updateImageDisplay = (e) => {
    const { files } = e.target;
    const reader = new FileReader();

    if (files.length === 0) {
      return;
    } else {
      const imgSrc = [];

      for (let file of files) {
        if (validFileType(file)) {
          imgSrc.push(URL.createObjectURL(file));
        } else {
          console.log('wrong file type');
        }
      }

      setFileImg((prevState) => [...prevState, ...imgSrc]);
    }
  };

  const onDeleteImg = (index) => {
    const newFileImg = fileImg.slice();
    newFileImg.splice(index, 1);
    setFileImg([...newFileImg]);
  };

  const onDeleteFile = (index) => {
    const { files } = fileInputRef.current;
    const dataTransfer = new DataTransfer();

    Array.from(files)
      .filter((file) => file !== files[index])
      .forEach((file) => dataTransfer.items.add(file));

    fileInputRef.current.files = dataTransfer.files;
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

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('submit action ', action, articleId);
    const { files } = fileInputRef.current;
    console.log('files ', files);
    const urlArr = [];

    alert('게시글이 등록되었습니다.');
    history.push('/');

    // this api return articleId asynchronously
    const docId = await fireStore.setArticle(formData, userInfo.uid, articleId);

    // uploadFile api needs arguments & run asynchronously & return file download url
    for (const file of files) {
      const url = await fireStorage.uploadFile(
        docId,
        makeStoragePath(file),
        file
      );

      urlArr.push(url);
    }
    fireStore.updateImageUrl(docId, urlArr);
  };

  const onChangeValue = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'setFormData', name, value });
  }, []);

  return (
    <>
      <Form onSubmit={(e) => onSubmit(e)} className={className}>
        <input
          type='text'
          name='title'
          placeholder='제목'
          onChange={(e) => onChangeValue(e)}
          defaultValue={formData.title || null}
        />
        <button
          type='button'
          className='cartegory'
          onClick={() => onInputCartegory()}
        >
          {formData.cartegory || '카테고리를 선택하세요'}
          <IoIosArrowDown />
        </button>
        <label htmlFor='price' className='price-label' ref={priceLabel}>
          ￦
        </label>
        <input
          type='text'
          name='price'
          id='price'
          placeholder='가격을 적어주세요'
          onChange={(e) => {
            onPriceInput(e);
            onChangeValue(e);
          }}
          onBlur={(e) => onBlur(e)}
          onFocus={() => onFocus()}
          defaultValue={formData.price || null}
        />
        <textarea
          name='description'
          type='text'
          placeholder='텍스트를 입력하세요'
          onChange={(e) => onChangeValue(e)}
          defaultValue={formData.description || null}
        />
        <div className='img-container'>
          <label htmlFor='image_uploads'>
            <MdAddAPhoto className='MdAddAPhoto' />
            <span>{fileImg.length || 0}/10</span>
          </label>
          <input
            id='image_uploads'
            type='file'
            multiple
            accept='image/*'
            name='files'
            onChange={(e) => {
              updateImageDisplay(e);
            }}
            ref={fileInputRef}
          />
          <div className='preview-img-container'>
            {
              // fileImg = editFormData ? editFormData.image : fileImg
              fileImg.length ? (
                <ul>
                  {fileImg.map((url, i) => {
                    console.log('img src ', url);
                    return (
                      <li key={`img Index${i}`}>
                        <img alt={`img Index${i}`} src={url} />
                        {i === 0 ? <p className='thumbnail'>대표사진</p> : null}
                        <button
                          type='button'
                          className='delete-btn'
                          onClick={() => {
                            onDeleteImg(i);
                            onDeleteFile(i);
                          }}
                        >
                          <MdClose className='close-img' />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <span className=''>이미지를 선택하세요</span>
              )
            }
          </div>
        </div>
        {/* <input type='text' name='hash tag' /> */}
        <div className='btn-container'>
          <button
            type='reset'
            onClick={() => {
              dispatch({ type: 'reset' });
              setFileImg([]);
            }}
          >
            취소
          </button>
          <button type='submit'>글쓰기</button>
        </div>
      </Form>
      {showModal && (
        <Portal idSelector='posting-form-modal'>
          <Cartegory
            setShowModal={setShowModal}
            cartegory={cartegory}
            dispatch={dispatch}
          />
        </Portal>
      )}
    </>
  );
};

export default PostingForm;

const reducer = (state, action) => {
  switch (action.type) {
    case 'setCartegory':
      return { ...state, cartegory: cartegory[action.index] };
    case 'setFormData':
      return { ...state, [action.name]: action.value };
    case 'deleteFile':
      const files = state.files.slice();
      files.splice(action.index, 1);
      return { ...state, files: [...files] };
    case 'reset':
      const { uid, region_B } = state;
      return { uid, region_B };
    case 'editForm':
      console.log('state ', state);
      console.log('data ', action.data);
      return { ...state, ...action.data };
    default:
      throw new Error();
  }
};

const init = (userInfo) => {
  // console.log('useInfo  => ', userInfo, 'editData => ', editData);
  const { uid, displayName, photoURL } = userInfo;
  const region_B = userInfo.address.region_B;
  return {
    uid,
    region_B,
    displayName,
    profileImg: photoURL,
    workProgress: false,
    subscribe: 0,
    comments: null,
  };
};
