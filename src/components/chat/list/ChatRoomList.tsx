import styled from '@emotion/styled';
import router from 'next/router';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import { useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import getChatRooms, { API_GET_CHAT_ROOMS_KEY } from 'src/api/getChatRooms';
import { ObserverTrigger } from '@components/hoc/ObserverTrigger';
import getSearchChatRooms, { API_GET_SEARCH_CHAT_ROOMS_KEY } from 'src/api/getSearchChatRooms';
import { useState } from 'react';
import ChatRoomItem from './ChatRoomItem';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { NewColor } from 'styles/Color';

const Wrapper = styled.div`
    padding: 2rem;
`;

const SearchhForm = styled.form`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    height: 34px;
    border-radius: 25px;
    border: 1px solid ${NewColor.border};
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    height: 100%;
    width: 100%;
    color: ${NewColor.text_secondary};
`;

const SearchButton = styled(SearchIcon)`
    color: ${NewColor.text_secondary};
    cursor: pointer;
`;

const CloseButton = styled(CloseIcon)`
    color: ${NewColor.text_secondary};
    cursor: pointer;
`;

const RoomList = styled.ul`
    padding: 1rem 0;
    margin: 0 auto;
    list-style: none;
    height: 100%;
`;

const ChatListPage: NextPage = () => {
    const queryClient = useQueryClient();
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const { register, getValues, setValue, handleSubmit } = useForm<{ searchText: string }>();
    const { fetchNextPage, hasNextPage, data } = useSuspenseInfiniteQuery({
        queryKey: [API_GET_CHAT_ROOMS_KEY],
        queryFn: ({ pageParam = 0 }) => getChatRooms(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.pageInfo.hasNext) return lastPage.pageInfo.page + 1;
        },
    });

    const { data: searchData } = useSuspenseInfiniteQuery({
        queryKey: [API_GET_SEARCH_CHAT_ROOMS_KEY, getValues('searchText')],
        queryFn: ({ pageParam = 0 }) =>
            getValues('searchText')?.length
                ? getSearchChatRooms({ title: getValues('searchText'), page: pageParam })
                : null,
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage?.pageInfo.hasNext ? lastPage?.pageInfo.page + 1 : null,
    });

    const handleClickReset = () => {
        setIsSearch(false);
        setValue('searchText', '');
    };

    const onSearch = async () => {
        setIsSearch(true);

        await queryClient.invalidateQueries({
            queryKey: [API_GET_SEARCH_CHAT_ROOMS_KEY, getValues('searchText')],
        });
    };

    const handleClickRouteRoom = (roomId: number) => router.push(`/chat/${roomId}`);

    const chatRooms = data.pages.map((page) => page.responseChatRoomDtoList).flat();
    const searchRooms = searchData.pages
        .map((page) => (page ? page?.responseChatRoomDtoList : []))
        .flat();
    const onObserve = () => hasNextPage && fetchNextPage();

    return (
        <Wrapper>
            <SearchhForm onSubmit={handleSubmit(onSearch)}>
                <SearchInput {...register('searchText')} />
                {isSearch ? (
                    <CloseButton onClick={handleClickReset} />
                ) : (
                    <SearchButton type="submit" />
                )}
            </SearchhForm>
            <RoomList>
                <ObserverTrigger onObserve={onObserve} observerMinHeight={'30px'}>
                    <ChatRoomItem
                        list={isSearch && searchRooms ? searchRooms : chatRooms}
                        noListText={
                            isSearch
                                ? '해당 채팅방이 존재하지 않습니다.'
                                : `채팅방이 존재하지 않습니다. \n 파티에 참여해보세요!`
                        }
                        onClickRouteRoom={handleClickRouteRoom}
                    />
                </ObserverTrigger>
            </RoomList>
        </Wrapper>
    );
};

export default ChatListPage;

export const displayTime = (time: string) => {
    const lastMessageTime = dayjs(time).format('YYYY.MM.DD');
    const currentTime = dayjs().format('YYYY.MM.DD');

    if (lastMessageTime === currentTime) {
        return dayjs(time).format('HH:mm');
    }

    return dayjs(time).format('YYYY.MM.DD');
};
