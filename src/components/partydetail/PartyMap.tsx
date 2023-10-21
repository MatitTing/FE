import styled from "@emotion/styled";
import { Map, MapMarker } from "react-kakao-maps-sdk";
interface PositionDataType {
  coords: {
    x: number;
    y: number;
  };
  address?: string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  justify-content: center;
  align-items: center;
  z-index: 8;
`;

const PartyMap = (position: PositionDataType) => {
  return (
    <Container>
      <Map
        center={{ lat: position.coords.x, lng: position.coords.y }}
        style={{ width: "100%", height: "400px", borderRadius: "20px" }}
      >
        <MapMarker
          position={{ lat: position.coords.x, lng: position.coords.y }}
        />
      </Map>
    </Container>
  );
};

export default PartyMap;
