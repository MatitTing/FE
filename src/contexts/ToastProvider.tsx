import Toast from "@components/common/Toast";
import useToast from "src/hooks/useToast";
import styled from "@emotion/styled";

const Container = styled.div`
  position: absolute;
  left: 50%;
  bottom: 90px;
  margin-left: -160px;

  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
`;

const ToastProvider = () => {
  const { toasts, removeToast } = useToast();
  return (
    <Container>
      {toasts.slice(0, 3).map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          option={toast.option}
          onToastClose={() => removeToast(toast.id)}
        />
      ))}
    </Container>
  );
};

export default ToastProvider;
