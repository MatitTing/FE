import { ChangeEvent, ReactElement, useEffect } from "react";
import TextInput from "@component/common/TextInput";

const BottomInputGroup = () => {
  // 하단 input과 submit

  const onChanegChat = (e: ChangeEvent<HTMLInputElement>) => {
    //
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        height: "50px",
      }}
    >
      <TextInput placeholder="message" onChange={onChanegChat} />

      <button
        style={{
          width: "40px",
          border: "none",
          borderRadius: "10px",
        }}
      >
        전송
      </button>
    </div>
  );
};

BottomInputGroup.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default BottomInputGroup;
