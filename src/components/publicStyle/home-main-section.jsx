import styled from 'styled-components';

const Section = ({ className, children }) => (
  <section className={className}>
    <div className='wrapper'>{children}</div>
  </section>
);

const HomeSection = styled(Section)`
  & {
    padding: 6rem 0;
  }

  .wrapper {
    width: 1024px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const HomeTopSection = styled(Section)`
  & {
    margin-top: 72px;
    background-color: #fbf7f2;
  }
  .wrapper {
    position: relative;
    height: 760px;
    width: 1024px;
    margin: 0 auto;
    background-color: #FBF&F2;
  }
`;

export { HomeSection, HomeTopSection };
