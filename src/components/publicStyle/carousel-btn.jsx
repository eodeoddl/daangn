import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Button = styled.button`
  appearance: none;
  border: none;
`;

const chooseImg = (direction) => {
  switch (direction) {
    case 'prev':
      return <MdKeyboardArrowLeft />;
    case 'next':
      return <MdKeyboardArrowRight />;
    default:
      console.log('check direction props');
      return null;
  }
};

const CarouselBtn = ({ direction, moveSlide }) => {
  const imgComponent = chooseImg(direction);
  return (
    <>
      {imgComponent ? (
        <Button onClick={moveSlide}>{imgComponent}</Button>
      ) : null}
    </>
  );
};

export default CarouselBtn;
