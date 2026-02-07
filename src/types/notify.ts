export type NotifyStatus = "started" | "success" | "failed";

export interface NotifyPayload {
  project: string;
  status: NotifyStatus;
  branch?: string;
  commit?: string;
  environment?: string;
}
