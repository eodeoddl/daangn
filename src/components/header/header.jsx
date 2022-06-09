import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Header = React.memo(
  ({ handleSearch, handleShowModal, loginState, logout, userInfo }) => {
    const inputEl = useRef(null);

    const focusSearchBar = () => {
      console.log('focus');
    };

    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch(inputEl.current.value);
      }
    };

    const onClick = (e) => {
      e.preventDefault();
      handleSearch(inputEl.current.value);
    };

    const onLogin = () => {
      handleShowModal();
    };

    const onLogOut = () => {
      logout();
    };

    const showProfile = () => {};

    return (
      <header className={`${styles.header} ${styles.fixedBar}`}>
        <div className={styles.fixedBarWrapper}>
          <h1>
            <img
              className={styles.logo}
              src='/images/basic-logo.svg'
              alt='logo'
            />
          </h1>
          <section className={`${styles.searchBar} ${styles.focus}`}>
            <form className={styles.inputWrapper}>
              <input
                type='text'
                name='header-search-input'
                className={styles.searchInput}
                placeholder='동네 이름,물풀명 등을 검색해보세요!'
                ref={inputEl}
                onFocus={focusSearchBar}
                onKeyPress={onKeyPress}
              />
              <button
                className={styles.searchButton}
                type='submit'
                onClick={onClick}
              >
                <img
                  className={styles.searchIcon}
                  src='/images/search-icon.svg'
                  alt='search'
                />
              </button>
            </form>
          </section>
          <section className={styles.fixedBarMenu}>
            {loginState ? (
              <>
                <Link
                  className={styles.userAnchor}
                  to={{
                    pathname: `/user/${userInfo.displayName}`,
                  }}
                >
                  <div className={styles.profileWrap}>
                    <img
                      src={userInfo.photoURL}
                      className={styles.profilePhoto}
                      alt='img'
                    />
                    <p className={styles.profileName}>{userInfo.displayName}</p>
                  </div>
                </Link>
                <button className={styles.loginButton} onClick={onLogOut}>
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <button className={styles.loginButton} onClick={onLogin}>
                <span>로그인</span>
              </button>
            )}
            <div className={styles.downloadWrapper}>
              <input
                type='checkbox'
                id='fixedMenuCheckbox'
                className={styles.fixedMenuCheckbox}
              />
              <label
                htmlFor='fixedMenuCheckbox'
                className={styles.fixedMenuLabel}
              >
                다운로드
                <svg
                  className={`${styles.menuIcon} ${styles.fixedMenuCheckbox}:checked`}
                  width='12'
                  height='7'
                  fill='none'
                  viewBox='0 0 12 7'
                >
                  <path
                    d='M1 1L6 6L11 1'
                    stroke='#4d5159'
                    strokeWidth='1.5'
                  ></path>
                </svg>
              </label>
              <ul className={styles.fixedMenuUl}>
                <li>
                  <a
                    className={styles.menuAnchor}
                    target='blank'
                    href='https://apps.apple.com/kr/app/pangyojangteo/id1018769995?l=ko&ls=1'
                  >
                    <img alt='App Store' src='./images/app-store.svg' />
                    <span>App Store</span>
                  </a>
                </li>
                <li>
                  <a
                    className={styles.menuAnchor}
                    target='blank'
                    href='https://play.google.com/store/apps/details?id=com.towneers.www'
                  >
                    <img alt='Google Play' src='./images/google-play.svg' />
                    <span>Google Play</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* <a href='https://chat.daangn.com' target='blank'>
              <button className={styles.chatButton}>
                <span className={styles.buttonText}>당근채팅</span>
                <span className={styles.buttonBeta}>Beta</span>
              </button>
            </a> */}
          </section>
          {/* {loginState ? <div>'ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ'</div> : null} */}
        </div>
      </header>
    );
  }
);

export default Header;
