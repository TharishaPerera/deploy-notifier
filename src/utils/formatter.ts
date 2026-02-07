import type { NotifyPayload } from "../types/notify.js";

export function formatMessage(data: NotifyPayload): string {
  const { project, status, branch, commit, environment } = data;

  let emoji = "";

  if (status === "started") emoji = "🚀";
  if (status === "success") emoji = "✅";
  if (status === "failed") emoji = "❌";

  return `
${emoji} *Deployment ${status.toUpperCase()}*

Project: ${project}
Branch: ${branch ?? "N/A"}
Commit: ${commit ?? "N/A"}
Env: ${environment ?? "N/A"}
`.trim();
}
