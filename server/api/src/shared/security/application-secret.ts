import crypto from "node:crypto";

const SECRET_BYTES = 32;

export function generateApplicationSecret(): string {
  return crypto.randomBytes(SECRET_BYTES).toString("hex");
}

export function hashApplicationSecret(secret: string): string {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export function generateSecretVersion(): string {
  return crypto.randomUUID();
}