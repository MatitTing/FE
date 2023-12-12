import { DefaultHeader } from "@components/common/DefaultHeader";
import { DefaultModalContainer } from "@components/common/DefaultModalContainer";
import { DefaultText } from "@components/common/DefaultText";
import SearchIcon from "@components/icons/bottombar/Search.icon";
import { ArrowIcon } from "@components/icons/header/Arrow.icon";
import { NotificationIcon } from "@components/icons/header/Notification.icon";
import { HomeList } from "@components/pages/home/HomeList";
import { BottomUpPopup } from "@components/popup/BottomUpPopup";
import styled from "@emotion/styled";
import { useGpsPosition } from "@hooks/useGpsPosition";
import useToast from "@hooks/useToast";
import { Transition } from "@mantine/core";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import getLocationAddress, {
  API_GET_LOCATION_ADDRESS_KEY,
} from "src/api/getLocationAddress";
import getMainPageData, { API_GET_MAIN_PAGE } from "src/api/getPartyMainPage";
import {
  PositionDataType,
  PositionSate,
} from "src/recoil-states/positionStates";
import { Color } from "styles/Color";

interface HeaderCenterAreaProps {
  onClick: () => void;
  position: PositionDataType;
}
interface SettingPositionComponentProps {
  onClickCurrentPosition: () => void;
  onClickMapPosition: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
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

const HeaderCenterArea = ({ onClick, position }: HeaderCenterAreaProps) => {
  return (
    <HeaderAreaContainer onClick={onClick}>
      <DefaultText size={15} text={String(position?.address || "")} />
      <ArrowIcon
        styles={{
          marginTop: "-1px",
        }}
      />
    </HeaderAreaContainer>
  );
};

const SettingPositionComponent = ({
  onClickCurrentPosition,
  onClickMapPosition,
}: SettingPositionComponentProps) => {
  return (
    <PositionTextContainer>
      <DefaultText
        text="현재 위치로 지정"
        size={15}
        style={{
          cursor: "pointer",
        }}
        onClick={onClickCurrentPosition}
      />
      <Link href={"/location-setting"}>
        <DefaultText
          text="지도에서 위치 지정"
          size={15}
          style={{
            cursor: "pointer",
          }}
          onClick={onClickMapPosition}
        />
      </Link>
    </PositionTextContainer>
  );
};

const HeaderRightArea = () => {
  return (
    <HeaderAreaContainer>
      <Link href={"/search"}>
        <SearchIcon />
      </Link>
      <Link href={"/notification"}>
        <NotificationIcon
          notificationCount={0}
          styles={{
            marginTop: "-5px",
          }}
        />
      </Link>
    </HeaderAreaContainer>
  );
};
const Home: NextPage = () => {
  const router = useRouter();
  const [position, setPosition] = useRecoilState(PositionSate);
  const [isClickPosition, setIsClickPosition] = useState(false);
  const [isResetPosition, setIsResetPosition] = useState(false);
  const { location } = useGpsPosition();
  const { data: addressData } = useQuery({
    queryKey: [
      API_GET_LOCATION_ADDRESS_KEY,
      { latitude: position.coords.x, longitude: position.coords.y },
    ],
    queryFn: () =>
      getLocationAddress({
        latitude: position.coords.x,
        longitude: position.coords.y,
        kakaoRestApiKey: String(process.env.KAKAO_RESTAPI_KEY),
      }),
    enabled: !!position.coords.x,
  });

  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    queryKey: [API_GET_MAIN_PAGE],
    queryFn: ({ pageParam = 0 }) =>
      getMainPageData({
        latitude: position.coords.x,
        longitude: position.coords.y,
        lastPartyId: pageParam,
        size: 5,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.pageInfo.lastPartyId,
    enabled: !!position.coords.x,
  });

  const onClickPosition = () => {
    setIsClickPosition(true);
  };

  const onClickCurrentPosition = () => {
    setIsResetPosition(true);
    setIsClickPosition(false);
  };
  const onClickMapPosition = () => {
    setIsClickPosition(false);
  };

  const onObserve = () => {
    if (hasNextPage) fetchNextPage();
  };

  console.log(location, "로케이션!");
  useEffect(() => {
    if (!position.coords.x || isResetPosition)
      setPosition((prev) => ({
        ...prev,
        coords: {
          x: location?.latitude || 0,
          y: location?.longitude || 0,
        },
      }));
  }, [
    isResetPosition,
    location?.latitude,
    location?.longitude,
    position.coords.x,
    setPosition,
  ]);

  useEffect(
    function setAddress() {
      if (!position.coords.x || !position.coords.y) {
        return;
      }
      const address = addressData?.documents[0].address;
      if (!address) {
        return;
      }
      setPosition((prev) => ({
        ...prev,
        address: `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`,
      }));
    },
    [addressData?.documents, position.coords.x, position.coords.y, setPosition]
  );

  const onClickPartyCard = (id: number) => {
    router.push(`/partydetail/${id}`);
  };

  return (
    <Container>
      <DefaultHeader
        centerArea={
          <HeaderCenterArea onClick={onClickPosition} position={position} />
        }
        rightArea={<HeaderRightArea />}
      />
      <HomeList
        data={data?.pages}
        onObserve={onObserve}
        onClickPartyCard={onClickPartyCard}
      />
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
              <SettingPositionComponent
                onClickCurrentPosition={onClickCurrentPosition}
                onClickMapPosition={onClickMapPosition}
              />
            </BottomUpPopup>
          </DefaultModalContainer>
        )}
      </Transition>
    </Container>
  );
};

export default Home;
