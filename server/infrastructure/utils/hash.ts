import crypto from "crypto";

export function hash(token: any) {
  return crypto.createHash("sha512").update(token).digest("hex");
}
