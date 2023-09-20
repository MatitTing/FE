import React from "react";
import styled from "@emotion/styled";
import Progressbar from "@components/common/ProgressBar";
import Image from "next/image";
import ProfilebackGround from "./ProfileBackground";
import LocationIcon from "@components/icons/profile/Location.icon";
import GenderIcon from "@components/icons/profile/Gender.icon";
import InfoIcon from "@components/icons/profile/Info.icon";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 20px;
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

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  padding: 20px;
  gap: 8px;
  .userinfo {
    color: #4b4b4b;
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-bottom: 8px;
  }
  .name {
    font-size: 32px;
    margin-bottom: 8px;
  }
  span {
    margin-left: 4px;
  }
`;

const userdata = {
  name: "username",
  locaton: "서울광역시",
  gender: "남성",
  age: "20대",
  mannerdegree: 30,
};

const ProfileInfo = () => {
  const { locaton, gender, age, name, mannerdegree } = userdata;
  const { data: session, status } = useSession();
  const logined = status === "authenticated";

  const router = useRouter();
  return (
    <Container>
      <ProfilebackGround />
      <ProfileDetailContainer>
        <ProfileImgContainer>
          <Image
            src={session?.user?.image || "/images/profile/profile.png"}
            width={128}
            height={128}
            className="profileimg"
            onClick={() => {
              router.push("/signin");
            }}
          />
        </ProfileImgContainer>
        <ProfileDetail>
          {logined && (
            <div className="userinfo">
              <div className="location">
                <LocationIcon />
                <span>{locaton}</span>
              </div>
              <div className="gender">
                <GenderIcon />
                <span>{gender}</span>
              </div>
              <div className="age">
                <InfoIcon />
                <span>{age}</span>
              </div>
            </div>
          )}
          <div className="name">
            {session?.user?.name || "로그인을 해야합니다."}
          </div>
          {logined && (
            <MannerDegreeContainer>
              <Progressbar value={mannerdegree} /> {mannerdegree}°C
            </MannerDegreeContainer>
          )}
        </ProfileDetail>
      </ProfileDetailContainer>
    </Container>
  );
};

export default ProfileInfo;
