import styled from "@emotion/styled";
import { RefObject } from "react";

interface CenterProps {
  inputRef: RefObject<HTMLInputElement>;
  searchKeyword: (event: React.KeyboardEvent) => void;
}

const SearchInputContainer = styled.div`
  width: 100%;
  max-width: 658px;
  margin-top: -8px;
  input {
    width: 100%;
    height: 30px;
  }
`;

const Center = ({ inputRef, searchKeyword }: CenterProps) => {
  return (
    <SearchInputContainer>
      <input
        placeholder="검색어를 입력해 주세요."
        defaultValue={inputRef.current?.value}
        ref={inputRef}
        onKeyUp={searchKeyword}
      />
    </SearchInputContainer>
  );
};

const SearchHeader = {
  Center,
};

export default SearchHeader;
