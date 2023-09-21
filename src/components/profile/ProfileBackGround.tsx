import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 8;
  .profilebackground {
    object-fit: cover;
    object-position: center;
  }
`;

const ProfileBackGround = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const main: HTMLDivElement | null = document.querySelector("#main");
    const handleScroll = () => {
      if (main) {
        const position = main.scrollTop;
        setScrollPosition(position);
      }
    };
    if (main) {
      main.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (main) {
        main.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Container style={{ transform: `translateY(${scrollPosition * 0.4}px)` }}>
      <Image
        src="/images/profile/profilebackground.jpg"
        width="768px"
        height="200px"
        className="profilebackground"
      ></Image>
    </Container>
  );
};

export default ProfileBackGround;
