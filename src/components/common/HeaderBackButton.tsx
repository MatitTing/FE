import BackIcon from "@components/icons/common/close";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface HeaderBackButtonProps {
  routerPath?: string;
  margin?: string;
}

const Container = styled.div<{ margin: string }>`
  cursor: pointer;
  margin: ${({ margin }) => margin};
`;

export const HeaderBackButton = ({
  routerPath,
  margin = "-5px 0 0 0",
}: HeaderBackButtonProps) => {
  const rouetr = useRouter();
  const onClickIcon = useCallback(() => {
    if (routerPath) {
      rouetr.replace(routerPath);
    }
    rouetr.back();
  }, [rouetr, routerPath]);

  return (
    <Container margin={margin} onClick={onClickIcon}>
      <BackIcon />
    </Container>
  );
};
