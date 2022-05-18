import { toast } from "react-toastify";
import { base64Decode, Cookie } from "../../applocal";

export default function confirmDelete(msg = "Enter confirmation code to perform delete action", errorMsg = "Incorrect confirmation code entered!") {
  const constr = window.prompt(msg),
    dcc = Cookie("dcc").get(),
    performDelete = constr == base64Decode(dcc || "empty");
  // localStorage.getItem("prevll")
  if (!performDelete) toast.error(errorMsg);
  return performDelete;
}
