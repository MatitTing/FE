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

const ProfilebackGround = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const main: any = document.querySelector("#main");
    const handleScroll = () => {
      const position = main.scrollTop;
      setScrollPosition(position);
    };
    main.addEventListener("scroll", handleScroll);
    return () => {
      main.removeEventListener("scroll", handleScroll);
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

export default ProfilebackGround;
