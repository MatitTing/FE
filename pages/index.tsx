import { HomeHeader } from '@components/header/HomeHeader';
import { HomeList } from '@components/pages/home/HomeList';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Color } from 'styles/Color';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
  border: 1px solid red;
  gap: 50px;
  width: 100%;
  max-width: 768px;
  background: ${Color.VeryLightGrey};
  display: flex;
  flex-direction: column;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <HomeHeader />
      <HomeList />
    </Container>
  );
};

export default Home;
