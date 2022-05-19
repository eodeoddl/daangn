import React from 'react';
import styled from 'styled-components';
import { StyledTextAnchor } from '../publicStyle/textAnchor';

const StyledFooter = styled.footer`
  & {
    background-color: ${({ theme }) => theme.backgroundColors.darkGray};
    padding: 8rem 0;
    color: ${({ theme }) => theme.colors.white};
  }

  .wrapper {
    width: 1024px;
    margin: 0 auto;
    .footer-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4rem;
      .footer-logo {
        width: 130px;
        height: 37px;
        background-image: url(/images/logoWhite.svg);
        background-size: 130px 37px;
      }
      .footerList {
        list-style-type: none;
        .listItem {
          margin: 1.6rem;
        }
      }
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      .copyright {
        margin-top: 3.2rem;
      }

      .copyright-list {
        list-style-type: none;
        margin-bottom: 0.4rem;
        .copyright-listItem {
          display: inline-block;
          font-size: 1.4rem;
          margin-right: 0.8rem;
          color: ${({ theme }) => theme.colors.gray};
          address {
            font-style: normal;
          }
        }
      }

      .copyright .last {
        margin-top: 1.6rem;
      }

      .copyright .last li {
        color: ${({ theme }) => theme.colors.darkGray};
      }

      .social {
        margin: 3.2rem 0;
        .socialList {
          list-style-type: none;
          .socialList-item {
            display: inline-block;
            margin-right: 3.2rem;
          }
        }

        .global-link {
          display: inline-block;
          margin-left: 26px;
          img {
            widht: 24px;
            height: 24px;
          }
          .global-link-selectBox {
            appearance: none;
            vertical-align: top;
            background: ${({ theme }) => theme.backgroundColors.darkGray};
            border: none;
            margin-left: 6px;
            font-size: 16px;
            line-height: 24px;
            color: ${({ theme }) => theme.colors.gray};
            text-decoration: underline;
            text-underline-position: under;
          }
        }
      }

      .copyright-text {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.darkGray};
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className='wrapper'>
        <div className='footer-top'>
          <div className='footer-logo'></div>
          <ul className='footerList'>
            <li className='listItem'>
              <StyledTextAnchor color='white' path='trust_deal'>
                믿을 수 있는 중고거래
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='white' path=''>
                자주 묻는 질문
              </StyledTextAnchor>
            </li>
          </ul>
          <ul className='footerList'>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                회사소개
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='white' path=''>
                광고주센터
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                동네가게
              </StyledTextAnchor>
            </li>
          </ul>
          <ul className='footerList'>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                이용약관
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                개인정보처리방침
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                위치기반서비스 이용약관
              </StyledTextAnchor>
            </li>
          </ul>
        </div>
        <div className='footer-bottom'>
          <div className='copyright'>
            <ul className='copyright-list'>
              <li className='copyright-listItem'>
                고객문의&nbsp;
                <StyledTextAnchor
                  className='hover'
                  color='darkGray'
                  fontSize='1.4rem'
                  fontWeight='0'
                >
                  cs@daangnservice.com
                </StyledTextAnchor>
              </li>
              <li className='copyright-listItem'>
                제휴문의&nbsp;
                <StyledTextAnchor
                  className='hover'
                  color='darkGray'
                  fontSize='1.4rem'
                  fontWeight='0'
                >
                  contact@daangn.com
                </StyledTextAnchor>
              </li>
            </ul>
            <ul className='copyright-list'>
              <li className='copyright-listItem'>
                지역광고&nbsp;
                <StyledTextAnchor
                  className='hover'
                  color='darkGray'
                  fontSize='1.4rem'
                  fontWeight='0'
                >
                  ad@daangn.com
                </StyledTextAnchor>
              </li>
              <li className='copyright-listItem'>
                PR문의&nbsp;
                <StyledTextAnchor
                  className='hover'
                  color='darkGray'
                  fontSize='1.4rem'
                  fontWeight='0'
                >
                  pr@daangn.com
                </StyledTextAnchor>
              </li>
            </ul>
            <ul className='copyright-list last'>
              <li className='copyright-listItem'>
                <address>
                  서울특별시 구로구 디지털로 30길 28 609호 (당근서비스)
                </address>
              </li>
              <li className='copyright-listItem'>
                사업자 등록번호 : 375-87-00088
              </li>
              <li className='copyright-listItem'>
                직업정보제공사업 신고번호 : J1200020200016
              </li>
            </ul>
            <div className='social'>
              <ul className='socialList'>
                <li className='socialList-item'>
                  <a target='blank' href='https://www.facebook.com'>
                    <img src='/images/icon-facebook.svg' alt='facebook'></img>
                  </a>
                </li>
                <li className='socialList-item'>
                  <a
                    target='blank'
                    href='https://www.instagram.com/daangnmarket/'
                  >
                    <img src='/images/icon-instagram.svg' alt='instagram' />
                  </a>
                </li>
                <li className='socialList-item'>
                  <a target='blank' href='https://blog.naver.com/daangn/'>
                    <img src='/images/icon-blog.svg' alt='blog' />
                  </a>
                </li>
                <li className='global-link'>
                  <img src='/images/icon-global.png' alt='global' />
                  <select className='global-link-selectBox'>
                    <option value='kr'>한국</option>
                    <option value='https://uk.karrotmarket.com'>영국</option>
                    <option value='https://uk.karrotmarket.com'>캐나다</option>
                    <option value='https://uk.karrotmarket.com'>미국</option>
                    <option value='https://uk.karrotmarket.com'>일본</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className='copyright-text'>©Danggeun Market Inc.</div>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
