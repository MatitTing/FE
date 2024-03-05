import styled from "@emotion/styled";
import { RefObject, forwardRef } from "react";

interface CenterProps {
  searchKeyword: (event: React.KeyboardEvent) => void;
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

const Center = forwardRef<HTMLInputElement, CenterProps>(
  ({ searchKeyword }, ref) => {
    return (
      <SearchInputContainer>
        <input
          placeholder="검색어를 입력해 주세요."
          ref={ref}
          onKeyUp={searchKeyword}
        />
      </SearchInputContainer>
    );
  }
);

const SearchHeader = {
  Center,
};

Center.displayName = "SearchHeader.Center";

export default SearchHeader;
