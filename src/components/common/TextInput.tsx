import styled from "@emotion/styled";
import { shouldNotForwardProp } from "@utils/common";
import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import { ColorToken } from "styles/Color";

const Container = styled.div({
  position: "relative",
  width: "100%",
});

const Input = styled(
  "input",
  shouldNotForwardProp("isBorderRadius")
)<{ isBorderRadius?: boolean }>(({ isBorderRadius }) => ({
  width: "100%",
  height: "100%",
  padding: "10px 14px",
  border: `1px solid ${ColorToken.border}`,
  backgroundColor: "#f9f9f9",
  borderRadius: isBorderRadius ? "10px" : 0,
  "&:focus": {
    outline: "none",
  },
}));

const ErrorText = styled.p({
  color: "red",
});

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
