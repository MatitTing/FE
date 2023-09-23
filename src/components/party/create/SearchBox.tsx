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

interface SearchBoxProps {
  resultList: kakao.maps.services.PlacesSearchResult | null;
  keyword: string;
  handleClickPlace: (
    place: kakao.maps.services.PlacesSearchResultItem
  ) => void;
}

const SearchBox = ({
  resultList,
  keyword,
  handleClickPlace,
}: SearchBoxProps) =>
  resultList && keyword ? (
    <Wrapper id="search-box">
      {resultList.map((place) => {
        const {
          address_name: address,
          place_name: placeName,
          id,
        } = place;

        const addressElement = address.replace(
          new RegExp(keyword, "gi"),
          `<span style="color: orange;">${keyword}</span>`
        );

        const placeNameElement = placeName.replace(
          new RegExp(keyword, "gi"),
          `<span style="color: orange;">${keyword}</span>`
        );
        return (
          <TextBox
            key={id}
            onClick={() => handleClickPlace(place)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: placeNameElement.toLowerCase(),
              }}
            />
            <AddressText
              dangerouslySetInnerHTML={{
                __html: addressElement.toLowerCase(),
              }}
            />
          </TextBox>
        );
      })}
    </Wrapper>
  ) : null;

export default SearchBox;
