import { Status } from "../types";

export default function transformStatusText(status: Status): string {
  switch (status) {
    case "normal":
      return "정상";
    case "weakness":
      return "쇠약";
    case "infection":
      return "감염";
    default:
      return "알 수 없음";
  }
}
