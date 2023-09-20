import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import { useState } from "react";
import BackIcon from "@components/icons/common/Back.icon";
import Progressbar from "@components/common/ProgressBar";
import GenderType from "@components/profileinput/GenderType";
import SetBirthday from "@components/profileinput/SetBirthday";
import SetNickname from "@components/profileinput/SetNickname";
import { DefaultButton } from "@components/common/DefaultButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 45px;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  width: 600px;
  height: calc(100% - 76px);
  overflow-y: auto;
  flex-direction: column;
  padding-bottom: 40px;
`;

const HeaderAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 15px;
  align-items: center;
`;

const StepTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 32px;
`;
const ProgressbarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
`;
const NextButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
`;

const ProfileInput = () => {
  const [step, setStep] = useState(0);

  const leftArea = () => {
    return (
      <HeaderAreaContainer
        onClick={() => {
          step > 0 && setStep((step: number) => step - 1);
        }}
      >
        {BackIcon()}
      </HeaderAreaContainer>
    );
  };

  const signusteps = [
    {
      title: "회원님의 성별은 무엇인가요?",
      contents: <GenderType />,
    },
    {
      title: "회원님의 생일은 언제인가요?",
      contents: <SetBirthday />,
    },
    {
      title: "닉네임을 만들어 볼까요?",
      contents: <SetNickname />,
    },
  ];

  return (
    <Container>
      <DefaultHeader leftArea={leftArea()} />
      <Main>
        <ProgressbarContainer>
          <Progressbar value={((step + 1) / signusteps.length) * 100} />
        </ProgressbarContainer>
        <StepTitle>{signusteps[step].title}</StepTitle>
        {signusteps[step].contents}
        <NextButtonContainer>
          <DefaultButton
            text={step + 1 === signusteps.length ? "완료" : "다음"}
            onClick={() => {
              if (step + 1 === signusteps.length) {
              } else {
                setStep((step: number) => step + 1);
              }
            }}
          />
        </NextButtonContainer>
      </Main>
    </Container>
  );
};

export default ProfileInput;
