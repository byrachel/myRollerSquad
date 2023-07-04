export interface IErrorCode {
  response: { data: { code: string; message: string } };
}

export interface UserSessionInterface {
  id: number;
  role: string;
  avatar: string | null;
  username: string;
  places:
    | {
        id: number;
        name: string;
        active: boolean;
      }[]
    | null;
}
