import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = ({ className, children, path }) => (
  <Link className={className} to={`/${path}`}>
    {children}
  </Link>
);

const LinkButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors['gray500']};
  color: #212529;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  padding: 1.45rem 2.6rem;
  display: inline-block;
  &.text-1 {
    font-size: 1.8rem;
    line-height: 1.47;
    letter-spacing: -0.3px;
  }
  &.text-bold {
    font-weight: bold;
  }
`;

export { LinkButton };
