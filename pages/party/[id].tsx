import styled from '@emotion/styled';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import { useScroll } from 'react-use';
import { useRef } from 'react';
import PartyDetailContent from '@components/partydetail/PartyDetailContent';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    max-width: 768px;
`;

const PartyDetail = () => {
    return (
        <Container>
            <DefaultHeader leftArea={<HeaderBackButton />} />
            <QuerySuspenseErrorBoundary>
                <PartyDetailContent />
            </QuerySuspenseErrorBoundary>
        </Container>
    );
};

export default PartyDetail;
