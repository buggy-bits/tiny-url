import { NextFunction, Request, Response } from 'express';
import { AppError } from '../middlewares/errorHandler.middleware';
import { generateBase62Hash } from '../utils/generate-url';
import UrlModel from '../models/url.model';
import { IAuthenticatedRequest } from '../middlewares/token.middleware';
import ClickLogModel from '../models/click.model';

export const createShortUrl = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    const error: AppError = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
  try {
    const longUrl = req.body.longUrl;
    const title = req.body.title || 'No Title';
    const description = req.body.description || 'No Description';

    // verify the given long url
    const isValid = await validateUrl(longUrl);

    if (!isValid) {
      const error: AppError = new Error(
        'Invalid URL format or unreachable URL'
      );
      error.status = 400;
      return next(error);
    }
    // if valid, then check for original url existance in db
    const existing = await checkOriginalUrlExistance(longUrl);

    if (existing) {
      return res.status(200).json({
        status: 'success',
        message: 'Provided Url already exists',
        data: { longUrl, shortUrl: existing.shortUrl },
      });
    }

    // if not exist, then generate a new shortUrl
    // give the counter number here, for now using a timestamp- but this is not good for production
    const shortUrlCode = generateBase62Hash(Date.now() % 10000, 5);
    // save the shortUrl and longUrl mapping to database
    const shortUrl =
      req.protocol + '://' + req.get('host') + '/' + shortUrlCode;
    await saveUrlToDB(
      longUrl,
      shortUrlCode,
      shortUrl,
      user,
      title,
      description
    );
    return res
      .status(201)
      .json({ status: 'success', data: { longUrl, shortUrl } });
  } catch (error) {
    return next(error);
  }
};

export const getUserUrls = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    const error: AppError = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
  try {
    const urls = await UrlModel.find({ createdBy: user.userId }).select(
      '-__v -createdBy'
    );
    return res.status(200).json({ status: 'success', data: urls });
  } catch (error) {
    return next(error);
  }
};

export const deleteShortUrl = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    const error: AppError = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
  try {
    const shortUrlCode = req.params.shortCode;

    const data = await UrlModel.findOneAndDelete({
      shortCode: shortUrlCode,
      createdBy: user.userId,
    });
    if (!data) {
      const error: AppError = new Error(
        "Short URL not found or you don't have permission to delete it"
      );
      error.status = 404;
      return next(error);
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'Short URL deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

export const updateUrlData = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    const error: AppError = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
  try {
    const shortUrlCode = req.params.shortCode;
    const newLongUrl = req.body.longUrl;

    // verify the given long url
    const isValid = await validateUrl(newLongUrl);
    if (!isValid) {
      const error: AppError = new Error(
        'Invalid URL format or unreachable URL'
      );
      error.status = 400;
      return next(error);
    }

    const data = await UrlModel.findOneAndUpdate(
      { shortCode: shortUrlCode, createdBy: user.userId },
      { originalUrl: newLongUrl },
      { new: true }
    );

    if (!data) {
      const error: AppError = new Error(
        "Short URL not found or you don't have permission to update it"
      );
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    return next(error);
  }
};

export const getDataByShortCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shortUrlCode = req.params.shortCode;

    const data = await UrlModel.findOne({ shortCode: shortUrlCode });

    if (!data) {
      const error: AppError = new Error('Short URL not found');
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    return next(error);
  }
};

export const getClickLogsByShortCode = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) {
    const error: AppError = new Error('Unauthorized');
    error.status = 401;
    return next(error);
  }
  try {
    const shortUrlCode = req.params.shortCode;

    const urlData = await UrlModel.findOne({
      shortCode: shortUrlCode,
      createdBy: user.userId,
    });
    if (!urlData) {
      const error: AppError = new Error(
        "Short URL not found or you don't have permission to view its logs"
      );
      error.status = 404;
      return next(error);
    }

    const clickLogs = await ClickLogModel.find({
      shortCode: shortUrlCode,
    }).select('-__v -createdAt -updatedAt');

    return res
      .status(200)
      .json({ status: 'success', data: clickLogs, clicks: urlData.clicks });
  } catch (error) {
    return next(error);
  }
};
export const redirectToOriginalUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shortUrlCode = req.params.shortCode;
    const userAgent = req.get('User-Agent');
    const ipAddress = req.ip;

    const data = await UrlModel.findOne({ shortCode: shortUrlCode });

    if (data) {
      await ClickLogModel.create({
        shortCode: shortUrlCode,
        userAgent,
        ipAddress,
      });

      await UrlModel.findOneAndUpdate(
        { shortCode: shortUrlCode },
        { $inc: { clicks: 1 } }
      );

      // Redirect to the original URL
      res.status(302).redirect(data.originalUrl);
    } else {
      const error: AppError = new Error('Short URL not found');
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

async function saveUrlToDB(
  longUrl: string,
  shortCode: string,
  shortUrl: string,
  user: { userId: string },
  title: string,
  description: string
) {
  await UrlModel.create({
    shortCode: shortCode,
    originalUrl: longUrl,
    shortUrl: shortUrl,
    createdBy: user.userId,
    title: title,
    description: description,
  }).catch((error) => {
    if (error.code === 11000) {
      throw new Error('Short code already exists. Try again.');
    } else {
      throw error;
    }
  });
  console.log('URL mapping saved to database');
}

async function checkOriginalUrlExistance(longUrl: string) {
  const existing = await UrlModel.findOne({ originalUrl: longUrl });
  return existing;
}

function isValidUrlScheme(url: string): boolean {
  if (!url.match(/^https?:\/\//)) {
    return false;
  }
  return true;
}

async function validateUrl(url: string): Promise<boolean> {
  if (!isValidUrlScheme(url)) {
    url = 'https://' + url; // default to 'https://' if no scheme is found
  }
  try {
    const response = await fetch(url, { method: 'HEAD' });
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
