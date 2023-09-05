import { DefaultText } from '@components/common/DefaultText';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { DefaultButton } from 'src/components/common/DefaultButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  gap: 50px;
  width: 100%;
  max-width: 768px;
  #text-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Home: NextPage = () => {
  return (
    <Container>
      <div id="text-wrapper">
        <DefaultText
          text={`맛잇팅 프로젝트 \n 공통 컴포넌트 \n 테스트`}
          style={{
            width: '100%',
            maxWidth: `calc(100% - 60px)`,
          }}
          align="center"
          ellipsis
          color="blue"
          size={50}
        />
      </div>
      <DefaultButton text="ssss" buttonType={'danger'} />
    </Container>
  );
};

export default Home;
