import { DefaultButton } from "@components/common/DefaultButton";
import styled from "@emotion/styled";
import { SignUpFormType } from "@pages/signup";
import { FC, MouseEventHandler, useMemo } from "react";
import { Control, useWatch } from "react-hook-form";

interface SignupButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  control: Control<SignUpFormType>;
  step: number;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
`;

const SignupButton: FC<SignupButtonProps> = ({
  text,
  onClick,
  control,
  step,
}) => {
  const { birthDay, gender, nickName } = useWatch<SignUpFormType>({ control });

  const isDisabled = useMemo(() => {
    switch (step) {
      case 0:
        return !gender;
      case 1:
        return !birthDay;
      default:
        return !nickName;
    }
  }, [birthDay, gender, nickName, step]);

  return (
    <Container>
      <DefaultButton text={text} onClick={onClick} disabled={isDisabled} />
    </Container>
  );
};

export default SignupButton;
