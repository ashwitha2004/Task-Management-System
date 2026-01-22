import jwt, { SignOptions } from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET as string;
const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

export const generateAccessToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: "15m",
  };

  return jwt.sign(payload, accessSecret, options);
};

export const generateRefreshToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, refreshSecret, options);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret);
};
