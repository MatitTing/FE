import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface NavListProps {
  title: string;
  href: string;
  icon: any;
}

const Container = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  transition: all 0.1s;
  cursor: pointer;
  &:hover {
    background-color: #dddddd;
  }
`;
const TitleText = styled.div`
  font-size: 12px;
`;

const NavList = ({ title, href, icon }: NavListProps) => {
  const router = useRouter();
  const selected = router.pathname === href;

  return (
    <Container
      onClick={() => {
        router.push(href);
      }}
    >
      {icon(selected)}
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default NavList;
