import { Dispatch, ReactNode, SetStateAction } from "react";
import { Map } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  center: MapCoordinatet;
  children?: ReactNode;
  zoom?: number;
  onCreate?: Dispatch<
    SetStateAction<kakao.maps.Map | undefined>
  >;
}

const KakaoMap = ({
  center,
  zoom = 3,
  children,
  onCreate,
}: KakaoMapProps) => {
  return (
    <Map
      center={center}
      level={zoom}
      style={{ height: "100%" }}
      onCreate={onCreate}
    >
      {children}
    </Map>
  );
};

export default KakaoMap;
