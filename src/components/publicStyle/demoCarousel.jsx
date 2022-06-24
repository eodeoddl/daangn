import React, { useState } from 'react';
import styled from 'styled-components';
import CarouselBtn from './carousel-btn';

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .slide {
    // position: absolute;
    display: flex;
    flex-flow: row nowrap;
    // flex-derection: row;
    height: 100%;
  }

  .slide img {
    width: 100%;
    height: 100%;
    // object-fit: cover;
    // float: left;
  }
`;

const Demo = ({ images }) => {
  const [slideIdx, setSlideIdx] = useState(0);

  const onPrevBtn = () => {
    if (slideIdx !== 0) setSlideIdx(slideIdx - 1);
    if (slideIdx === 0) setSlideIdx(images.lenght - 1);
  };

  const onNextBtn = () => {
    if (slideIdx !== images.length - 1) setSlideIdx(slideIdx + 1);
    if (slideIdx === images.length - 1) setSlideIdx(0);
  };

  const moveDot = (index) => {
    setSlideIdx(index);
  };

  return (
    <CarouselContainer>
      {images.map((image, i) => {
        return (
          <div key={i} className={slideIdx === i ? 'slide active' : 'slide'}>
            <img alt={`data-index-${i}`} src={image} />
          </div>
        );
      })}
      <CarouselBtn direction={'prev'} moveSlide={onPrevBtn} />
      <CarouselBtn direction={'next'} moveSlide={onNextBtn} />
      <div className='container-dots'>
        {Array.from({ length: images.length }).map((_, i) => (
          <div
            key={i}
            className={slideIdx === i ? 'dot active' : 'dot'}
            onClick={(i) => moveDot(i)}
          ></div>
        ))}
      </div>
    </CarouselContainer>
  );
};

export default Demo;
