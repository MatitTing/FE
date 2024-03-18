import React, { InputHTMLAttributes, forwardRef } from "react";
import TextInput from "@components/common/TextInput";
import styled from "@emotion/styled";
import { useForm, useWatch } from "react-hook-form";
import { ColorToken } from "styles/Color";

type InputProps = {
  errorMessage?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
  width: 100%;
`;

const NickNameSection = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, ...rest }, ref) => {
    return (
      <Container>
        <TextInput
          isBorderRadius
          {...rest}
          ref={ref}
          errorMessage={errorMessage}
        />
      </Container>
    );
  }
);

NickNameSection.displayName = "NickNameSection";

export default NickNameSection;
