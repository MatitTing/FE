import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  z-index: 8;
`;

const PartyImg = () => {
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
        src="https://cdn.pixabay.com/photo/2018/03/11/09/08/cookie-3216243_1280.jpg"
        className="partyimg"
        objectFit="cover"
        layout="fill"
      />
    </Container>
  );
};

export default PartyImg;
