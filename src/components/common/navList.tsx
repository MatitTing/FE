import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { BottomIconProps } from "types/layout";

interface NavListProps {
  item: {
    title: string;
    href: string;
    icon: ({ selected }: BottomIconProps) => JSX.Element;
  };
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

const NavList = ({ item }: NavListProps) => {
  const { title, href, icon } = item;
  const router = useRouter();
  const selected = router.pathname === href;

  return (
    <Container
      onClick={() => {
        router.push(href);
      }}
    >
      {icon({ selected })}
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default NavList;
