import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  form {
    width: 40%;
    position: relative;
    border: 0.5px solid #fff;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
  }

  input[type='text'],
  input[type='password'],
  input[type='submit'],
  input[type='button'],
  button {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
  }

  button {
    border: none;
    outline: none;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }

  input[type='text'],
  input[type='password'] {
    outline: none;
    border: none;
    border-bottom: 2px solid #a6af13;
  }

  input[type='text']:focus,
  input[type='password']:focus {
    border-bottom: 2px solid #262626;
  }

  input[type='submit'] {
    border: none;
    outline: none;
    color: #262626;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
  }

  label {
    font-weight: 700;
    font-size: 16px;
    color: #262626;
  }

  .img-container {
    text-align: center;
  }

  .img-container img {
    width: 250px;
    border-radius: 50%;
    border: 1px solid black;
  }

  .other-login-button {
    button {
      margin-right: 10px;
    }
  }

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
  }

  .close-button:hover {
    cursor: pointer;
  }

  .close-button:before,
  .close-button:after {
    position: absolute;
    left: 50%;
    content: '';
    height: 100%;
    width: 2px;
    background-color: #ccc;
  }

  .close-button:before {
    transform: rotate(45deg);
  }

  .close-button:after {
    transform: rotate(-45deg);
  }
`;

const LoginForm = ({ loginService, handleShowModal }) => {
  console.log('loginService', loginService);

  const onClick = () => {
    handleShowModal();
  };

  const onLogin = (e) => {
    console.log(e.currentTarget.name);
    // console.log(loginService.getProviderName(e.currentTarget.name));
    loginService.login(e.currentTarget.name);
    // loginService.observeAuthState(handleShowModal);
    handleShowModal();
  };

  return (
    <Container>
      <form>
        {/* <div className='img-container'>
          <img alt='user-profile-img' src='/logo512.png' />
        </div> */}
        <div className='container'>
          <label htmlFor='userName'>UserName</label>
          <input
            name='userId'
            id='userName'
            type='text'
            placeholder='input your id'
          />
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            id='password'
            type='password'
            placeholder='password'
          />
          <input type='submit' className='login-button' value='Sign In' />
          <button type='button' name='google' onClick={onLogin}>
            Sign with Google
          </button>
        </div>
        {/* <div className='others'>
          <div className='other-login-button'>
            <button type='button' name='google' onClick={onLogin}>
              sign with google
            </button>
            <button type='button' name='github' onClick={onLogin}>
              sign with github
            </button>
          </div>
          <div className='sign-up'>
            <button>회원가입하기</button>
          </div>
        </div> */}
        <div className='close-button' onClick={onClick}></div>
      </form>
    </Container>
  );
};

export default LoginForm;
