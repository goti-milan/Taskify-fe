import { apiFetch } from "./api";

/* ---------- Types ---------- */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    token: {
      accessToken: string;
      refreshToken: string;
    }
  };
}
export interface MeResponse {
  success: boolean;
  data: User  
}

/* ---------- API Calls ---------- */

// POST /auth/register
export const registerUser = (payload: RegisterPayload) =>
  apiFetch<AuthResponse>('auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// POST /auth/login
export const loginUser = (payload: LoginPayload) =>
  apiFetch<AuthResponse>('auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// POST /auth/refresh
export const refreshAuthToken = () =>
  apiFetch('auth/refresh', {
    method: 'POST',
  });

// GET /auth
export const fetchCurrentUser = () =>
  apiFetch<MeResponse>('auth', {
    method: 'GET',
  });
