import jwt from "jsonwebtoken";

export function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "1h",
  });
}

export function generateRefreshToken(userId: number, jti: string) {
  return jwt.sign(
    {
      userId,
      jti,
    },
    process.env.JWT_REFRESH_ACCESS_SECRET as string,
    {
      expiresIn: "12h",
    }
  );
}

export function generateTokens(user: any, jti: any) {
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id, jti);

  return {
    accessToken,
    refreshToken,
  };
}
