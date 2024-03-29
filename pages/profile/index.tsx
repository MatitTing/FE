import BackgroundImage from '@components/common/BackgroundImage';
import { DefaultHeader } from '@components/common/DefaultHeader';
import { HeaderBackButton } from '@components/common/HeaderBackButton';
import QuerySuspenseErrorBoundary from '@components/hoc/QuerySuspenseErrorBoundary';
import SettingIcon from '@components/icons/common/Setting.icon';
import ProfileError from '@components/profile/ProfileError';
import ProfileInfo from '@components/profile/ProfileInfo';
import ProfileLoading from '@components/profile/ProfileLoading';
import ProfileTab from '@components/profile/ProfileTab';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRef } from 'react';
import { useScroll } from 'react-use';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-bottom: 76px;
    width: 100%;
    max-width: 768px;
    overflow-y: scroll;
`;
const ProfileInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 100%;
`;

const RightAreaContainer = styled.div`
    display: flex;
    height: 100%;
    padding: 0 8px;
    align-items: center;
    cursor: pointer;
`;

const RightArea = () => {
    return (
        <Link href={'/setting'}>
            <RightAreaContainer>{SettingIcon()}</RightAreaContainer>
        </Link>
    );
};

const Profile = () => {
    const scrollRef = useRef(null);
    const { y } = useScroll(scrollRef);

    return (
        <Container ref={scrollRef}>
            <DefaultHeader leftArea={<HeaderBackButton />} rightArea={<RightArea />} />
            <BackgroundImage scrollY={y} src="/images/profile/profilebackground.jpg" height={200} />
            <ProfileInfoContainer>
                <QuerySuspenseErrorBoundary
                    errorFallback={ProfileError}
                    suspenseFallback={<ProfileLoading />}
                >
                    <ProfileInfo />
                </QuerySuspenseErrorBoundary>
            </ProfileInfoContainer>
            <QuerySuspenseErrorBoundary>
                <ProfileTab />
            </QuerySuspenseErrorBoundary>
        </Container>
    );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { category } = context.query;
    if (!category) {
        return {
            redirect: {
                permanent: false,
                destination: '/profile?category=situation&role=HOST',
            },
        };
    }
    return {
        props: {},
    };
};
