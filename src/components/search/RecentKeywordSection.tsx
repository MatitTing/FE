import { DefaultText } from "@components/common/DefaultText";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { Resetter } from "recoil";
import { RecentKeywordButton } from "./RecentKeywordButton";

interface RecentKeywordSectionProps {
  recentKeywords?: string[];
  onClickKeyword: React.MouseEventHandler<HTMLDivElement>;
  onClickDeleteBtn: (keyword: string) => void;
  resetRecentKeywords: Resetter;
}

const Container = styled.section`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const List = styled.div`
  margin-top: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RecentKeywordSection: FC<RecentKeywordSectionProps> = ({
  recentKeywords,
  resetRecentKeywords,
  onClickKeyword,
  onClickDeleteBtn,
}) => (
  <Container>
    {recentKeywords && recentKeywords.length > 0 ? (
      <>
        <Header>
          <DefaultText text="최근 검색" size={15} weight={700} />
          <DefaultText
            text="전체 삭제"
            size={15}
            weight={500}
            style={{
              cursor: "pointer",
            }}
            onClick={resetRecentKeywords}
          />
        </Header>
        <List>
          {recentKeywords.map((value, index) => (
            <RecentKeywordButton
              key={value + index}
              keyword={value}
              onClickKeyword={onClickKeyword}
              onClickDeleteBtn={onClickDeleteBtn}
            />
          ))}
        </List>
      </>
    ) : null}
  </Container>
);
export default RecentKeywordSection;
