import styled from "@emotion/styled";
import { useSearchKeyword } from "@hooks/useSearchKeyword";
import { FC, RefObject, forwardRef } from "react";

interface CenterProps {
}

const SearchInputContainer = styled.div`
  width: 100%;
  max-width: 668px;
  margin-top: -8px;
  input {
    width: 100%;
    height: 30px;
  }
`;

const Center:FC = 
  () => {
    const {
      searchKeyword,
      inputRef,
    } = useSearchKeyword();
    return (
      <SearchInputContainer>
        <input
          placeholder="검색어를 입력해 주세요."
          ref={inputRef}
          onKeyUp={searchKeyword}
        />
      </SearchInputContainer>
    );
  }


const SearchHeader = {
  Center,
};


export default SearchHeader;

