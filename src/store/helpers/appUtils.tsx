// src/utils/apiUtils.ts
import { useNavigate } from 'react-router-dom';
import { refreshToken, isTokenExpired } from './authUtils';
import { store } from '../store';

// Assuming your RootState properly references AuthState
let isTokenBeingRefreshed = false;
let pendingRequests: ((newAccessToken: string) => void)[] = [];

const processPendingRequests = (newAccessToken: string): void => {
  pendingRequests.forEach((callback) => callback(newAccessToken));
  pendingRequests = [];
};

export const fetchWithTokenRefresh = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  if (!url.endsWith('/') && url.includes('?') === false) {
    url += '/';
  }

  // if(!url.endsWith('/')){

  // }

  // const navigate = useNavigate();
  const { auth, client } = store.getState(); // Assuming this gives you AuthState
  let access = auth.access; // Access the access token from auth.list

  const StationId = client.station.id;
  const attemptRequest = async (token: string): Promise<Response> => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'X-Station-ID': StationId,
      },
    });

    if (response.status === 401 && !isTokenBeingRefreshed) {
      // Mark as refreshing to prevent other requests from initiating refresh
      isTokenBeingRefreshed = true;
      access = await refreshToken(store.dispatch);
      isTokenBeingRefreshed = false;

      // Process pending requests with the new token
      processPendingRequests(access);

      // Retry the original request with the new token
      return attemptRequest(access);
    }
    return response;
  };

  if (!isTokenExpired(auth.expire)) {
    // Token is not expired; proceed with the request
    return attemptRequest(access);
  } else {
    // Token is expired or about to expire; handle refresh logic
    if (!isTokenBeingRefreshed) {
      // No refresh in progress; initiate refresh
      isTokenBeingRefreshed = true;
      access = await refreshToken(store.dispatch); // Refresh the token
      isTokenBeingRefreshed = false;
      // navigate('/auth/login');
      processPendingRequests(access); // Process any pending requests
      return attemptRequest(access); // Retry the request with the new token
    } else {
      // Refresh in progress; queue this request
      return new Promise<Response>((resolve, reject) => {
        pendingRequests.push(async (newAccessToken: string) => {
          try {
            const response = await attemptRequest(newAccessToken);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  }
};
