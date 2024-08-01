
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
}

export interface LogoutRequest {
  token: string;
}