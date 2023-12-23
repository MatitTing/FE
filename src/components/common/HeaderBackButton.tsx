import BackIcon from "@components/icons/common/Back.icon";
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
  const router = useRouter();
  const onClickIcon = useCallback(() => {
    if (routerPath) {
      router.push(routerPath);
      return;
    }
    router.back();
  }, [router, routerPath]);

  return (
    <Container margin={margin} onClick={onClickIcon}>
      <BackIcon />
    </Container>
  );
};
