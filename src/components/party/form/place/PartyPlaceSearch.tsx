import styled from '@emotion/styled';
import usePlaceSearch from '@hooks/usePlaceSearch';
import { NewColor } from 'styles/Color';
import SearchBox from './SearchBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextInput from '@components/common/TextInput';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: fit-content;
    margin-bottom: 8px;
`;

const Reset = styled(HighlightOffIcon)`
    position: absolute;
    fill: ${NewColor.border};
    right: 0;
    top: 50%;
    transform: translate(-20%, -50%);
    font-size: 16px;
    cursor: pointer;
`;

const PartyPlaceSearch = () => {
    const { keyword, places, handleChangeSearchBox, handleClickPlace, reset } = usePlaceSearch();

    return (
        <Container>
            <TextInput
                value={keyword}
                placeholder="식당 이름이나 주소를 검색하세요."
                maxLength={20}
                onChange={handleChangeSearchBox}
            />
            {keyword ? (
                <>
                    <Reset onClick={reset} />
                    <SearchBox
                        places={places || null}
                        keyword={keyword}
                        handleClickPlace={handleClickPlace}
                    />
                </>
            ) : null}
        </Container>
    );
};

export default PartyPlaceSearch;
