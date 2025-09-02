import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler.middleware";
import { generateBase62Hash } from "../utils/generate-url";
import UrlModel from "../models/url.model";

export const createShortUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const longUrl = req.body.longUrl;
    // verify the given long url
    validateUrl(longUrl).then((isValid) => {
      if (!isValid) {
        const error: AppError = new Error(
          "Invalid URL format or unreachable URL"
        );
        error.status = 400;
        next(error);
        return;
      }
      // if valid, then create short url and return
      // give the counter number here, for now using a static number
      const shortUrlCode = generateBase62Hash(445, 5);
      // save the shortUrl and longUrl mapping to database
      saveUrlToDB(longUrl, shortUrlCode)
        .then(() => {
          // return the shortUrl to user
          res
            .status(201)
            .json({ status: "success", data: { longUrl, shortUrlCode } });
        })
        .catch((error) => {
          const err: AppError = new Error("Database error");
          err.status = 500;
          next(error);
          return;
        });
    });
  } catch (error) {
    next(error);
    return;
  }
};

async function saveUrlToDB(longUrl: string, shortCode: string) {
  await UrlModel.create({ shortCode: shortCode, originalUrl: longUrl }).catch(
    (error) => {
      if (error.code === 11000) {
        throw new Error("Short code already exists. Try again.");
      } else {
        throw error;
      }
    }
  );
  console.log("URL mapping saved to database");
}
function isValidUrlScheme(url: string): boolean {
  if (!url.match(/^https?:\/\//)) {
    return false;
  }
  return true;
}

async function validateUrl(url: string): Promise<boolean> {
  if (!isValidUrlScheme(url)) {
    url = "https://" + url; // default to 'https://' if no scheme is found
  }
  try {
    const response = await fetch(url, { method: "HEAD" });
    // Check if status code is in the 2xx range
    if (response.ok) {
      console.log(`URL is valid: ${url}`);
      return true;
    } else {
      console.log(`URL is invalid (status code: ${response.status}): ${url}`);
      return false;
    }
  } catch (error) {
    console.error(`Error fetching URL: ${url}`, error);
    return false;
  }
}
