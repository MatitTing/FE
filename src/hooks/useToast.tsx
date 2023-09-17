import { useRef, useState } from "react";
import { ToastOption } from "types/toast";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toastRecoil } from "src/recoil-states/toastRecoil";

interface Toast {
  id: number;
  message: string;
  option: ToastOption;
}

const useToast = () => {
  const setToasts = useSetRecoilState(toastRecoil);
  const toasts = useRecoilValue(toastRecoil);
  const toastCounter = useRef(0);

  const showToast = (message: string, option?: ToastOption) => {
    const { type = "info", time = 3 } = option || {};
    const id = toastCounter.current++;

    const newToast = { id, message, option: { type, time } };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, time * 1000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
};

export default useToast;
