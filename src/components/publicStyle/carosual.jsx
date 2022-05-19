import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UseQuery from '../../customHook/useQuery';

const Container = styled.div`
  overflow: hidden;
  height: 100%;
  position: relative;

  .slide-track {
    display: flex;
    height: 100%;
  }

  .slide-wrap {
    width: 100%;

    .anchor {
      width: 100%;
      height: 100%;
      min-height: 1px;
      display: inline-block;
    }

    .img-wrap {
      position: relative;
      margin: 0 auto;
      width: 94%;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;

      .slide-img {
        width: 100%;
        height: inherit;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: transparent;
        display: inline-block;
        object-fit: fill;
      }
    }
  }

  .slide-dots {
    position: absolute;
    left: 3%;
    bottom: 0;
    list-style: none;
    width: 94%;
    padding: 16px 0;
    border-radius: 8px;
    text-align: center;
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0)
    );
    background-blend-mode: multiply;

    li {
      cursor: pointer;
      display: inline-block;
      position: relative;

      button {
        margin: 0 4px;
        width: 8px;
        background-color: transparent;
        color: transparent;
        border: none;
        postion: relative;
      }

      button:before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.3;
        display: block;
        position: absolute;
        bottom: 0;
      }
    }
  }
`;

const Carosual = forwardRef(
  ({ handleShowModal, itemDataApi, imgSrc, slideIdx, id, showModal }, ref) => {
    let query = UseQuery();
    const slideContainerRef = useRef(null);
    const slideTrackRef = useRef(null);
    const [img, setImg] = useState(imgSrc);

    console.log('img', img);
    console.log('imgSrc', imgSrc);
    console.log('query id', query.get('object_id'));
    console.log('query index', query.get('image_index'));
    console.log('id', id);
    console.log('slideIdx', slideIdx);
    console.log('getItemData', itemDataApi.getItemById(query.get('object_id')));
    console.log('dd', itemDataApi.getItemById(1));

    useImperativeHandle(ref, () => {
      const slideTrack = slideTrackRef.current;
      return {
        addTransition: () =>
          (slideTrack.style.transition = 'transform 0.5s ease-in-out'),
        addTransForm: () =>
          (slideTrack.style.transform = `translateX(${
            -slideIdx * slideContainerRef.current.clientWidth
          }px)`),
      };
    });

    useEffect(() => {
      console.log('useEffect modal controll');
      console.log('showModal', showModal);
      showModal &&
        (async () =>
          await itemDataApi.getItemById(query.get('object_id')).then((res) => {
            const { img } = res.data[0];
            console.log(img);
            setImg([
              img,
              'http://placeimg.com/500/800/animals',
              'http://placeimg.com/640/480/animals',
            ]);
          }))();
      console.log(itemDataApi.getItemById(1));
      console.log(img);
    }, [showModal, itemDataApi, query]);

    useEffect(() => {
      console.log(slideTrackRef.current);
    }, [ref]);

    //controll translateX
    useEffect(() => {
      console.log('useEffect transform');
      slideTrackRef.current.style.transform = `translateX(${
        -slideIdx * slideContainerRef.current.clientWidth
      }px)`;
    }, [ref, slideIdx]);

    // controll container width
    useEffect(() => {
      console.log('useEffect sizing cotainer');
      slideTrackRef.current.style.width =
        slideContainerRef.current.clientWidth * img.length + 'px';
    }, [img, ref]);

    const transitionEnd = () => {
      slideTrackRef.current.style.transition = 'none';
    };

    const onClickDot = () => {
      console.log('dot click');
    };

    // active carosual modal code
    const onClickLink = () => {
      console.log('click link');
      // handleShowModal();
    };

    return (
      <Container ref={slideContainerRef}>
        <div
          className='slide-track'
          ref={slideTrackRef}
          onTransitionEnd={transitionEnd}
        >
          {img &&
            img.map((img, i) => {
              return showModal ? (
                <div className='slide-wrap' key={i}>
                  <div className='img-wrap'>
                    <img
                      alt='상품이미지'
                      className='slide-img'
                      src={`${img}`}
                    />
                  </div>
                </div>
              ) : (
                <div className='slide-wrap' key={i}>
                  <Link
                    className='anchor'
                    to={{
                      pathname: '/image',
                      search: `?image_index=${i}&object_id=${id}`,
                      state: {},
                    }}
                    // onClick={onClickLink}
                  >
                    <div className='img-wrap'>
                      <img
                        alt='상품이미지'
                        className='slide-img'
                        src={`${img}`}
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
        <ul className='slide-dots'>
          {img &&
            img.map((_, i) => {
              return (
                <li key={i} onClick={onClickDot}>
                  <button>{i}</button>
                </li>
              );
            })}
        </ul>
      </Container>
    );
  }
);

export default Carosual;
