import { DefaultHeader } from "@components/common/DefaultHeader";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import styled from "@emotion/styled";
import { useSearchKeyword } from "@hooks/useSearchKeyword";
import { useRouter } from "next/router";
import { RefObject, forwardRef, useEffect } from "react";
import { Color } from "styles/Color";

interface HeaderCenterAreaProps {
  inputRef: RefObject<HTMLInputElement>;
  searchKeyword: (event: React.KeyboardEvent) => void;
}

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
  #back-btn {
    cursor: pointer;
    margin-top: -5px;
  }
  #search-input {
    width: 100%;
    max-width: 658px;
    margin-top: -8px;
    input {
      width: 100%;
      height: 30px;
    }
  }
`;

const HeaderCenterArea = ({
  inputRef,
  searchKeyword,
}: HeaderCenterAreaProps) => {
  return (
    <div id="search-input">
      <input
        placeholder="검색어를 입력해 주세요."
        defaultValue={inputRef.current?.value}
        ref={inputRef}
        onKeyUp={searchKeyword}
      />
    </div>
  );
};
const SearchResultPage = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const { inputRef, searchKeyword } = useSearchKeyword();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = keyword as string;
    }
  }, [inputRef, keyword]);

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderBackButton routerPath="/search" />}
        centerArea={
          <HeaderCenterArea inputRef={inputRef} searchKeyword={searchKeyword} />
        }
      />
    </Container>
  );
};

export default SearchResultPage;
