import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler.middleware";
import jwt from "jsonwebtoken";
import { generateAccessToken, TokenPayload } from "../utils/token";
import { JWT_REFRESH_TOKEN_SECRET } from "../config/env";
export const newAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies?.refreshToken;
    if (!token) {
      const error: AppError = new Error("Refresh token missing");
      error.status = 401;
      return next(error);
    }
    const payload = jwt.verify(
      token,
      JWT_REFRESH_TOKEN_SECRET || "i-am-key"
    ) as TokenPayload;
    const newToken = generateAccessToken({ userId: payload.userId });
    res.status(200).json({ status: "success", accessToken: newToken });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const jwtError: AppError = new Error("Invalid refresh token");
      jwtError.status = 401;
      return next(jwtError);
    } else if (error instanceof jwt.TokenExpiredError) {
      const expiredError: AppError = new Error("Refresh token expired");
      expiredError.status = 401;
      return next(expiredError);
    }
    return next(error); // Handle other errors
  }
};
