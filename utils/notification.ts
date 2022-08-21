import { toast } from "react-toastify";

const Notification = (
  status: "success" | "info" | "error" | "warn",
  msg: string
) => {
  switch (status) {
    case "success":
      return toast.success(msg);
      break;
    case "info":
      return toast.info(msg);
      break;
    case "error":
      return toast.error(msg);
      break;
    case "warn":
      return toast.warn(msg);
    default:
      break;
  }
};

export default Notification;
