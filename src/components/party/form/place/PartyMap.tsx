import styled from '@emotion/styled';
import KakaoMap from '@components/common/Map';
import { MapMarker } from 'react-kakao-maps-sdk';
import { useWatch } from 'react-hook-form';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 8px;
`;
const MapContainer = styled.div`
    height: 250px;
    border-radius: 5px;
    overflow: hidden;
`;

const MarkerText = styled.div`
    padding: 3px 5px;
`;

const PartyMap = () => {
    const { partyPlaceName, latitude: lat, longitude: lng } = useWatch();
    const position = { lat, lng };

    return (
        <Wrapper>
            <MapContainer>
                {lat ? (
                    <KakaoMap center={position}>
                        <MapMarker key={`position-${position}`} position={position}>
                            <MarkerText>{partyPlaceName}</MarkerText>
                        </MapMarker>
                    </KakaoMap>
                ) : (
                    <KakaoMap
                        center={{
                            lng: 126.570667,
                            lat: 33.450701,
                        }}
                    />
                )}
            </MapContainer>
        </Wrapper>
    );
};

export default PartyMap;
