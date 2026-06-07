import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * We create a centralized Axios instance. 
 * This prevents us from having to pass headers and base URLs into every single API call.
 * 
 * // TODO: In the future, we will set baseURL to `process.env.EXPO_PUBLIC_API_URL`
 * so we can switch between Mock APIs and Real APIs via a .env file!
 */
export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.coingecko.com/api/v3',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor: 
 * This code runs BEFORE every single API request leaves your phone.
 * Useful for attaching authentication tokens (Bearer tokens) dynamically.
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Example: In the future, we can grab a token from Zustand or SecureStore here
    // const token = useAuthStore.getState().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    // You can also add console.logs here to debug all outgoing network traffic
    if (__DEV__) {
       console.log(`[Network Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor:
 * This code runs when the server responds, BEFORE it hits your UI components.
 * Useful for catching global errors like 401 Unauthorized (to log out the user).
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Standardizing API exceptions globally
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
         console.warn('[Network Error] Unauthorized - We should probably log the user out.');
      } else if (status >= 500) {
         console.error('[Network Error] Server is down!');
      }
    } else if (error.request) {
      console.error('[Network Error] No response received. Check internet connection.');
    }
    
    return Promise.reject(error);
  }
);
