import { useContext } from "react";
import { ToastContext } from "src/contexts/ToastProvider";

function SimpleComponent() {
  const { showToast } = useContext(ToastContext);

  const handleClick = () => {
    showToast("test1234");
  };

  return (
    <div>
      <button onClick={handleClick}>Show Toast!</button>
    </div>
  );
}

export default SimpleComponent;
