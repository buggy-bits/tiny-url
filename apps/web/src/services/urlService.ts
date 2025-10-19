import { api } from '../config/api';
import {
  CreateUrlRequest,
  CreateUrlResponse,
  UrlListResponse,
  UrlDetailsResponse,
  UpdateUrlRequest,
  ClickLogsResponse,
} from '../types/url';

export const urlService = {
  createUrl: async (data: CreateUrlRequest): Promise<CreateUrlResponse> => {
    const response = await api.post('/api/v1/urls', data);
    return response.data;
  },

  getAllUrls: async (): Promise<UrlListResponse> => {
    const response = await api.get('/api/v1/urls');
    return response.data;
  },

  getUrlByShortCode: async (shortCode: string): Promise<UrlDetailsResponse> => {
    const response = await api.get(`/api/v1/urls/${shortCode}`);
    return response.data;
  },

  updateUrl: async (shortCode: string, data: UpdateUrlRequest): Promise<UrlDetailsResponse> => {
    const response = await api.put(`/api/v1/urls/${shortCode}`, data);
    return response.data;
  },

  deleteUrl: async (shortCode: string): Promise<void> => {
    await api.delete(`/api/v1/urls/${shortCode}`);
  },

  getClickLogs: async (shortCode: string): Promise<ClickLogsResponse> => {
    const response = await api.get(`/api/v1/urls/${shortCode}/logs`);
    return response.data;
  },
};
