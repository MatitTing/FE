import styled from '@emotion/styled';
import { useSearchKeyword } from '@hooks/useSearchKeyword';
import { useRouter } from 'next/router';
import { FC, RefObject, forwardRef } from 'react';
import { useSearchParam } from 'react-use';
import { useRecoilValue } from 'recoil';
import { recentKeywordStates } from 'src/recoil-states/recentKeywordStates';

interface CenterProps {}

const SearchInputContainer = styled.div`
    width: 100%;
    max-width: 668px;
    margin-top: -8px;
    input {
        width: 100%;
        height: 30px;
    }
`;

const Center: FC = () => {
    const { searchKeyword, inputRef } = useSearchKeyword();
    const { query } = useRouter();
    const { keyword } = query;
    return (
        <SearchInputContainer>
            <input
                placeholder="검색어를 입력해 주세요."
                ref={inputRef}
                defaultValue={keyword}
                onKeyUp={searchKeyword}
            />
        </SearchInputContainer>
    );
};

const SearchHeader = {
    Center,
};

export default SearchHeader;
