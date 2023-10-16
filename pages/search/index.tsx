import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultText } from "@components/common/DefaultText";
import { HeaderBackButton } from "@components/common/HeaderBackButton";
import BackIcon from "@components/icons/common/close";
import { HotKeywordTagButton } from "@components/pages/search/HotKeywordTagButton";
import { RecentKeywordButton } from "@components/pages/search/RecentKeywordButton";
import styled from "@emotion/styled";
import { useSearchKeyword } from "@hooks/useSearchKeyword";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Color } from "styles/Color";
import ScrollContainer from "react-indiana-drag-scroll";

const mockHotkeywordData = [
  { id: 1, name: "강북구 맛집" },
  { id: 2, name: "마라탕" },
  { id: 3, name: "탕후루" },
  { id: 4, name: "삽겹살" },
  { id: 5, name: "술집" },
  { id: 6, name: "맛집1" },
  { id: 7, name: "맛집2" },
  { id: 8, name: "맛집3" },
  { id: 9, name: "맛집4" },
  { id: 10, name: "맛집5" },
  { id: 11, name: "맛집6" },
  { id: 12, name: "맛7" },
];

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

const Contents = styled.div`
  padding: 35px;
  gap: 50px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HotKeywordSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const RecentKeywordSection = styled.section`
  width: 100%;
  #recent-keyword-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  #recent-keyword-list {
    margin-top: 30px;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
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

  const onClickKeyword = useCallback(
    (keyword: string) => {
      updateKeywords(keyword);
      router.push(`/search/${keyword}`);
    },
    [router, updateKeywords]
  );

  const onClickBackBtn = () => {
    router.back();
  };

  const onClickIndividualRemoveBtn = useCallback(
    (keyword: string) => {
      const updatedKeywords = [...(recentKeywords ?? [])].filter(
        (value) => value !== keyword
      );
      setRecentKeywords?.(updatedKeywords);
    },
    [recentKeywords, setRecentKeywords]
  );

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
        leftArea={<HeaderBackButton />}
        centerArea={<HeaderCenterArea />}
      />
      <Contents>
        <HotKeywordSection>
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
            {mockHotkeywordData.map((value) => (
              <div key={value.id} onClick={() => onClickKeyword(value.name)}>
                <HotKeywordTagButton key={value.id} text={value.name} />
              </div>
            ))}
          </ScrollContainer>
        </HotKeywordSection>
        <RecentKeywordSection>
          {recentKeywords ?? [].length > 0 ? (
            <>
              <div id="recent-keyword-header">
                <DefaultText text="최근 검색" size={15} weight={700} />
                <DefaultText
                  text="전체 삭제"
                  size={15}
                  weight={500}
                  style={{
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                  onClick={resetRecentKeywords}
                />
              </div>
              <div id="recent-keyword-list">
                {recentKeywords?.map((value, index) => (
                  <RecentKeywordButton
                    key={value + index}
                    keyword={value}
                    onClickKeyword={onClickKeyword}
                    onClickDeleteBtn={onClickIndividualRemoveBtn}
                  />
                ))}
              </div>
            </>
          ) : null}
        </RecentKeywordSection>
      </Contents>
    </Container>
  );
};

export default SearchPage;
