import styled from "@emotion/styled";
import { shouldNotForwardProp } from "@utils/common";
import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import { ColorToken } from "styles/Color";

interface InputStyleProps {
  isBorderRadius?: boolean;
  errorMessage?: string;
}

const Container = styled.div({
  position: "relative",
  width: "100%",
});

const Input = styled.input<InputStyleProps>`
  width: 100%;
  height: 100%;
  padding: 10px 14px;
  border: ${({ errorMessage }) =>
    errorMessage ? `1px solid red` : `1px solid ${ColorToken.border}`};
  background: "#f9f9f9";
  border-radius: ${({ isBorderRadius }) => (isBorderRadius ? "10px" : "0")};
  &:focus {
    outline: "none";
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
  margin-left: 5px;
`;

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

interface TextInputProps extends InputProps {
  whiteSpace?: boolean;
  isBorderRadius?: boolean;
  errorMessage?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ whiteSpace, isBorderRadius, errorMessage, ...rest }, ref) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (!whiteSpace) {
        e.target.value = e.target.value.replace(/\s/gi, "");
      }
      rest.onChange && rest.onChange(e);
    };

    return (
      <Container>
        <Input
          type="text"
          onChange={onChangeHandler}
          isBorderRadius={isBorderRadius}
          errorMessage={errorMessage}
          {...rest}
          ref={ref}
        />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </Container>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
