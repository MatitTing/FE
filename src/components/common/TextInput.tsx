import { ChangeEvent, FocusEventHandler, KeyboardEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "@emotion/styled";

const Container = styled.div({
  width: "100%",
  position: "relative",
});

const Input = styled.input({
  width: "100%",
  height: "40px",
  padding: "10px 14px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",

  "&:focus": {
    outline: "none",
  },
});

const ErrorText = styled.p({
  color: "red",
});

interface InputProps {
  register?: UseFormRegisterReturn<string>;
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  whiteSpace?: boolean;
}

const TextInput = ({
  register,
  value,
  placeholder,
  errorMessage,
  onFocus,
  onKeyDown,
  whiteSpace = true,
}: InputProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!whiteSpace) {
      e.target.value = e.target.value.replace(/\s/gi, "");
    }
  };

  return (
    <Container>
      <Input
        type="text"
        {...register}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Container>
  );
};

export default TextInput;
