import { DefaultButton } from "@components/common/DefaultButton";
import styled from "@emotion/styled";
import { SignUpFormType } from "@pages/signup";
import { FC, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { ColorToken } from "styles/Color";

interface GenderSectionProps {
  control: Control<SignUpFormType>;
  setValue: UseFormSetValue<SignUpFormType>;
}

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 40px;
`;

const GenderSection: FC<GenderSectionProps> = ({ control, setValue }) => {
  const selectedType = useWatch({
    control,
    name: "gender",
  });

  const genders = [
    { type: "MALE", value: "남성" },
    { type: "FEMALE", value: "여성" },
  ];
  const onClickButton = (type: string) => {
    setValue("gender", type);
  };

  return (
    <Container>
      {genders.map(({ type, value }) => (
        <DefaultButton
          key={type}
          text={value}
          filled={type === selectedType}
          onClick={() => {
            onClickButton(type);
          }}
        />
      ))}
    </Container>
  );
};

export default GenderSection;
