import styled from "@emotion/styled";
import { UseFormRegisterReturn } from "react-hook-form";

const Contents = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  height: 60px;

  & input {
    width: 200px;
  }
`;

const Label = styled.h5`
  min-width: 80px;
`;

const Select = styled.select`
  width: 200px;
  padding: 5px;
`;

interface SelectContentProps {
  label: string;
  register: UseFormRegisterReturn<string>;
  defaultValue?: string | number;
  options: { name: string | number; value: string | number }[];
}

const SelectContent = ({
  label,
  register,
  options,
  defaultValue,
}: SelectContentProps) => (
  <Contents>
    <Label>{label}</Label>
    <Select {...register} defaultValue={defaultValue}>
      {options.map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </Select>
  </Contents>
);

export default SelectContent;
