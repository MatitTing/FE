import React from "react";
import styled from "@emotion/styled";
import MannerDegree from "./mannerdegree";
import Image from "next/image";
import LocationIcon from "@components/icons/profile/location";
import GenderIcon from "@components/icons/profile/gender";
import InfoIcon from "@components/icons/profile/info";

interface ProfileInfoProps {
  name: string;
  locaton: string;
  gender: string;
  age: string;
  mannerdegree: number;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 20px 0;
`;

const ProfileImgContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  .profileimg {
    border-radius: 50%;
  }
`;
const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  padding: 20px;
  .userinfo {
    color: #4b4b4b;
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-bottom: 8px;
  }
  .name {
    font-size: 48px;
    margin-bottom: 16px;
  }
  span {
    margin-left: 4px;
  }
`;

const ProfileInfo = ({ userdata }: { userdata: ProfileInfoProps }) => {
  return (
    <Container>
      <ProfileImgContainer>
        <Image
          src="/images/profile/profile.png"
          width={160}
          height={160}
          className="profileimg"
        ></Image>
      </ProfileImgContainer>
      <ProfileDetail>
        <div className="userinfo">
          <div className="location">
            <LocationIcon />
            <span>{userdata.locaton}</span>
          </div>
          <div className="gender">
            <GenderIcon />
            <span>{userdata.gender}</span>
          </div>
          <div className="age">
            <InfoIcon />
            <span>{userdata.age}</span>
          </div>
        </div>
        <div className="name">{userdata.name}</div>
        <MannerDegree degree={userdata.mannerdegree}></MannerDegree>
      </ProfileDetail>
    </Container>
  );
};

export default ProfileInfo;
