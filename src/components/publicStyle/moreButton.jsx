import styled from 'styled-components';

const button = ({ className, handleLoading, loadingState }) => (
  <div className={className} onClick={handleLoading}>
    <span className={`more_text ${loadingState ? 'none' : 'block'}`}>
      더보기
    </span>
    <div className={`more_loading ${loadingState ? 'block' : 'none'}`}>
      <div className='loader'></div>
    </div>
  </div>
);

const MoreButton = styled(button)`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    cursor: pointer;
    width: 100%;
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: 16px;
    border-top: 1px solid #ccc9c5;
  }

  .more_loading {
    .loader {
      width: 24px;
      height: 24px;
      position: relative;
      border-radius: 100%;
      background: linear-gradient(
        to top right,
        ${({ theme }) => theme.colors.lightOrange} 25%,
        rgba(255, 255, 255, 0) 70%
      );
      animation: spin 1.4s infinite linear;

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }

    .loader::before {
      content: '';
      width: 50%;
      height: 50%;
      border-radius: 100% 0 0 0;
      background: ${({ theme }) => theme.colors.lightOrange};
      position: absolute;
      top: 0;
      left: 0;
    }

    .loader::after {
      content: '';
      width: 75%;
      height: 75%;
      border-radius: 75%;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  }

  .block {
    display: block;
  }

  .none {
    display: none;
  }
`;

export { MoreButton };
