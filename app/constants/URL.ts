export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_URL
    : "http://localhost:3000";
