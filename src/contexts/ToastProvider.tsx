import React, { createContext, PropsWithChildren, useContext } from "react";
import Toast from "src/components/common/toast";
import useToast from "src/hooks/useToast";
import styled from "@emotion/styled";
import { ToastOption } from "types/toast";

const ToastContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 90px;
  margin-left: -160px;

  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
`;

export const ToastContext = createContext({
  showToast(message: string, option?: ToastOption) {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const { toasts, showToast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        {toasts.slice(0, 3).map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            option={toast.option}
            onToastClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
