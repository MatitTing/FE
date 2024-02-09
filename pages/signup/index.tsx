import styled from "@emotion/styled";
import { DefaultHeader } from "@components/common/DefaultHeader";
import { useState } from "react";
import BackIcon from "@components/icons/common/Back.icon";
import Progressbar from "@components/common/ProgressBar";
import { DefaultButton } from "@components/common/DefaultButton";
import { useRouter } from "next/router";

import GenderSection from "@components/signup/GenderSection";
import BirthDaySection from "@components/signup/BirthdaySection";
import NickNameSection from "@components/signup/NicknameSection";
import { useForm } from "react-hook-form";
interface HeaderLeftAreaProps {
  onClick: () => void;
}

export interface SignUpFormType {
  gender: string;
  birthDay: string;
  nickName: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 45px;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 768px;
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

const LeftArea = ({ onClick }: HeaderLeftAreaProps) => {
  return (
    <HeaderAreaContainer onClick={onClick}>{BackIcon()}</HeaderAreaContainer>
  );
};

const SignUpPage = () => {
  const [step, setStep] = useState(0);
  const { register, control, setValue } = useForm<SignUpFormType>({
    defaultValues: {
      gender: "",
      birthDay: "",
      nickName: "",
    },
  });
  const router = useRouter();

  const forwardStep = () =>
    step + 1 === signupSteps.length
      ? registerInfo()
      : setStep((step: number) => step + 1);

  const backStep = () =>
    step > 0 ? setStep((step: number) => step - 1) : router.back();

  const registerInfo = () => {
    //유저정보등록
  };

  const signupSteps = [
    {
      title: "회원님의 성별은 무엇인가요?",
      contents: <GenderSection control={control} setValue={setValue} />,
    },
    {
      title: "회원님의 생일은 언제인가요?",
      contents: <BirthDaySection {...register("birthDay")} />,
    },
    {
      title: "닉네임을 만들어 볼까요?",
      contents: <NickNameSection {...register("nickName")} />,
    },
  ];

  return (
    <Container>
      <DefaultHeader leftArea={<LeftArea onClick={backStep} />} />
      <ProgressbarContainer>
        <Progressbar value={((step + 1) / signupSteps.length) * 100} />
      </ProgressbarContainer>
      <StepTitle>{signupSteps[step].title}</StepTitle>
      {signupSteps[step].contents}
      <NextButtonContainer>
        <DefaultButton
          text={step + 1 === signupSteps.length ? "완료" : "다음"}
          onClick={forwardStep}
          style={{
            width: "100%",
          }}
        />
      </NextButtonContainer>
    </Container>
  );
};

export default SignUpPage;
