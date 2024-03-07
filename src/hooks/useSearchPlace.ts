import { ChangeEvent, useCallback, useState } from "react";
import { Marker, Place } from "types/map";

const useSearchPlace = () => {
  const [marker, setMarker] = useState<Marker | null>(null);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [keyword, setKeyword] = useState("");
  const [resultList, setResultList] =
    useState<kakao.maps.services.PlacesSearchResult | null>(null);

  const reset = () => {
    setKeyword("");
    setMarker(null);
    setResultList(null);
  };

  const setPlace = useCallback(
    ({ lat, lng, placeName }: Place) => {
      if (!map) return;
      const bounds = new kakao.maps.LatLngBounds();
      bounds.extend(new kakao.maps.LatLng(lat, lng));
      setMarker({
        position: {
          lat: lat,
          lng: lng,
        },
        content: placeName,
      });

      map.setBounds(bounds);
    },
    [map]
  );

  const handleClickPlace = useCallback(
    ({
      x: lat,
      y: lng,
      place_name: placeName,
    }: kakao.maps.services.PlacesSearchResultItem) => {
      setKeyword(placeName);
      setResultList(null);
      setPlace({ lat: Number(lat), lng: Number(lng), placeName });
    },
    [setPlace]
  );

  const handleChangeSearchBox = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!map) return;
      const places = new kakao.maps.services.Places();

      setKeyword(e.target.value);

      places.keywordSearch(
        e.target.value,
        (data, status, _pagination) => {
          const resultStatus = kakao.maps.services.Status;
          if (status === resultStatus.ERROR) return;

          if (status === resultStatus.ZERO_RESULT) {
            return;
          }

          if (status === resultStatus.OK) {
            setResultList(data);
          }
        },
        {
          category_group_code: "FD6",
          size: 8,
        }
      );
    },
    [map]
  );

  return {
    marker,
    setMarker,
    map,
    setMap,
    resultList,
    setResultList,
    keyword,
    setKeyword,
    setPlace,
    reset,
    handleChangeSearchBox,
    handleClickPlace,
  };
};

export default useSearchPlace;
