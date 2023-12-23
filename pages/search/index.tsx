import { DefaultHeader } from "@components/common/DefaultHeader";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { HotKeywordSection } from "@components/search/HotKeywordSection";
import RecentKeywordSection from "@components/search/RecentKeywordSection";
import SearchHeader from "@components/search/header";
import styled from "@emotion/styled";
import { useSearchKeyword } from "@hooks/useSearchKeyword";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { Color } from "styles/Color";
const QuerySuspenseErrorBoundary = dynamic(
  () => import("@components/hoc/QuerySuspenseErrorBoundary")
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  min-height: calc(100vh - 45px);
  gap: 50px;
  width: 100%;
  max-width: 768px;
  background: ${Color.Grey};
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  padding: 35px;
  gap: 50px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SearchPage = () => {
  const router = useRouter();
  const {
    updateKeywords,
    searchKeyword,
    recentKeywords,
    setRecentKeywords,
    inputRef,
    resetRecentKeywords,
  } = useSearchKeyword();

  const onClickKeyword: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    const keyword = e.currentTarget.innerText;
    updateKeywords(keyword);
    await router.push(`/search/${keyword}`);
  };

  const onClickIndividualRemoveBtn = (keyword: string) => {
    const updatedKeywords = [...(recentKeywords ?? [])].filter(
      (value) => value !== keyword
    );
    setRecentKeywords?.(updatedKeywords);
  };

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton routerPath="/" />}
        centerArea={
          <SearchHeader.Center
            inputRef={inputRef}
            searchKeyword={searchKeyword}
          />
        }
      />
      <Contents>
        <QuerySuspenseErrorBoundary>
          <HotKeywordSection onClick={onClickKeyword} />
        </QuerySuspenseErrorBoundary>
        <RecentKeywordSection
          recentKeywords={recentKeywords}
          resetRecentKeywords={resetRecentKeywords}
          onClickKeyword={onClickKeyword}
          onClickDeleteBtn={onClickIndividualRemoveBtn}
        />
      </Contents>
    </Container>
  );
};

export default SearchPage;
