// import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// import { ContentType, HttpHeaderName } from '~/constants';
// import { logger } from '~/utils/logger';

// const baseURL = env.APP_URL;

// /**
//  * Create a custom Axios instance for making HTTP requests.
//  *
//  * @property {string} baseURL - The base URL for all requests. This should be set to your APIs base endpoint.
//  * @property {Object} headers - Default headers to be sent with every request.
//  * @property {string} contentType - Sets the Content-Type header to application/json.
//  * @property {number} timeout - Maximum time to wait for a response before the request times out (15000ms or 15 seconds).
//  *
//  * @example
//  * // GET request
//  * const getUsers = async () => {
//  *   try {
//  *     const response = await api.get('/users');
//  *     console.log(response.data);
//  *   } catch (error) {
//  *     console.error('Error fetching users:', error);
//  *   }
//  * };
//  *
//  * @example
//  * // POST request
//  * const createUser = async (userData) => {
//  *   try {
//  *     const response = await api.post('/users', userData);
//  *     console.log('User created:', response.data);
//  *   } catch (error) {
//  *     console.error('Error creating user:', error);
//  *   }
//  * };
//  *
//  * @example
//  * // PUT request
//  * const updateUser = async (userId, userData) => {
//  *   try {
//  *     const response = await api.put(`/users/${userId}`, userData);
//  *     console.log('User updated:', response.data);
//  *   } catch (error) {
//  *     console.error('Error updating user:', error);
//  *   }
//  * };
//  *
//  * @example
//  * // DELETE request
//  * const deleteUser = async (userId) => {
//  *   try {
//  *     await api.delete(`/users/${userId}`);
//  *     console.log('User deleted successfully');
//  *   } catch (error) {
//  *     console.error('Error deleting user:', error);
//  *   }
//  * };
//  *
//  * @example
//  * // Request with query parameters
//  * const searchUsers = async (query) => {
//  *   try {
//  *     const response = await api.get('/users', { params: { search: query } });
//  *     console.log('Search results:', response.data);
//  *   } catch (error) {
//  *     console.error('Error searching users:', error);
//  *   }
//  * };
//  */
// const api = axios.create({
//   baseURL,
//   headers: {
//     [HttpHeaderName.ContentType]: ContentType.JSON,
//   },
//   timeout: 15000, // 15 seconds
// });

// api.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     try {
//       // if (isServer) {
//       //   const { cookies } = await import('next/headers');
//       //   const cookieStore = await cookies();
//       //   logger.info('interceptors:', { cookieStore: JSON.stringify(cookieStore) });
//       //   const token = cookieStore.get(AuthSchemes.Bearer)?.value;
//       //   logger.info('interceptors:', { token });

//       //   if (token) {
//       //     config.headers[HttpHeaderName.Authorization] = `Bearer ${token}`;
//       //     logger.error('interceptors:', { headers: config.headers });
//       //   }
//       // } else {
//       //   const token = getCookieValue(AuthSchemes.Token);

//       //   if (token) {
//       //     config.headers[HttpHeaderName.Authorization] = `Bearer ${token}`;
//       //   }
//       // }

//       return config;
//     } catch (error) {
//       logger.error({ error }, 'Error in request interceptor:');
//       return Promise.reject(error);
//     }
//   },
//   (error: AxiosError) => {
//     logger.error({ error }, 'Error in request interceptor:');
//     return Promise.reject(error);
//   },
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized access by redirecting to login
//       logger.info('Unauthorized access detected, redirecting to login');

//       // Only redirect if we're on the client side and not already on auth pages
//       if (
//         typeof window !== 'undefined' &&
//         !window.location.pathname.includes('/auth')
//       ) {
//         const currentPath = window.location.pathname + window.location.search;
//         const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`;
//         window.location.href = loginUrl;
//       }
//     }
//     if (error.response?.status === 403) {
//       // Handle forbidden access
//       logger.info('Forbidden access detected');
//       // You could redirect to an access denied page here
//     }
//     return Promise.reject(error);
//   },
// );

// // function getCookieValue(name: string): string | undefined {
// //   const value = `; ${document.cookie}`;
// //   const parts = value.split(`; ${name}=`);
// //   if (parts.length === 2) {
// //     const cookiePart = parts.pop();
// //     if (cookiePart) {
// //       return cookiePart.split(';').shift();
// //     }
// //   }
// //   return undefined;
// // }

// export default api;
