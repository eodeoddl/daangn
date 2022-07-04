import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  // transition: transform 0.5s ease-in-out;

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
    margin: 0 5px;
    padding: 4px;
    cursor: pointer;
  }

  .dot:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    opacity: 0.8;
    display: block;
  }

  .active:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    display: block;
    opacity: 1;
  }
`;

const Carousel = ({ images, withButton, articleId }) => {
  console.log('rendering carousel');
  const [slideIdx, setSlideIdx] = useState(0);
  const slideContainerRef = useRef(null);
  const transitionDuration = 500;
  // infinite carousel 효과를 주기위해 배열의 양끝에 추가될 복제할 데이터 개수.
  const cloneItemCount = 1;

  const debounceFunction = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const getOriginIndex = (clonedIndex, originItems) => {
    const originIndex = clonedIndex - cloneItemCount;
    // 복제배열의 첫번째 값에서 cloneItemCount값을 뺏을때 음수값이 나오면 원본배열의 첫번째 index
    // 복제배열의 마지막 값에서 cloneItemCount값을 빼면 원본배열의 마지막 index

    if (originIndex < 0) return originItems.length - 1;
    if (originIndex >= originItems.length - 1) return 0;
    return originIndex;
  };

  const makeCloneImages = (originalItem) => {
    const clonedFirst = [];
    const clonedLast = [];
    let index = 0;

    while (index < cloneItemCount) {
      clonedLast.push(originalItem[index % originalItem.length]);
      clonedFirst.unshift(
        originalItem[originalItem.length - 1 - (index % originalItem.length)]
      );
      index++;
    }
    return [...clonedFirst, ...originalItem, ...clonedLast];
  };

  // const throttleFunction = (callback, delay) => {
  //   let timer;
  //   return () => {
  //     if (timer) return;
  //     timer = setTimeout(() => {
  //       callback();
  //       // timer = null;
  //       clearTimeout(timer);
  //     }, delay);
  //   };
  // };

  const onPrevBtn = debounceFunction(() => {
    setSlideIdx(slideIdx - 1);
  }, transitionDuration);

  const onNextBtn = debounceFunction(() => {
    setSlideIdx(slideIdx + 1);
  }, transitionDuration);

  const moveDot = (index) => {
    setSlideIdx((prevIdx) => {
      if (prevIdx === index) return prevIdx;
      else return index;
    });
  };

  const transitionEnd = (e) => {
    console.log(slideIdx);
    if (slideIdx < 0) {
      console.log(
        '원본 배열보다 작아질때 트랜지션 효과를 없애고 slideIdx값을 원본배열의 index로 state 재설정'
      );
      e.target.style.transition = '';
      setSlideIdx(getOriginIndex(slideIdx, images));
    }
    if (slideIdx > images.length - 1) {
      console.log(
        '원본 배열보다 커질때 트랜지션 효과를 없애고 slideIdx값을 원본배열의 index로 state 재설정'
      );
      e.target.style.transition = '';
      setSlideIdx(getOriginIndex(slideIdx, images));
    }
  };

  useEffect(() => {
    slideContainerRef.current.style.transform = `translateX(${
      -(slideIdx + cloneItemCount) * 100
    }%)`;

    if (slideContainerRef.current.style.transition === '') {
      console.log('트랜지션이 없으면 다시설정하는 useEffect의 if block입니다.');
      setTimeout(() => {
        slideContainerRef.current.style.transition = `transform ${transitionDuration}ms ease-in-out`;
      }, transitionDuration);
    }
  }, [images.length, slideIdx]);

  useEffect(() => {
    setSlideIdx(0);
    slideContainerRef.current.style.transition = '';
  }, [articleId]);

  return (
    <>
      <CarouselContainer
        ref={slideContainerRef}
        onTransitionEnd={(e) => transitionEnd(e)}
      >
        {makeCloneImages(images).map((image, clonedIndex) => {
          return (
            <div
              key={clonedIndex}
              className={slideIdx === clonedIndex ? 'slide active' : 'slide'}
            >
              <img alt={`data-index-${clonedIndex}`} src={image} />
            </div>
          );
        })}
      </CarouselContainer>
      <DotsContainer>
        {Array.from({ length: images.length }).map((_, i) => (
          <div
            key={i}
            className={slideIdx === i ? 'dot active' : 'dot'}
            onClick={(e) => {
              e.stopPropagation();
              moveDot(i);
            }}
          ></div>
        ))}
      </DotsContainer>
      {withButton && (
        <>
          <Button
            className='prev-btn'
            onClick={(e) => {
              e.stopPropagation();
              onPrevBtn(e);
            }}
          >
            <MdKeyboardArrowLeft />
          </Button>
          <Button
            className='next-btn'
            onClick={(e) => {
              e.stopPropagation();
              onNextBtn();
            }}
          >
            <MdKeyboardArrowRight />
          </Button>
        </>
      )}
    </>
  );
};

export default Carousel;
