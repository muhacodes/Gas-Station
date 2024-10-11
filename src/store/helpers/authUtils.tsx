// // authUtils.js
import { config } from '../../Config';
import { AuthActions } from '../Slice/Auth';
import { AppDispatch, RootState, store } from '../store';
import { persistor } from '../store'; // Assuming this is where you've defined your persistor

export const isTokenExpired = (expiresAt: string): boolean => {
  const now = new Date();
  const expiryDate = new Date(Number(expiresAt) * 1000);

  return now > expiryDate;
};

export const refreshToken = async (dispatch: AppDispatch) => {
  
  try {
    // Example API call to refresh the token, adjust as necessary
    const { auth } = store.getState();
    const refreshToken = auth.refresh;
    const response = await fetch(
      `${config.appUrl}/auth/api/token/refresh/`,
      
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }), // Send refresh token to server
        // Include refresh token if needed
      },
    );

    
    if (!response.ok) {
      dispatch(AuthActions.reSet());
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    console.log("refeshed Token succesfully", data);
    dispatch(AuthActions.updateAuthToken({ data })); // store the new access and expiry time in the state

    return data['access']; // Return the new access token
  } catch (error) {
    console.error(error);
    // console.log('delete persist data');
    await persistor.purge();
    throw error; // Rethrow or handle as needed
  }
};
