import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    list-style-type: none;
    background-color: #fff;
    height: 80%;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    // justify-content: center;

    li {
      width: 100%;
      padding: 3px 0;
      margin: 10px 0;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      text-align: center;
    }

    li:hover {
      background-color: #999999;
    }

    li:nth-child(1) {
      margin-top: 0;
    }

    li:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  ul::-webkit-scrollbar {
    width: 20px;
  }

  ul::-webkit-scrollbar-thumb {
    height: 17%;
    background-color: rgba(33, 133, 133, 1);
    border-radius: 10px;
  }

  ul::-webkit-scrollbar-track {
    background-color: rgba(33, 133, 133, 0.33);
  }
`;

const Cartegory = ({ setShowModal, cartegory, dispatch }) => {
  const onClick = (index) => {
    dispatch({ type: 'setCartegory', index });
    setShowModal(false);
  };

  return (
    <Container>
      <ul>
        {cartegory.map((item, i) => {
          return (
            <li key={`${item}`} onClick={() => onClick(i)}>
              {item}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Cartegory;
