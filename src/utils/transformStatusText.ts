import { Status } from "../types";

export default function transformStatusText(status: Status | null): string {
  switch (status) {
    case "weakness":
      return "쇠약";
    case "infection":
      return "감염";
    case null:
    default:
      return "정상";
  }
}
