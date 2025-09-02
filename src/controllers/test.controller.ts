import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler.middleware";

export const greetUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.json({ message: "Hello, User!" });
    res.status(200).json({
      status: "success",
      data: { message: "Hello, User!" },
    });
  } catch (error) {
    next(error);
  }
};

export const greetByName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.userName;
    if (name != "developer") {
      const error: AppError = new Error("Only developer is allowed!");
      error.status = 403;
      //   throw error;
      res.status(403).json({ message: error.message });
      return;
    }
    res.status(200).json({
      status: "success",
      data: { message: `Hello, ${name}` },
    });
  } catch (error) {
    next(error);
  }
};
