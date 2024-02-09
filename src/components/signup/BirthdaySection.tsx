import styled from "@emotion/styled";
import { InputHTMLAttributes, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Color } from "styles/Color";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
  width: 100%;
`;

const DatePicker = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid ${Color.TextSecondary};
  border-radius: 8px;
  display: flex;
  padding: 15px;
`;

const BirthDaySection = forwardRef<HTMLInputElement, InputProps>(
  ({ ...rest }, ref) => {
    return (
      <Container>
        <DatePicker type="date" {...rest} ref={ref} />
      </Container>
    );
  }
);

BirthDaySection.displayName = "BirthDaySection";

export default BirthDaySection;
