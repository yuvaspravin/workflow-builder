import React from "react";
import { useToast } from "../store/toastStore";

const Toast: React.FC = () => {
  const { message, show, hide } = useToast();
  if (!show) return null;
  return (
    <div
      className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded cursor-pointer"
      onClick={hide}
    >
      {message}
    </div>
  );
};

export default Toast;
