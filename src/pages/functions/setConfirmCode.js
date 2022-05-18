import { Cookie } from "../../applocal";

export default function setConfirmCode(value = "", days = 30) {
  Cookie("dcc").set(value, days);
  return value;
}
