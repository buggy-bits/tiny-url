import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler.middleware";
import { generateBase62Hash } from "../utils/generate-url";

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
      const shortUrl = generateBase62Hash(415, 5);
      // save the shortUrl and longUrl mapping to database
      res.status(201).json({ status: "success", data: { longUrl, shortUrl } });
    });
  } catch (error) {
    next(error);
    return;
  }
};

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
    console.log(response.status);
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
