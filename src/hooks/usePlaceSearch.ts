import { ChangeEvent, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { KakaoPlacesSearchResult } from 'types/party/place/map';

const usePlaceSearch = () => {
    const { setValue } = useFormContext();
    const [keyword, setKeyword] = useState<string>();
    const [places, setPlaces] = useState<KakaoPlacesSearchResult | null>();

    const reset = () => {
        setKeyword('');
        setPlaces(null);
    };

    const handleClickPlace = useCallback(
        ({ x, y, place_name }: kakao.maps.services.PlacesSearchResultItem) => {
            setValue('partyPlaceName', place_name);
            setValue('latitude', y);
            setValue('longitude', x);
            reset();
        },
        [setValue],
    );

    const handleChangeSearchBox = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setKeyword(e.target.value);
            const places = new kakao.maps.services.Places();

            places.keywordSearch(
                e.target.value,
                (data, status, _pagination) => {
                    const resultStatus = kakao.maps.services.Status;
                    if (status === resultStatus.ERROR) return;

                    if (status === resultStatus.ZERO_RESULT) return;

                    if (status === resultStatus.OK) {
                        return setPlaces(data);
                    }
                },
                {
                    category_group_code: 'FD6',
                    size: 8,
                },
            );
        },
        [setPlaces],
    );

    return {
        keyword,
        places,
        reset,
        handleChangeSearchBox,
        handleClickPlace,
    };
};

export default usePlaceSearch;
