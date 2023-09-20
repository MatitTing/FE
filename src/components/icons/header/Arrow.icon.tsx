import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface ArrowIconProps {
  styles?: CSSProperties;
}

const Container = styled.div``;

export const ArrowIcon = ({ styles }: ArrowIconProps) => (
  <Container style={styles}>
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00032 8.71667L3.32947 5.04582C3.10166 4.81801 2.73232 4.81801 2.50451 5.04582C2.27671 5.27362 2.27671 5.64297 2.50451 5.87077L6.38161 9.74787C6.72331 10.0896 7.27733 10.0896 7.61904 9.74787L11.4961 5.87078C11.7239 5.64297 11.7239 5.27362 11.4961 5.04582C11.2683 4.81801 10.899 4.81801 10.6712 5.04582L7.00032 8.71667Z"
        fill={'black'}
      />
    </svg>
  </Container>
);
