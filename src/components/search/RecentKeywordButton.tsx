import { DefaultText } from "@components/common/DefaultText";
import { TimeMachineIcon } from "@components/icons/common/TimeMachine.icon";
import styled from "@emotion/styled";
import { FC, useCallback } from "react";

interface RecentKeywordButtonProps {
  keyword: string;
  onClickKeyword: React.MouseEventHandler<HTMLDivElement>;
  onClickDeleteBtn: (keyword: string) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  #keyword-area {
    display: flex;
    gap: 15px;
    align-items: center;
    cursor: pointer;
  }
  #keyword-deletebtn-area {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const RecentKeywordButton: FC<RecentKeywordButtonProps> = ({
  keyword,
  onClickKeyword,
  onClickDeleteBtn,
}) => {
  return (
    <Container>
      <div id="keyword-area">
        <TimeMachineIcon />
        <DefaultText text={keyword} size={15} onClick={onClickKeyword} />
      </div>
      <div id="keyword-deletebtn-area">
        <DefaultText
          text="삭제"
          size={15}
          onClick={() => onClickDeleteBtn(keyword)}
        />
      </div>
    </Container>
  );
};
