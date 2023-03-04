namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB_NAME: string;
    DATABASE_URL: string;
    JWT_ACCESS_SECRET: Secret;
    JWT_REFRESH_ACCESS_SECRET: Secret;
  }
}
export {};
