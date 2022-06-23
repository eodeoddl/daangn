import React, { memo } from 'react';
import styled from 'styled-components';
const Ol = styled.ol`
  counter-reset: item;

  .manner {
    padding: 16px 0;
    border-bottom: 1px solid #e9ecef;
    list-style-type: none;
    counter-increment: item;
    position: relative;

    .manner-comments {
      font-size: 16px;
      display: inline-block;
    }

    .manner-count {
      font-size: 16px;
      font-weight: 600;
      position: absolute;
      right: 0;
      top: 16px;
    }
  }
`;

const UserManner = ({ data }) => {
  return (
    <Ol>
      {data &&
        Object.keys(data).map((key) => {
          const mannerList = data[key];
          const sortedArr = Object.entries(mannerList)
            .sort(([, a], [, b]) => a.count - b.count)
            .reverse();
          return sortedArr.map((item, i) => {
            const [manner, data] = item;
            return (
              <li className='manner' key={i}>
                <p className='manner-comments'>{manner}</p>
                <p className='manner-count'>{data.count}명</p>
              </li>
            );
          });
        })}
    </Ol>
  );
};

export default memo(UserManner);
