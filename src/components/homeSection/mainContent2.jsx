import styled from 'styled-components';
import { HomeSection } from '../publicStyle/home-main-section';

const MainContent = styled(HomeSection)`
  & {
    background-color: ${({ theme }) => theme.backgroundColors.paleGreen};
  }
  .background-Img {
    background: url(/images/image-2.png);
    background-size: 546px 746px;
    width: 546px;
    height: 746px;
  }
  .title {
    font-size: 4rem;
    line-height: 1.35;
    margin-bottom: 2.4rem;
  }
  .text {
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: -0.3px;
  }
  .home-story-list {
    list-style-type: none;
    margin-top: 4rem;
    display: flex;
    justify-content: space-between;
  }
`;

const List = ({ className, title, text }) => (
  <li className={className}>
    <div className='story-icon'></div>
    <div className='story-title'>{title}</div>
    <div className='story-text'>{text}</div>
  </li>
);

const Item = styled(List)`
  & {
    max-width: 14rem;
  }
  &:nth-child(n + 2) {
    margin-left: 1.6rem;
  }
  .story-icon {
    width: 56px;
    height: 56px;
    background: url(${({ imgURL }) => imgURL});
    background-size: 56px 56px;
  }
  .story-title {
    margin-bottom: 0.8rem;
    margin-top: 1.6rem;
    font-size: 1.4rem;
    line-height: 1.5;
    font-weight: bold;
  }
  .story-text {
    font-size: 1.3rem;
    line-height: 1.5;
  }
`;

const MainContent2 = () => {
  return (
    <MainContent>
      <div>
        <h1 className='title'>
          이웃과 함께하는
          <br />
          동네 생활
        </h1>
        <p className='text'>
          우리 동네의 다양한 이야기를 이웃과 함께 나누어요.
        </p>
        <ul className='home-story-list'>
          <Item
            imgURL='/images/icon-story-1.svg'
            title='우리동네질문'
            text='궁금한게 있을 땐 이웃에게 물어보세요.'
          />
          <Item
            imgURL='/images/icon-story-2.svg'
            title='동네분실센터'
            text='무언가를 잃어버렸을 때, 함께 찾을 수 있어요.'
          />
          <Item
            imgURL='/images/icon-story-3.svg'
            title='동네모임'
            text='관심사가 비슷한 이웃과 온오프라인으로 만나요.'
          />
        </ul>
      </div>
      <div className='background-Img'></div>
    </MainContent>
  );
};

export default MainContent2;
