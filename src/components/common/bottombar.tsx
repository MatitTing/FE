import styled from "@emotion/styled";
import NavList from "./navList";
import CreateIcon from "@components/icons/bottombar/create";
import HomeIcon from "@components/icons/bottombar/home";
import ProfileIcon from "@components/icons/bottombar/profile";
import SearchIcon from "@components/icons/bottombar/search";

const Container = styled.div`
  width: 768px;
  display: flex;
  justify-content: center;
  position: absolute;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #dddddd;
  background-color: white;
`;

const NavContainer = styled.div`
  width: 390px;
  height: 75px;
  display: flex;
  padding: 0px 30px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const navList = [
  {
    title: "홈",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "파티 생성",
    href: "/create",
    icon: CreateIcon,
  },
  {
    title: "검색",
    href: "/search",
    icon: SearchIcon,
  },
  {
    title: "프로필",
    href: "/profile",
    icon: ProfileIcon,
  },
];

const Bottombar = () => (
  <Container>
    <NavContainer>
      {navList.map(({ title, href, icon }) => (
        <NavList key={href} title={title} href={href} icon={icon} />
      ))}
    </NavContainer>
  </Container>
);

export default Bottombar;
