/**
 * Authentication API service functions
 */
import axiosInstance from './axiosInstance';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatarUrl: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const response = await axiosInstance.post('/api/v1/users/register', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await axiosInstance.post('/api/v1/users/login', data);
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await axiosInstance.post('/api/v1/users/refresh-token', {
      refreshToken,
    });
    return response.data;
  },
};
