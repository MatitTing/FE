import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Progressbar from '@components/common/ProgressBar';
import Image from 'next/image';
import { DefaultText } from '@components/common/DefaultText';
import GenderIcon from '@components/icons/profile/Gender.icon';
import InfoIcon from '@components/icons/profile/Info.icon';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { API_GET_PROFILE_KEY } from 'src/api/getProfile';
import getProfile from 'src/api/getProfile';
import { PARTY_GENDER_LABEL } from 'src/constants/options';
import { labelDataConvert } from '@utils/labelDataConvert';

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-bottom: 20px;
    background-color: white;
`;

const ProfileImgContainer = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileDetailContainer = styled.div`
    width: 200px;
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 20px 0;
    z-index: 99;
    background-color: white;
`;

const MannerDegreeContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
`;

const Name = styled.div`
    margin-bottom: 16px;
`;

const ProfileDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    padding: 20px;
    gap: 8px;
`;

const userId = 11;
// 로그인 기능 연결후 userid 받아올 예정

const ProfileInfo = () => {
    const { data } = useSuspenseQuery({
        queryKey: [API_GET_PROFILE_KEY],
        queryFn: getProfile,
    });

    const { gender, age, nickname, imgUrl, negativeReviewCount, positiveReviewCount } = data;

    const mannerDegree = useMemo(() => {
        const basicDegree = 36.5;
        return basicDegree + (negativeReviewCount * -0.5 + positiveReviewCount * 0.5);
    }, [negativeReviewCount, positiveReviewCount]);

    return (
        <Container>
            <ProfileDetailContainer>
                <ProfileImgContainer>
                    <Image
                        src={imgUrl || '/images/profile/profile.png'}
                        width={128}
                        height={128}
                        style={{ borderRadius: '50%' }}
                        alt={'profile-image'}
                    />
                </ProfileImgContainer>
                <ProfileDetail>
                    <UserInfo>
                        <GenderIcon />
                        <DefaultText
                            text={labelDataConvert(gender, PARTY_GENDER_LABEL)}
                            size={16}
                        />
                        <InfoIcon />
                        <DefaultText text={`${age}세`} size={16} />
                    </UserInfo>
                    <Name>
                        <DefaultText text={nickname} size={32} />
                    </Name>
                    <MannerDegreeContainer>
                        <Progressbar value={mannerDegree} /> {mannerDegree}°C
                    </MannerDegreeContainer>
                </ProfileDetail>
            </ProfileDetailContainer>
        </Container>
    );
};

export default ProfileInfo;
