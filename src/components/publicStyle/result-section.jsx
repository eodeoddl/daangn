import React, { Children } from 'react';
import styled from 'styled-components';

const Section = ({ className, children }) => {
  return (
    children && (
      <section className={className}>
        {Children.map(children, (child) => {
          return <div className='wrapper'>{child}</div>;
        })}
      </section>
    )
  );
};

const ResultSection = styled(Section)`
  & {
    background-color: ${({ theme }) => theme.backgroundColors.gray};
    padding: 30px 0 40px 0;
  }

  .wrapper {
    border-radius: 8px;
    border: 1px solid #ccc9c5;
    width: 800px;
    margin: 0 auto;
    margin-bottom: 20px;
    background: #fff;
    padding: 0 40px;
  }
`;

export { ResultSection };
