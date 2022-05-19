import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Anchor = ({ className, children, path }) => (
  <Link className={className} to={`/${path}`}>
    {children}
  </Link>
);

const StyledTextAnchor = styled(Anchor)`
  & {
    font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.6rem')};
    line-height: 1.5;
    letter-spacing: -0.3px;
    color: ${({ theme, color }) =>
      color ? theme.colors[color] : theme.colors.black};
    font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'bold')};
    cursor: pointer;
    text-decoration: none;
  }

  &.underLine {
    text-decoration: underline;
  }

  &.hover:hover {
    text-decoration: underline;
  }
`;

export { StyledTextAnchor };
