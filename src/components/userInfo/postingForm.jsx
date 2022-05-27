import { useState } from 'react';
import styled from 'styled-components';

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

  input[name='file upload'] {
  }

  input[name='hash tag'] {
  }

  input[type='submit'] {
  }
`;

const PostingForm = () => {
  const [fileList, setFileList] = useState(null);
  const onInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    // .replace(/(\..*)\./g, '$1');
  };

  const onLoadFile = (e) => {
    console.log(e.target.files);
    setFileList(e.target.files);
  };

  return (
    <Form>
      <select>
        <option value='flea market'>중고거래</option>
        <option value='region news'>동네소식</option>
      </select>
      <input type='text' name='article title' />
      <input
        type='text'
        name='price'
        placeholder='가격을 적어주세요'
        onChange={onInput}
      />
      <textarea name='description' type='text' cols='100%' rows='100%' />
      <input
        type='file'
        multiple
        accept='image/*'
        name='file upload'
        onChange={onLoadFile}
      />
      <div className='img-container'></div>
      <input type='text' name='hash tag' />
      <input type='submit' value='posting' />
    </Form>
  );
};

export default PostingForm;
