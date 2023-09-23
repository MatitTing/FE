import { useState } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  height: 60px;

  & input {
    width: 200px;
  }
`;

const Title = styled.h5`
  min-width: 80px;
`;

const CheckBoxGroup = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
`;

const CheckBtn = styled.label<{ isActive: boolean }>`
  flex: 1;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? "#fff" : "orange")};
  border: ${(props) =>
    props.isActive ? "1px solid transparent" : "1px solid orange"};
  background-color: ${(props) => (props.isActive ? "orange" : "transparent")};
`;

interface CheckBoxProps {
  title: string;
  contents: { id: string; label: string }[];
}

type checkBoxType = { [key: string]: boolean };

const CheckBox = ({ title, contents }: CheckBoxProps) => {
  const [isActive, setIsActive] = useState<checkBoxType>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setIsActive({
      ...isActive,
      [name]: checked,
    });
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      <CheckBoxGroup>
        {contents.map(({ id, label }) => (
          <CheckBtn
            key={id}
            htmlFor={id}
            isActive={isActive ? isActive[id] : false}
          >
            {label}
            <input
              id={id}
              name={id}
              type="checkbox"
              onChange={handleChange}
              hidden
            />
          </CheckBtn>
        ))}
      </CheckBoxGroup>
    </Wrapper>
  );
};

export default CheckBox;
