import React from 'react';
import styled from 'styled-components';

const Message = styled.section`
  margin-top: 75px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  padding-bottom: 16px;
  z-index: 99;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const HeaderMessage = () => {
  return <Message>header message</Message>;
};

export default HeaderMessage;
