import { DefaultText } from "@components/common/DefaultText";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import ScrollContainer from "react-indiana-drag-scroll";
import getSearchRank, { API_GET_SEARCH_RANK } from "src/api/getSerchRank";
import { HotKeywordTagButton } from "./HotKeywordTagButton";
import React, { FC } from "react";

interface HotKeywordSectionProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HotKeywordSection: FC<HotKeywordSectionProps> = ({ onClick }) => {
  const { data } = useQuery({
    queryKey: [API_GET_SEARCH_RANK],
    queryFn: getSearchRank,
  });

  return (
    <Container>
      <DefaultText text="인기 검색" size={15} weight={700} />
      <ScrollContainer
        className={"scroll-container"}
        vertical={false}
        horizontal
        style={{
          display: "flex",
          gap: "5px",
        }}
      >
        {data?.map((value, index) => (
          <HotKeywordTagButton
            key={value + index}
            text={value}
            onClick={onClick}
          />
        ))}
      </ScrollContainer>
    </Container>
  );
};
