import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;

  .review {
    border-bottom: 1px solid #e9ecef;
    padding: 16px 0;
  }

  .profile-photo {
    display: inline-block;
    vertical-align: middle;
    .img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .displayName {
    display: inline-block;
    font-size: 15px;
    font-weight: 600;
    vertical-aling: middle;
    margin: 0 8px;

    a {
      color: #212529;
      text-decoration: none;
    }
  }

  .region {
    display: inline-block;
    font-size: 13px;
    vertical-align: middle;
  }

  .comment {
    padding-top: 8px;
    font-size: 15px;
  }

  .time {
  }
`;

const UserReview = ({ data }) => {
  console.log('userReview data', data);

  return (
    <>
      <List>
        {data &&
          Object.keys(data).map((key) => {
            const review = data[key];
            console.log(review);
            return Object.keys(review).map((id, i) => {
              const { comments } = review[id];
              console.log(comments);
              return (
                <li className='review' key={i}>
                  <div className='profile-photo'>
                    <img className='img' alt='profile-img' src='/logo512.png' />
                  </div>
                  <div className='displayName'>
                    <Link
                      to={{
                        pathname: `/user/${id}`,
                      }}
                    >
                      {id}
                    </Link>
                  </div>
                  <div className='region'>청주시 흥덕구</div>
                  <p className='comment'>{comments}</p>
                  <time className='time'></time>
                </li>
              );
            });
          })}
      </List>
    </>
  );
};

export default memo(UserReview);
