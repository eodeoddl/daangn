import React, { memo, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import UseQuery from '../../customHook/useQuery';
import PostingForm from './postingForm';
import UserArticles from './userArticles';
import UserManner from './userManner';
// import UserReview from './userReview';

const InfoCard = styled.section`
  margin: 80px auto 0 auto;
  width: 750px;

  .user-profile {
    margin: 30px 0;
    position: relative;

    .displayName {
      margin-left: 80px;
      font-weight: 600;
      font-size: 22px;
    }

    .detail {
      list-style-type: none;
      margin: 0 10px;
      margin-left: 80px;

      .detail-title {
        display: inline-block;
        margin-right: 20px;
        font-size: 16px;
        color: #868296;

        .detail-count {
        }
      }
    }

    .profile-img {
      position: absolute;
      top: 0;
      left: 0;

      .img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
      }
    }
  }

  .user-history {
    .filter ul {
      list-style-type: none;
      border-bottom: 3px solid #e9ecef;
    }

    .filter ul li {
      display: inline-block;
      font-size: 17px;
      margin-right: 10px;
      color: #868e96;
      padding: 8px 20px;
      cursor: pointer;
      text-decoration: none;
    }

    .filter ul li.active {
      font-weight: 700;
      border-bottom: 3px solid #f76707;
      color: #f76707;
    }
    .filter ul li .filter-link {
      text-decoration: none;
      color: inherit;
    }

    .content {
      margin: 0 5px;
    }
  }
`;

const UserInfo = ({ userInfo, fireStore, fireStorage }) => {
  let { url } = useRouteMatch();
  let query = UseQuery();
  const [userHistory, setUserHistory] = useState(null);
  const [activeHistory, setActiveHistory] = useState({});

  const staticMenu = ['게시글 작성'];

  const components = {
    매너칭찬: <UserManner data={activeHistory} />,
    판매물품: (
      <UserArticles
        fireStore={fireStore}
        data={Object.values(activeHistory)[0]}
      />
    ),
    // 거래후기: <UserReview data={activeHistory.data} />,
    '게시글 작성': (
      <PostingForm
        userInfo={userInfo}
        fireStorage={fireStorage}
        fireStore={fireStore}
      />
    ),
  };

  // 유저정보보기 style 함수
  const toggleActiveStyle = (key) => {
    if (key === Object.keys(activeHistory)[0]) return 'active';
    else return '';
  };

  // 유저 정보 클릭한 메뉴에따라 세팅
  const toggleActive = (key) => {
    // static 메뉴는 value값이 undefined
    // static 메뉴의 value 값이 필요할 경우 여기서 처리
    setActiveHistory({
      [key]: userHistory[key],
    });
  };

  useEffect(() => {
    setUserHistory({
      매너칭찬: userInfo.manner,
      판매물품: userInfo.userArticles,
    });
  }, [userInfo.manner, userInfo.userArticles]);

  useEffect(() => {
    if (query.get('kind')) return;
    if (!userHistory) return;
    const first_key = Object.keys(userHistory)[0];
    const first_value = userHistory[first_key];
    setActiveHistory({
      [first_key]: first_value,
    });
  }, [query, userHistory]);

  return (
    <>
      <InfoCard>
        <div className='user-profile'>
          <h2 className='displayName'>{userInfo.displayName}</h2>
          <ul className='detail'>
            <li className='detail-title'>
              매너온도<span className='profile-detail-count'></span>
            </li>
            <li className='detail-title'>
              재거래희망률<span className='profile-detail-count'></span>
            </li>
          </ul>
          <div className='profile-img'>
            <img className='img' alt='profile-img' src={userInfo.photoURL} />
          </div>
        </div>
        <div className='user-history'>
          <div className='filter'>
            <ul>
              {userHistory &&
                Object.keys(userHistory).map((menu, i) => {
                  const search = i === 0 ? '' : `?kind=${menu}`;
                  return (
                    <li
                      className={toggleActiveStyle(menu)}
                      key={menu}
                      onClick={() => toggleActive(menu)}
                    >
                      <Link
                        className='filter-link'
                        to={{
                          pathname: url,
                          search,
                        }}
                      >
                        {menu}
                      </Link>
                    </li>
                  );
                })}
              {staticMenu &&
                staticMenu.map((menu) => {
                  return (
                    <li
                      key={menu}
                      className={toggleActiveStyle(menu)}
                      onClick={() => toggleActive(menu)}
                    >
                      <Link
                        className='filter-link'
                        to={{ pathname: url, search: `?kind=${menu}` }}
                      >
                        {menu}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className='content'>
            {components[Object.keys(activeHistory)[0]]}
          </div>
        </div>
      </InfoCard>
    </>
  );
};

export default memo(UserInfo);
