import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  // transform: translateX(-100%);
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

// 추가하고자하는 아이템 개수, 어떤식으로 구현할지에 따라 개수가 바뀔수 있음.
const cloneItemCount = 1;

const makeCloneImages = (originalItem) => {
  const clonedFirst = [];
  const clonedLast = [];
  let index = 0;

  while (index < cloneItemCount) {
    console.log(
      'index % items.length => ',
      index % originalItem.length,
      'index => ',
      index
    );
    // index % item.length가 가지는 의미??
    // 만약 index보다 length가 길면 무조건 item index에서 첫번째 값.
    clonedLast.push(originalItem[index % originalItem.length]);
    clonedFirst.unshift(
      originalItem[originalItem.length - 1 - (index % originalItem.length)]
    );
    index++;
  }
  return [...clonedFirst, ...originalItem, ...clonedLast];
};

const getOriginIndex = (clonedIndex, originItems) => {
  const originIndex = clonedIndex - cloneItemCount;
  // 복제배열의 첫번째 값에서 cloneItemCount값을 뺏을때 음수값이 나오면 원본배열의 첫번째 index
  // 복제배열의 마지막 값에서 cloneItemCount값을 빼면 원본배열의 마지막 index

  if (originIndex < 0) return originItems.length - 1;
  // 길어지거나 같은값이면 index 값을 origin 배열의 0번 인덱스로 설정 -> 이동해야될 origin 배열의 인덱스 값과 같음.
  if (originIndex >= originItems.length - 1) return 0;
  return null;
};

const Demo = ({ images, withButton }) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const slideContainerRef = useRef(null);

  useEffect(() => {
    const aa = makeCloneImages(images);
    console.log(' addedItems', aa);
    console.log(' original', images);
    aa.map((_, index) => {
      console.log(getOriginIndex(index, images));
      return null;
    });
  }, [images]);

  const onPrevBtn = () => {
    setSlideIdx((prevIdx) => {
      // if (prevIdx === 0) return images.length - 1;
      // else return prevIdx - 1;
      // console.log(prevIdx);
      // console.log(getOriginIndex(prevIdx, images));
      // return getOriginIndex(prevIdx, images);
      return prevIdx - 1;
    });
  };

  const onNextBtn = () => {
    setSlideIdx((prevIdx) => {
      // if (prevIdx === images.length - 1) return 0;
      // else return prevIdx + 1;
      return prevIdx + 1;
    });
  };

  const moveDot = (index) => {
    setSlideIdx((prevIdx) => {
      if (prevIdx === index) return prevIdx;
      else return index;
    });
  };

  const transitionEnd = (e) => {
    // 트랜지션이 끝나고 slideIdx 값이 바뀌었다는 보장이없음. 때문에 setState가 실행되지 않음..
    console.log(slideIdx);
    const index = getOriginIndex(slideIdx, images);
    if (index !== null) {
      slideContainerRef.current.style.trasition = '';
      setSlideIdx(index);
    }

    console.log(index);
    // setSlideIdx(index);
    // 트랜지션이 끝나고 실제로 보여질 원본배열의 index를 계산하고 setState를 하여서 component를 바꿔준다.
    // console.log('transitionEnd');
    // console.log(e.target);
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
    // if (slideIdx === 0)
    // slideContainerRef.current.style.transform = `translateX(-100%)`;
    //   slideContainerRef.current.style.tra
    // click prev & point images last index
    // else if (slideIdx === images.length - 1) {
    // slideContainerRef.current.style.transform = `translateX(${
    //   -(slideIdx - 1) * 100
    // }%)`;
    // } else
    // if (slideIdx === 0) return;
    slideContainerRef.current.style.transform = `translateX(${
      -slideIdx * 100
    }%)`;
    slideContainerRef.current.style.trasition = 'transform 0.5s ease-in-out';
    // const idx = getOriginIndex(slideIdx, images);
    // if (idx) setSlideIdx(idx);
  }, [slideIdx]);

  return (
    <>
      <CarouselContainer
        ref={slideContainerRef}
        onTransitionEnd={(e) => transitionEnd(e)}
      >
        {/* {images && (
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
        )} */}
        {makeCloneImages(images).map((image, clonedIndex) => {
          // const index = getOriginIndex(clonedIndex, images);
          // console.log(index);
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
