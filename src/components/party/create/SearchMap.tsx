import styled from "@emotion/styled";
import TextInput from "@components/common/TextInput";
import KakaoMap from "@components/common/Map";
import { MapMarker } from "react-kakao-maps-sdk";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchBox from "./SearchBox";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const MapWrapper = styled.div`
  position: relative;
  height: 250px;
  text-align: center;
  background-color: #aaa;
`;

const MarkerText = styled.div`
  padding: 3px 5px;
`;

interface SearchMapProps {
  marker: Marker | null;
  setMap: Dispatch<SetStateAction<kakao.maps.Map | undefined>>;
  resultList: kakao.maps.services.PlacesSearchResult | null;
  keyword: string;
  reset: () => void;
  handleChangeSearchBox: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

const SearchMap = ({
  marker,
  setMap,
  keyword,
  resultList,
  reset,
  handleChangeSearchBox,
  handleClickPlace,
}: SearchMapProps) => {
  return (
    <>
      <SearchWrapper>
        <TextInput
          placeholder="장소 이름이나 주소를 검색해주세요."
          maxLength={20}
          value={keyword}
          name="search"
          onChange={handleChangeSearchBox}
        />
        <div onClick={reset}>
          <HighlightOffIcon style={{ fill: "#bbb", fontSize: "20px" }} />
        </div>
      </SearchWrapper>
      <MapWrapper>
        <SearchBox
          resultList={resultList}
          keyword={keyword}
          handleClickPlace={handleClickPlace}
        />
        <KakaoMap
          center={{ lat: 33.450701, lng: 126.570667 }} //현재 위치 가져와서 세팅하기 또는 시청 좌표
          onCreate={setMap}
        >
          {marker ? (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
            >
              <MarkerText>{marker.content}</MarkerText>
            </MapMarker>
          ) : null}
        </KakaoMap>
      </MapWrapper>
    </>
  );
};

export default SearchMap;
