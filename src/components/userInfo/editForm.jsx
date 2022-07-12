import React from 'react';
import styled from 'styled-components';
import PostingForm from './postingForm';

const Form = styled(PostingForm)`
  width: 677px;
  height: 100%;
  margin: 100px auto 0 auto;
`;

const EditForm = ({ fireStore, fireStorage, userInfo }) => {
  return (
    <Form
      fireStore={fireStore}
      fireStorage={fireStorage}
      userInfo={userInfo}
      action='edit'
    />
  );
};

export default EditForm;
