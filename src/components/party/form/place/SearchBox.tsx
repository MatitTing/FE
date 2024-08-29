import styled from '@emotion/styled';
import { NewColor } from 'styles/Color';
import { KakaoPlacesSearchResult } from 'types/party/place/map';

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 100%;
    z-index: 9999;
    text-align: left;
    padding: 5px 0;
    width: 100%;
    height: auto;
    background-color: #fff;
    border: 1px solid ${NewColor.border};
    border-top: none;
    border-radius: 5px;
`;

const ListItem = styled.div`
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

const highlightKeyword = (text: string, keyword: string) => {
    // gi: 소문자, 대문자 구분 없이 키워드 찾기
    const keywordRegExp = new RegExp(keyword, 'gi');

    return keywordRegExp.test(text)
        ? text
              .split(keywordRegExp)
              .map((part, index) =>
                  index % 2 === 0 ? (
                      <span key={part + index}>{part}</span>
                  ) : (
                      <Keyword key={part + index}>{keyword.toLocaleUpperCase()}</Keyword>
                  ),
              )
        : text;
};

interface SearchBoxProps {
    places: KakaoPlacesSearchResult | null;
    keyword: string;
    handleClickPlace: ({ x, y, place_name }: kakao.maps.services.PlacesSearchResultItem) => void;
}

const SearchBox = ({ places, keyword, handleClickPlace }: SearchBoxProps) => (
    <List id="search-box">
        {places ? (
            places.map((place) => {
                const { address_name: address, place_name: placeName, id } = place;

                return (
                    <ListItem key={id} onClick={() => handleClickPlace(place)}>
                        <div>{highlightKeyword(placeName, keyword)}</div>
                        <AddressText>{highlightKeyword(address, keyword)}</AddressText>
                    </ListItem>
                );
            })
        ) : (
            <NotResult>검색 결과가 없습니다.</NotResult>
        )}
    </List>
);

export default SearchBox;
