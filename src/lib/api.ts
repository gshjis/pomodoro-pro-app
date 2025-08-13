import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // For cookies
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await api.post('/auth/refresh');
        const { access_token } = refreshResponse.data;
        localStorage.setItem('access_token', access_token);
        
        // Retry original request
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface User {
  user_id: number;
  username: string;
  email: string;
}

export interface Task {
  task_id: number;
  name: string;
  description?: string;
  pomodoro_count: number;
  category_id: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  category_id: number;
  name: string;
}

export interface AuthResponse {
  user?: User;
  access_token: string;
  token_type: string;
}

// Auth API
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', data),
  
  login: (data: { username: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [(data) => new URLSearchParams(data)]
    }),
  
  refresh: () => api.post<{ access_token: string; token_type: string }>('/auth/refresh'),
};

// Tasks API
export const tasksAPI = {
  getAll: () => api.get<Task[]>('/tasks'),
  
  create: (data: { name: string; description?: string; pomodoro_count: number; category_id: number }) =>
    api.post<Task>('/tasks', data),
  
  update: (id: number, data: Partial<{ name: string; description?: string; pomodoro_count: number; category_id: number }>) =>
    api.patch<Task>(`/tasks/${id}`, data),
  
  delete: (id: number) => api.delete(`/tasks/${id}`),
};

// Categories API (placeholder - extend as needed)
export const categoriesAPI = {
  getAll: () => api.get<Category[]>('/categories'),
  create: (data: { name: string }) => api.post<Category>('/categories', data),
};