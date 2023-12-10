import { ObserverTrigger } from "@components/hoc/ObserverTrigger";
import styled from "@emotion/styled";
import { FC } from "react";
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
  overflow-y: scroll;
  overflow-x: hidden;
  align-items: center;
  padding: 0 15px 60px 15px;
`;

export const HomeList: FC<HomeListProps> = ({
  data,
  onObserve,
  onClickPartyCard,
}) => {
  return (
    <Container>
      {data && data.length !== 0 && (
        <ObserverTrigger onObserve={onObserve} observerMinHeight={"30px"}>
          {data.map((item) =>
            item.partyList.map((party) => (
              <PartyCard
                key={party.partyId}
                partyData={party}
                onClickPartyCard={onClickPartyCard}
              />
            ))
          )}
        </ObserverTrigger>
      )}
    </Container>
  );
};
