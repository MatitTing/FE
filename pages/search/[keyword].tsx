import { DefaultHeader } from '@components/common/DefaultHeader';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import { SearchResult } from '@components/search/SearchResult';
import SearchHeader from '@components/search/header';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Color } from 'styles/Color';
const QuerySuspenseErrorBoundary = dynamic(
    () => import('@components/hoc/QuerySuspenseErrorBoundary'),
);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-top: 45px;
    min-height: calc(100vh);
    gap: 50px;
    width: 100%;
    max-width: 768px;
    background: ${Color.Grey};
    display: flex;
    flex-direction: column;
`;

const SearchResultPage = () => {
    const router = useRouter();
    const { keyword } = router.query as { keyword: string };

    return (
        <Container>
            <DefaultHeader
                leftArea={<HeaderBackButton routerPath="/search" />}
                centerArea={<SearchHeader.Center />}
            />
            <QuerySuspenseErrorBoundary>
                <SearchResult keyword={keyword} />
            </QuerySuspenseErrorBoundary>
        </Container>
    );
};

export default SearchResultPage;
