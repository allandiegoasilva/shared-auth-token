import { StatusCode } from "src/enum/status-code";

export type ReplyDto<T = void> = {
  statusCode: StatusCode;
  data: T;
};
