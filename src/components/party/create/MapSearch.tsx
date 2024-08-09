import styled from '@emotion/styled';
import KakaoMap from '@components/common/Map';
import { MapMarker } from 'react-kakao-maps-sdk';
import SearchBox from './SearchBox';
import { useWatch } from 'react-hook-form';

const Wrapper = styled.div`
    position: relative;
    height: 250px;
    overflow: hidden;
    text-align: center;
    background-color: #aaa;
`;

const MarkerText = styled.div`
    padding: 3px 5px;
`;

const MapSearch = () => {
    const { partyPlaceName, latitude: lat, longitude: lng } = useWatch();
    const position = { lat, lng };

    return (
        <Wrapper>
            <SearchBox />
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
        </Wrapper>
    );
};

export default MapSearch;
