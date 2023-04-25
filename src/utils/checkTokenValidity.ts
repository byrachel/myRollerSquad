import jwt from "jsonwebtoken";

export const checkTokenValidity = (token: string) => {
  const decodedToken = jwt.decode(token, {
    complete: true,
  }) as any;

  const dateNow = new Date();

  const tokenIsValid =
    decodedToken && decodedToken.payload.exp < dateNow.getTime()
      ? decodedToken
      : null;

  return tokenIsValid;
};
