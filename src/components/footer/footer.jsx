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
                ?????? ??? ?????? ????????????
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='white' path=''>
                ?????? ?????? ??????
              </StyledTextAnchor>
            </li>
          </ul>
          <ul className='footerList'>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                ????????????
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='white' path=''>
                ???????????????
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                ????????????
              </StyledTextAnchor>
            </li>
          </ul>
          <ul className='footerList'>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                ????????????
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                ????????????????????????
              </StyledTextAnchor>
            </li>
            <li className='listItem'>
              <StyledTextAnchor color='gray' fontWeight='400' path=''>
                ????????????????????? ????????????
              </StyledTextAnchor>
            </li>
          </ul>
        </div>
        <div className='footer-bottom'>
          <div className='copyright'>
            <ul className='copyright-list'>
              <li className='copyright-listItem'>
                ????????????&nbsp;
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
                ????????????&nbsp;
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
                ????????????&nbsp;
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
                PR??????&nbsp;
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
                  ??????????????? ????????? ???????????? 30??? 28 609??? (???????????????)
                </address>
              </li>
              <li className='copyright-listItem'>
                ????????? ???????????? : 375-87-00088
              </li>
              <li className='copyright-listItem'>
                ???????????????????????? ???????????? : J1200020200016
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
                    <option value='kr'>??????</option>
                    <option value='https://uk.karrotmarket.com'>??????</option>
                    <option value='https://uk.karrotmarket.com'>?????????</option>
                    <option value='https://uk.karrotmarket.com'>??????</option>
                    <option value='https://uk.karrotmarket.com'>??????</option>
                  </select>
                </li>
              </ul>
            </div>
            <div className='copyright-text'>??Danggeun Market Inc.</div>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
