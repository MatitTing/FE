import { DefaultHeader } from "@components/common/DefaultHeader";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import { SearchResult } from "@components/search/SearchResult";
import SearchHeader from "@components/search/header";
import styled from "@emotion/styled";
import { useSearchKeyword } from "@hooks/useSearchKeyword";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Color } from "styles/Color";
import dynamic from "next/dynamic";
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

const SearchResultPage = () => {
  const router = useRouter();
  const { keyword } = router.query as { keyword: string };
  const { inputRef, searchKeyword } = useSearchKeyword();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = keyword;
    }
  }, [inputRef, keyword]);

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton routerPath="/search" />}
        centerArea={
          <SearchHeader.Center
            inputRef={inputRef}
            searchKeyword={searchKeyword}
          />
        }
      />
      <QuerySuspenseErrorBoundary>
        <SearchResult keyword={keyword} />
      </QuerySuspenseErrorBoundary>
    </Container>
  );
};

export default SearchResultPage;
