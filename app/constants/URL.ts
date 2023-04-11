export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : process.env.PRODUCTION_URL;
