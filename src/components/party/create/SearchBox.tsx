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

interface SearchBoxProps {
  resultList: kakao.maps.services.PlacesSearchResult | null;
  keyword: string;
  handleClickPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

const SearchBox = ({ resultList, keyword, handleClickPlace }: SearchBoxProps) =>
  resultList && keyword ? (
    <Wrapper id="search-box">
      {resultList.map((place) => {
        const { address_name: address, place_name: placeName, id } = place;
        // gi: 소문자, 대문자 구분 없이 키워드 찾기
        const keywordRegExp = new RegExp(keyword, "gi");

        return (
          <TextBox key={id} onClick={() => handleClickPlace(place)}>
            {keywordRegExp.test(placeName) ? (
              <div>
                {placeName.split(keywordRegExp)[0]}
                <Keyword style={{ color: "orange" }}>
                  {keyword.toLocaleUpperCase()}
                </Keyword>
                {placeName.split(keywordRegExp)[1]}
              </div>
            ) : (
              placeName
            )}
            {keywordRegExp.test(address) ? (
              <AddressText>
                {address.split(keywordRegExp)[0]}
                <Keyword style={{ color: "orange" }}>
                  {keyword.toLocaleUpperCase()}
                </Keyword>
                {address.split(keywordRegExp)[1]}
              </AddressText>
            ) : (
              address
            )}
          </TextBox>
        );
      })}
    </Wrapper>
  ) : null;

export default SearchBox;
