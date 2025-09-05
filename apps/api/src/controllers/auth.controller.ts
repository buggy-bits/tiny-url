import { NextFunction, Request, Response } from 'express';
import { AppError } from '../middlewares/errorHandler.middleware';
import UserModel from '../models/user.model';

import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

const saltRounds = 10;

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, userName, password, firstName, lastName, avatarUrl } =
      req.body;

    if (!email || !userName || !password) {
      const error: AppError = new Error(
        'Email, Username and Password are required'
      );
      error.status = 400;
      throw error;
    }
    // check for user existance
    UserModel.findOne({ $or: [{ email }, { userName }] }).then(
      (existingUser) => {
        if (existingUser) {
          const error: AppError = new Error(
            'User with given email or username already exists'
          );
          error.status = 409; // conflict
          throw error;
        }
        // hash given password
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            const newUser = new UserModel({
              email,
              userName,
              password: hash,
              firstName,
              lastName,
              avatarUrl,
              isActive: true,
            });
            // save user to database
            newUser
              .save()
              .then(() => {
                // return success response
                res.status(201).json({
                  status: 'success',
                  message: 'User registered successfully',
                  data: { userId: newUser._id, email, userName },
                });
              })
              .catch((error) => {
                // or error response
                const err: AppError = new Error(
                  'Database error: unable to save user'
                );
                err.status = 500;
                next(error);
                return;
              });
          });
        });
      }
    );
  } catch (error) {
    next(error);
    return;
  }
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error: AppError = new Error('Email and Password are required');
      error.status = 400;
      throw error;
    }
    // check for user existance
    UserModel.findOne({ email }).then((existingUser) => {
      if (!existingUser) {
        const error: AppError = new Error('Invalid email or password');
        error.status = 401;
        return next(error);
      }
      // compare the password
      bcrypt.compare(password, existingUser.password, function (err, result) {
        if (!result) {
          // incorrect password
          const error: AppError = new Error('Invalid email or password');
          error.status = 401;
          return next(error);
        } // correct password, so give user a token
        const accessToken = generateAccessToken({
          userId: existingUser._id.toString(),
        });
        const refreshToken = generateRefreshToken({
          userId: existingUser._id.toString(),
        });

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/auth/token/refresh',
        });

        res.status(200).json({
          status: 'success',
          message: 'User logged in successfully',
          data: {
            userId: existingUser._id,
            email,
            userName: existingUser.userName,
          },
          accessToken,
        });
      });
    });
  } catch (error) {
    next(error);
    return;
  }
};
