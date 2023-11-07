import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  text-align: left;
  padding: 5px 0;
  width: 100%;
  height: auto;
  background-color: #fff;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px 14px;
  width: 100%;
  color: #4f4a43;
`;

const AddressText = styled.div`
  color: #bbb;
  font-size: 14px;
`;

const Keyword = styled.span`
  color: orange;
`;

const NotResult = styled.div`
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #bbb;
`;
interface SearchBoxProps {
  resultList: kakao.maps.services.PlacesSearchResult | null;
  keyword: string;
  handleClickPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

const highlightKeyword = (text: string, keyword: string) => {
  // gi: 소문자, 대문자 구분 없이 키워드 찾기
  const keywordRegExp = new RegExp(keyword, "gi");

  return keywordRegExp.test(text)
    ? text
        .split(keywordRegExp)
        .map((part, index) =>
          index % 2 === 0 ? (
            <span key={part + index}>{part}</span>
          ) : (
            <Keyword key={part + index}>{keyword.toLocaleUpperCase()}</Keyword>
          )
        )
    : text;
};

const SearchBox = ({ resultList, keyword, handleClickPlace }: SearchBoxProps) =>
  keyword ? (
    <Wrapper id="search-box">
      {resultList?.length ? (
        resultList.map((place) => {
          const { address_name: address, place_name: placeName, id } = place;

          return (
            <TextBox key={id} onClick={() => handleClickPlace(place)}>
              <div>{highlightKeyword(placeName, keyword)}</div>
              <AddressText>{highlightKeyword(address, keyword)}</AddressText>
            </TextBox>
          );
        })
      ) : (
        <NotResult>검색 결과가 없습니다.</NotResult>
      )}
    </Wrapper>
  ) : null;

export default SearchBox;
