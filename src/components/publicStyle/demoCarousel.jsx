import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  transition: transform 0.5s ease-in-out;

  .slide {
    min-width: 100%;
    height: 100%;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  width: 35px;
  height: 35px;
  font-size: 35px;
  background-color: transparent;
  border: none;
  transform: translateY(-50%);

  &:hover {
    color: ${({ theme }) => theme.colors.lightOrange};
    transform: translateY(-50%) scale(1.5);
  }

  &.prev-btn {
    left: 0;
  }

  &.next-btn {
    right: 0;
  }
`;

const Demo = ({ images, widthButton }) => {
  // console.log(widthButton);
  console.log(images);
  const [slideIdx, setSlideIdx] = useState(0);
  const slideContainerRef = useRef(null);

  const onPrevBtn = () => {
    setSlideIdx((prevIdx) => {
      if (prevIdx === 0) return images.length - 1;
      else return prevIdx - 1;
    });
  };

  const onNextBtn = () => {
    setSlideIdx((prevIdx) => {
      if (prevIdx === images.length - 1) return 0;
      else return prevIdx + 1;
    });
  };

  const moveDot = (index) => {
    setSlideIdx(index);
  };

  useEffect(() => {
    // if (slideIdx === 0) return;
    slideContainerRef.current.style.transform = `translateX(${
      -slideIdx * 100
    }%)`;
  }, [slideIdx]);

  useEffect(() => {}, []);

  return (
    <>
      <CarouselContainer ref={slideContainerRef}>
        {images.map((image, i) => {
          console.log(image);
          return (
            <div key={i} className={slideIdx === i ? 'slide active' : 'slide'}>
              <img alt={`data-index-${i}`} src={image} />
            </div>
          );
        })}

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
      {widthButton && (
        <>
          <Button className='prev-btn' onClick={onPrevBtn}>
            <MdKeyboardArrowLeft />
          </Button>
          <Button className='next-btn' onClick={onNextBtn}>
            <MdKeyboardArrowRight />
          </Button>
        </>
      )}
    </>
  );
};

export default Demo;
