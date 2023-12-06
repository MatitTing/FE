import Observer from "@components/common/Observer";
import styled from "@emotion/styled";
import { FC, MouseEventHandler } from "react";
import { Color } from "styles/Color";
import { MainPagePartyListResponse } from "types/main/MainPagePartyListResponse";
import { PartyCard } from "./PartyCard";

interface HomeListProps {
  data?: InfinitePaginationDataType<"partyList", MainPagePartyListResponse>[];
  onObserve: VoidFunction;
  onClickPartyCard: (id: number) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${Color.VeryLightGrey};
  padding-bottom: 60px;
  overflow-y: scroll;
  overflow-x: hidden;
  align-items: center;
`;

export const HomeList: FC<HomeListProps> = ({
  data,
  onObserve,
  onClickPartyCard,
}) => {
  return (
    <Container>
      {data && data.length !== 0 && (
        <>
          {data.map((item) =>
            item.partyList.map((party) => (
              <PartyCard
                key={party.partyId}
                partyData={party}
                onClickPartyCard={onClickPartyCard}
              />
            ))
          )}
          <Observer minHeight="30px" onObserve={onObserve} />
        </>
      )}
    </Container>
  );
};
