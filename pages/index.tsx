import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultModalContainer } from "@components/common/DefaultModalContainer";
import { DefaultText } from "@components/common/DefaultText";
import SearchIcon from "@components/icons/bottombar/Search.icon";
import { ArrowIcon } from "@components/icons/header/Arrow.icon";
import { NotificationIcon } from "@components/icons/header/Notification.icon";
import { HomeList } from "@components/pages/home/HomeList";
import { BottomUpPopup } from "@components/popup/BottomUpPopup";
import styled from "@emotion/styled";
import { useGetLocationAddressMutation } from "@hooks/react-query/useGetCurrentAddressMutation";
import useToast from "@hooks/useToast";
import { Transition } from "@mantine/core";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  PositionDataType,
  PositionSate,
} from "src/recoil-states/positionStates";
import { Color } from "styles/Color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
  gap: 50px;
  width: 100%;
  max-width: 768px;
  background: ${Color.VeryLightGrey};
  display: flex;
  flex-direction: column;
`;

const HeaderAreaContainer = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const PositionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { mutateAsync: getAddress } = useGetLocationAddressMutation();
  const [position, setPosition] = useRecoilState(PositionSate);
  const [location, setLocation] = useState<PositionDataType>();
  const [isClickPosition, setIsClickPosition] = useState(false);
  const [isResetPosition, setIsResetPosition] = useState(false);

  const centerArea = () => {
    return (
      <HeaderAreaContainer onClick={() => setIsClickPosition(true)}>
        <DefaultText size={15} text={String(location?.address || "")} />
        <ArrowIcon
          styles={{
            marginTop: "-1px",
          }}
        />
      </HeaderAreaContainer>
    );
  };

  const rightArea = () => {
    return (
      <HeaderAreaContainer>
        <Link href={"/search"}>
          <a>
            <SearchIcon />
          </a>
        </Link>
        <Link href={"/notification"}>
          <a>
            <NotificationIcon
              notificationCount={0}
              styles={{
                marginTop: "-5px",
              }}
            />
          </a>
        </Link>
      </HeaderAreaContainer>
    );
  };

  const SettingPositionComponent = () => {
    return (
      <PositionTextContainer>
        <DefaultText
          text="현재 위치로 지정"
          size={15}
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setIsResetPosition(true);
            setIsClickPosition(false);
          }}
        />
        <Link href={"/location-setting"}>
          <a>
            <DefaultText
              text="지도에서 위치 지정"
              size={15}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setIsClickPosition(false);
              }}
            />
          </a>
        </Link>
      </PositionTextContainer>
    );
  };

  useEffect(() => {
    setLocation(position);
  }, [position]);

  useEffect(() => {
    // 가져오기 성공
    function getSuccess(position: {
      coords: {
        latitude: number;
        longitude: number;
      };
    }) {
      // 위도
      const lat = position.coords.latitude;
      // 경도
      const lng = position.coords.longitude;
      setPosition({
        coords: {
          x: lat,
          y: lng,
        },
      });
    }

    // 가지오기 실패(거부)
    function getError() {
      showToast("위치 정보를 찾을 수 없습니다. 위치 설정을 확인해 주세요!");
    }
    if (position.coords.x === 0 || position.coords.y === 0 || isResetPosition) {
      navigator.geolocation.getCurrentPosition(getSuccess, getError);
    }
  }, [
    isResetPosition,
    position.coords.x,
    position.coords.y,
    setPosition,
    showToast,
  ]);

  useEffect(() => {
    if (position.coords.x !== 0 && position.coords.y !== 0) {
      getAddress({
        latitude: position.coords.x,
        longitude: position.coords.y,
        kakaoRestApiKey: String(process.env.KAKAO_RESTAPI_KEY),
      }).then((data) => {
        const address = data.documents[0].address;

        setPosition((prev) => ({
          ...prev,
          address: `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`,
        }));
      });
    }
  }, [getAddress, position.coords.x, position.coords.y, setPosition]);

  return (
    <Container>
      <DefaultHeader centerArea={centerArea()} rightArea={rightArea()} />
      <HomeList />
      {/* 현재 위치 재설정 맵 팝업.*/}
      <Transition
        transition={`slide-up`}
        mounted={isClickPosition ?? false}
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <DefaultModalContainer style={styles}>
            <BottomUpPopup setIsOpenModal={setIsClickPosition}>
              <SettingPositionComponent />
            </BottomUpPopup>
          </DefaultModalContainer>
        )}
      </Transition>
    </Container>
  );
};

export default Home;
