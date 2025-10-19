export interface RegisterRequest {
  email: string;
  userName: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    userId: string;
    email: string;
    userName: string;
  };
  accessToken?: string;
}

export interface User {
  userId: string;
  email: string;
  userName: string;
}
