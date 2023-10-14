import { DefaultHeader } from "@components/common/DefaultHeader";
import BackIcon from "@components/icons/common/close";
import styled from "@emotion/styled";
import { useSearchKeyword } from "@hooks/useSearchKeyword";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Color } from "styles/Color";

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
    position: relative;
    width: 100%;
    max-width: 658px;
    margin-top: -4px;
    input {
      width: 100%;
      height: 30px;
    }
  }
`;

const SearchResultPage = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const { inputRef, searchKeyword } = useSearchKeyword();
  const onClickBackBtn = () => {
    router.push("/search");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = keyword as string;
    }
  }, [keyword]);

  const HeaderLeftArea = () => {
    return (
      <div id="back-btn" onClick={onClickBackBtn}>
        <BackIcon />
      </div>
    );
  };
  const HeaderCenterArea = () => {
    return (
      <div id="search-input">
        <input
          placeholder="검색어를 입력해 주세요."
          ref={inputRef}
          onKeyUp={searchKeyword}
        />
      </div>
    );
  };

  return (
    <Container>
      <DefaultHeader
        leftArea={<HeaderLeftArea />}
        centerArea={<HeaderCenterArea />}
      />
    </Container>
  );
};

export default SearchResultPage;
