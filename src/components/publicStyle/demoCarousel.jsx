import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  transform: translateX(-100%);
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

const DotsContainer = styled.div`
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  .dot {
    display: inline-block;
    margin: 0 7px;
    cursor: pointer;
  }

  .dot:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0.5;
    display: block;
  }

  .active:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    display: block;
  }
`;

const Demo = ({ images, withButton }) => {
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
    setSlideIdx((prevIdx) => {
      if (prevIdx === index) return prevIdx;
      else return index;
    });
  };

  const transitionEnd = (e) => {
    console.log('transitionEnd');

    // console.log(slideIdx === images.length - 1 || slideIdx === 0);
    // if (slideIdx === images.length - 1 || slideIdx === 0) {
    //   console.log('if block ');
    //   slideContainerRef.current.style.transition = 'none';
    // }
    // console.log('else block ');
    // slideContainerRef.current.style.transition = 'transform 0.5s ease-in-out';
  };

  useEffect(() => {
    // click next & point images first index
    // sif (slideIdx === 0)
    //   // slideContainerRef.current.style.transform = `translateX(-100%)`;
    //   slideContainerRef.current.style.tra
    // // click prev & point images last index
    // else if (slideIdx === images.length - 1) {
    //   // slideContainerRef.current.style.transform = `translateX(${
    //   //   -(slideIdx - 1) * 100
    //   // }%)`;
    // } else
    if (slideIdx === 0) return;
    slideContainerRef.current.style.transform = `translateX(${
      -slideIdx * 100
    }%)`;
  }, [slideIdx]);

  // useEffect(() => {
  // }, [slideIdx]);

  return (
    <>
      <CarouselContainer
        ref={slideContainerRef}
        onTransitionEnd={(e) => transitionEnd(e)}
      >
        {images && (
          <>
            <div className='slide'>
              <img alt='cloned-lastImg' src={images[images.length - 1]} />
            </div>
            {images.map((image, i) => {
              return (
                <div
                  key={i}
                  className={slideIdx === i ? 'slide active' : 'slide'}
                >
                  <img alt={`data-index-${i}`} src={image} />
                </div>
              );
            })}
            <div className='slide'>
              <img alt='firstImg' src={images[0]} />
            </div>
          </>
        )}
      </CarouselContainer>
      <DotsContainer>
        {Array.from({ length: images.length }).map((_, i) => (
          <div
            key={i}
            className={slideIdx === i ? 'dot active' : 'dot'}
            onClick={() => moveDot(i)}
          ></div>
        ))}
      </DotsContainer>
      {withButton && (
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
