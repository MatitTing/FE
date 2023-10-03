import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultText } from "@components/common/DefaultText";
import { MapCurrentPositionIcon } from "@components/icons/map/MapCurrentPositon.icon";
import styled from "@emotion/styled";
import { useGetLocationAddressMutation } from "@hooks/react-query/useGetCurrentAddressMutation";
import { useGetLocationWithKeywordMutation } from "@hooks/react-query/useGetLocationWithKeywordMutation";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useDebounce } from "react-use";
import { useRecoilState } from "recoil";
import {
  PositionDataType,
  PositionSate,
} from "src/recoil-states/positionStates";
import { ColorToken } from "styles/Color";
import { Typography } from "styles/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  #go-back,
  #position-setting {
    cursor: pointer;
  }
`;

const MapSection = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`;
const SearchSection = styled.section`
  width: 100%;
  max-width: 768px;
  margin: 15px auto 0px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 13px;
  input {
    all: unset;
    width: 100%;
    height: 20px;
  }
`;

const InvalidMessage = styled.div`
  position: relative;
  ${Typography.Body.Body3Regular}
  color:${ColorToken.danger};
`;

const LocationSettingPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: getAddress } = useGetLocationAddressMutation();
  const { mutateAsync: getAddressWithKeyword } =
    useGetLocationWithKeywordMutation();
  const [position, setPosition] = useRecoilState(PositionSate);
  const [mapPosition, setMapPosition] = useState<PositionDataType>();
  const [isKeywordError, setIsKeywordError] = useState(false);

  const clickGoBackButton = () => {
    router.back();
  };
  const clickPositionSettingButton = () => {
    if (!mapPosition) {
      return;
    }
    setPosition(mapPosition);
    router.push("/");
  };

  // 저장된 키 이후, 사용자 엔터 입력 시, 카카오 서버 측에 해당 키워드 기반 위치 정보 요청.
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getAddressWithKeyword({
        keyword: inputRef.current?.value || "",
        kakaoRestApiKey: process.env.KAKAO_RESTAPI_KEY || "",
      }).then((locationData) => {
        // 예외 처리로 분기 처리. 검색 키워드가 카카오 db 정보에 있는 경우만 요청.
        if (locationData.meta.total_count !== 0) {
          setMapPosition({
            coords: {
              x: Number(locationData.documents[0].y),
              y: Number(locationData.documents[0].x),
            },
            address: locationData.documents[0].address_name,
          });
          setIsKeywordError(false);
        }
        // 카카오 정보에 없는 경우 사용자에게 주지 시키는 알러트!
        else {
          setIsKeywordError(true);
        }
      });
    }
  };

  // 최초 멥 마운트 시,포지션 업데이트.
  useEffect(() => {
    setMapPosition(position);
  }, [position]);

  // 맵 디바운싱 처리 추가.
  useDebounce(
    () => {
      if (!mapPosition) {
        return;
      }
      if (mapPosition.coords.x !== 0 && mapPosition.coords.y !== 0) {
        getAddress({
          latitude: mapPosition.coords.x || 0,
          longitude: mapPosition.coords.y || 0,
          kakaoRestApiKey: String(process.env.KAKAO_RESTAPI_KEY),
        }).then((data) => {
          if (!data.documents[0]) {
            return;
          }
          const address = data.documents[0].address;
          setMapPosition((prev) => {
            if (!prev) {
              return;
            }
            return {
              ...prev,
              address: `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`,
            };
          });
        });
      }
    },
    500,
    [mapPosition?.coords.x, mapPosition?.coords.y]
  );

  return (
    <Container>
      <DefaultHeader
        leftArea={
          <div id="go-back" onClick={clickGoBackButton}>
            뒤로가기
          </div>
        }
        rightArea={
          <div id="position-setting" onClick={clickPositionSettingButton}>
            위치지정
          </div>
        }
      />
      <SearchSection>
        <div className="position-text">
          <DefaultText text={String(mapPosition?.address || "")} size={15} />
        </div>
        <Divider />
        <div className="serach-input">
          <input
            placeholder="지역명, 대학, 역명으로 검색하세요."
            name="search-position"
            defaultValue=""
            onKeyUp={handleKeyPress}
            ref={inputRef}
          />
        </div>
        {isKeywordError && (
          <InvalidMessage>{"올바른 검색어로 입력해 주세요."}</InvalidMessage>
        )}
      </SearchSection>
      <MapSection>
        <Map
          center={{
            lat: mapPosition?.coords.x || 0,
            lng: mapPosition?.coords.y || 0,
          }}
          style={{
            width: "100%",
            maxWidth: "768px",
            margin: "30px auto 0 auto",
            height: "100%",
          }}
          maxLevel={5}
          minLevel={3}
          onCenterChanged={(map) =>
            setMapPosition((prev) => ({
              ...prev,
              coords: {
                x: map.getCenter().getLat(),
                y: map.getCenter().getLng(),
              },
            }))
          }
        >
          <MapMarker
            position={{
              lat: position.coords.x,
              lng: position.coords.y,
            }}
          />

          <div
            style={{
              width: 24,
              height: 24,
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(50%,-50%)",
              zIndex: "9999",
            }}
          >
            <MapCurrentPositionIcon />
          </div>
        </Map>
      </MapSection>
    </Container>
  );
};

export default LocationSettingPage;
