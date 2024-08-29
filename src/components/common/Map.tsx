import { ReactNode, memo } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { MapCoordinatet } from 'types/map';

interface KakaoMapProps {
    center: MapCoordinatet;
    children?: ReactNode;
    zoom?: number;
}

const KakaoMap = ({ center, zoom = 3, children }: KakaoMapProps) => (
    <Map center={{ lat: center.lat, lng: center.lng }} level={zoom} style={{ height: '100%' }}>
        {children}
    </Map>
);

export default memo(KakaoMap);
