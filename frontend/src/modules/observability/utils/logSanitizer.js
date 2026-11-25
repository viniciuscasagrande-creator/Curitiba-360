const SENSITIVE_KEYS = [
  "password",
  "cvv",
  "cardNumber",
  "authorization",
  "token",
  "apiKey",
  "secret",
  "refreshToken",
  "accessToken",
];

export function sanitizeLogPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  return Object.entries(payload).reduce(
    (result, [key, value]) => {
      const normalizedKey =
        key.toLowerCase();

      const isSensitive =
        SENSITIVE_KEYS.some((item) =>
          normalizedKey.includes(
            item.toLowerCase()
          )
        );

      result[key] = isSensitive
        ? "[REDACTED]"
        : typeof value === "object"
          ? sanitizeLogPayload(value)
          : value;

      return result;
    },
    {}
  );
}
export default sanitizeLogPayload;
