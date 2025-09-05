/**
 * URL shortening API service functions
 */
import axiosInstance from './axiosInstance';

export interface ShortenUrlData {
  longUrl: string;
}

export interface ShortUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  code: string;
  createdAt: string;
  userId: string;
}

export const urlService = {
  shortenUrl: async (data: ShortenUrlData): Promise<ShortUrl> => {
    const response = await axiosInstance.post('/api/v1/urls/shorten', data);
    return response.data;
  },

  getUserUrls: async (): Promise<ShortUrl[]> => {
    const response = await axiosInstance.get('/api/v1/urls/me');
    return response.data;
  },
};
