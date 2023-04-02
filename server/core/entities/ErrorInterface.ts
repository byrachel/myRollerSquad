export interface ErrorInterface extends Error {
  status?: number;
}

export interface PrismaErrorInterface {
  status: number;
  message: string;
}
