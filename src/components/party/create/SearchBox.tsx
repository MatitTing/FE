import TextInput from '@components/common/TextInput';
import styled from '@emotion/styled';
import usePlaceSearch from '@hooks/usePlaceSearch';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 37.5px;
    left: 0;
    z-index: 99;
    text-align: left;
    padding: 5px 0;
    width: 100%;
    height: auto;
    background-color: #fff;
`;
const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ddd;
    background-color: #f9f9f9;
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

const SearchBox = () => {
    const { keyword, places, handleChangeSearchBox, handleClickPlace, reset } = usePlaceSearch();

    return (
        <>
            <InputContainer>
                <TextInput
                    placeholder="장소 이름이나 주소를 검색해주세요."
                    maxLength={20}
                    name="search"
                    value={keyword}
                    onChange={handleChangeSearchBox}
                />
                <div>
                    <HighlightOffIcon style={{ fill: '#bbb', fontSize: '20px' }} onClick={reset} />
                </div>
            </InputContainer>
            {places && keyword ? (
                <List id="search-box">
                    {places?.length ? (
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
            ) : null}
        </>
    );
};

export default SearchBox;
