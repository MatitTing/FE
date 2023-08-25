import styled from '@emotion/styled';
import { Color } from 'styles/Color';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${Color.VeryLightGrey};
  padding: 50px;
  overflow: scroll;
  div {
    background-color: red;
    border-radius: 10px;
    height: 1500px;
  }
`;

export const HomeList = () => {
  return (
    <Container>
      <div>ssss</div>
    </Container>
  );
};
