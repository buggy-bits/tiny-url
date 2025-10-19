export interface CreateUrlRequest {
  longUrl: string;
}

export interface CreateUrlResponse {
  status: string;
  message?: string;
  data: {
    longUrl: string;
    shortUrlCode: string;
  };
}

export interface UrlData {
  _id: string;
  shortCode: string;
  originalUrl: string;
  shortUrl?: string;
  createdAt: string;
  updatedAt: string;
  clicks: number;
  createdBy?: string;
}

export interface UrlDetailsResponse {
  status: string;
  data: UrlData;
}

export interface UrlListResponse {
  status: string;
  data: UrlData[];
}

export interface UpdateUrlRequest {
  longUrl: string;
}

export interface ClickLog {
  _id: string;
  shortCode: string;
  ipAddress: string;
  clickedAt: string;
}

export interface ClickLogsResponse {
  status: string;
  clicks: number;
  data: ClickLog[];
}
