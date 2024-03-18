import styled from "@emotion/styled";
import { forwardRef } from "react";

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
  defaultValue?: string | number;
  options: { name: string | number; value: string | number }[];
}

const SelectContent = forwardRef<HTMLSelectElement, SelectContentProps>(
  ({ label, options, defaultValue, ...rest }, ref) => {
    return (
      <Contents>
        <Label>{label}</Label>
        <Select defaultValue={defaultValue} {...rest} ref={ref}>
          {options.map(({ name, value }) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </Contents>
    );
  }
);

SelectContent.displayName = "SelectContent";

export default SelectContent;
